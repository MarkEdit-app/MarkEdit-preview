import { MarkEdit } from 'markedit-api';
import { getBlockRange, getElementTop, scrollToElement, scrollToPosition } from './shared/utils';
import { syncScroll } from './support/settings';

// ── BlockEntry index ──────────────────────────────────────────────────────────
// Built once after each render; avoids per-frame querySelectorAll and parseInt.

interface BlockEntry {
  from: number; // data-line-from (pre-parsed)
  to: number; // data-line-to   (pre-parsed)
  el: HTMLElement;
  top: number; // pre-read via getElementTop for preview→editor sync
}

let cachedIndex: BlockEntry[] | null = null;
let cachedPaddingTop: number | null = null;

/** Invalidate after renderHtmlPreview() replaces innerHTML. */
export function invalidateBlockCache() {
  cachedIndex = null;
  cachedPaddingTop = null;
}

/**
 * Pre-build the index while the layout is fresh. Call in a requestAnimationFrame
 * after rendering so the first scroll event costs nothing.
 */
export function warmBlockCache(previewPane: HTMLElement) {
  if (cachedIndex !== null) { return; }
  cachedIndex = Array.from(previewPane.querySelectorAll<HTMLElement>('[data-line-from]'))
    .map(el => ({
      from: parseInt(el.dataset.lineFrom ?? '0', 10),
      to: parseInt(el.dataset.lineTo ?? '0', 10),
      el,
      top: getElementTop(previewPane, el),
    }));
}

function getIndex(previewPane: HTMLElement): BlockEntry[] {
  if (cachedIndex === null) { warmBlockCache(previewPane); }
  return cachedIndex ?? [];
}

function getPaddingTop(pane: HTMLElement): number {
  cachedPaddingTop ??= parseFloat(getComputedStyle(pane).paddingTop) || 0;
  return cachedPaddingTop;
}

// ── Scroll-source lock ────────────────────────────────────────────────────────
// Prevents the programmatic scroll on one pane from triggering sync back.

type ScrollSource = 'editor' | 'preview' | null;
let scrollSource: ScrollSource = null;
let scrollSourceTimer: ReturnType<typeof setTimeout> | undefined;

function setScrollSource(source: ScrollSource) {
  scrollSource = source;
  if (scrollSourceTimer !== undefined) { clearTimeout(scrollSourceTimer); }
  scrollSourceTimer = setTimeout(() => { scrollSource = null; }, 150);
}

// ── Public API ────────────────────────────────────────────────────────────────

export function startObserving(editorPane: HTMLElement, previewPane: HTMLElement) {
  if (!syncScroll) { return; }

  // Use scrollend when available (no debounce needed); fall back to RAF.
  // passive: true lets the browser scroll immediately without waiting for JS.
  if ('onscrollend' in window) {
    editorPane.addEventListener('scrollend', () => {
      if (scrollSource === 'preview') { return; }
      setScrollSource('editor');
      syncScrollProgress(editorPane, previewPane);
    }, { passive: true });

    previewPane.addEventListener('scrollend', () => {
      if (scrollSource === 'editor') { return; }
      setScrollSource('preview');
      syncPreviewToEditor(previewPane, editorPane);
    }, { passive: true });
  } else {
    let editorRaf: ReturnType<typeof requestAnimationFrame> | undefined;
    let previewRaf: ReturnType<typeof requestAnimationFrame> | undefined;

    editorPane.addEventListener('scroll', () => {
      if (scrollSource === 'preview') { return; }
      if (editorRaf !== undefined) { cancelAnimationFrame(editorRaf); }
      editorRaf = requestAnimationFrame(() => {
        setScrollSource('editor');
        syncScrollProgress(editorPane, previewPane, false);
      });
    }, { passive: true });

    previewPane.addEventListener('scroll', () => {
      if (scrollSource === 'editor') { return; }
      if (previewRaf !== undefined) { cancelAnimationFrame(previewRaf); }
      previewRaf = requestAnimationFrame(() => {
        setScrollSource('preview');
        syncPreviewToEditor(previewPane, editorPane);
      });
    }, { passive: true });
  }
}

export function syncScrollProgress(sourcePane: HTMLElement, targetPane: HTMLElement, animated = true) {
  const { line, progress } = getScrollProgress(sourcePane);
  scrollToProgress(targetPane, line, progress, animated);
}

// ── Preview → Editor ──────────────────────────────────────────────────────────

function syncPreviewToEditor(previewPane: HTMLElement, editorPane: HTMLElement) {
  const index = getIndex(previewPane);
  if (index.length === 0) { return; }

  const scrollTop = previewPane.scrollTop;
  const paddingTop = getPaddingTop(previewPane);

  // Binary search on pre-computed top values — O(log n), no DOM reads.
  let lo = 0;
  let hi = index.length - 1;
  let entry: BlockEntry | undefined;
  let topProgress = 0;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const blockTop = index[mid].top - paddingTop;
    const blockBottom = blockTop + index[mid].el.offsetHeight;

    if (blockBottom <= scrollTop) {
      lo = mid + 1;
    } else if (mid > 0 && (index[mid - 1].top - paddingTop + index[mid - 1].el.offsetHeight) > scrollTop) {
      hi = mid - 1;
    } else {
      entry = index[mid];
      topProgress = clampProgressValue((scrollTop - blockTop) / index[mid].el.offsetHeight);
      break;
    }
  }

  if (entry === undefined) { return; }

  const { from: lineFrom, to: lineTo } = entry;
  const targetLine = lineFrom + Math.round(topProgress * Math.max(0, lineTo - lineFrom));

  const editor = MarkEdit.editorView;
  const clampedLine = Math.max(1, Math.min(editor.state.doc.lines, targetLine + 1));
  const lineInfo = editor.state.doc.line(clampedLine);
  const visualBlock = editor.lineBlockAt(lineInfo.from);
  const editorScrollTop = visualBlock.top + visualBlock.height * (topProgress % 1);

  editorPane.scrollTo({ top: editorScrollTop, behavior: 'instant' });
}

// ── Editor → Preview ──────────────────────────────────────────────────────────

function getScrollProgress(container: HTMLElement, paddingTop: number = 0) {
  const editor = MarkEdit.editorView;
  // Use CodeMirror's internal block metrics — no getBoundingClientRect, no DOM traversal.
  const block = editor.lineBlockAtHeight(container.scrollTop + paddingTop);
  const line = editor.state.doc.lineAt(block.from).number - 1;
  const progress = block.height > 0
    ? clampProgressValue((container.scrollTop - block.top) / block.height)
    : 0;
  return { line, progress };
}

function scrollToProgress(container: HTMLElement, line: number, progress: number, animated = true) {
  if (line === 0 && progress === 0) {
    return scrollToPosition(container, 0, animated);
  }

  const allBlocks = Array.from(document.querySelectorAll<HTMLElement>('[data-line-from]'));
  const bestBlock = binarySearchBlock(allBlocks, line);

  if (bestBlock !== undefined) {
    const { from, to } = getBlockRange(bestBlock);
    return scrollToElement(container, bestBlock, getRelativeProgress(line, progress, from, to), animated);
  }

  if (line === 0) {
    return scrollToPosition(container, 0, animated);
  }

  // Interpolate between the closest blocks before and after the current line.
  // Preserves upstream's gap-handling for blank lines and non-block content.
  const { beforeBlock, afterBlock } = findEnclosingBlocks(allBlocks, line);
  if (beforeBlock !== undefined && afterBlock !== undefined) {
    const beforeRange = getBlockRange(beforeBlock);
    const afterRange = getBlockRange(afterBlock);
    const beforeBlockBottom = getElementTop(container, beforeBlock) + beforeBlock.offsetHeight;
    const afterBlockTop = getElementTop(container, afterBlock);
    const totalGapLines = afterRange.from - beforeRange.to;
    const linesIntoGap = (line - beforeRange.to) + progress;
    const interpolation = totalGapLines > 0 ? clampProgressValue(linesIntoGap / totalGapLines) : 0;
    return scrollToPosition(container, beforeBlockBottom + (afterBlockTop - beforeBlockBottom) * interpolation, animated);
  }

  if (beforeBlock !== undefined) { return scrollToElement(container, beforeBlock, 1, animated); }
  if (afterBlock !== undefined) { return scrollToElement(container, afterBlock, 0, animated); }
}

// Binary search: O(log n) block lookup vs O(n) linear scan.
function binarySearchBlock(blocks: HTMLElement[], line: number): HTMLElement | undefined {
  let lo = 0;
  let hi = blocks.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const { from, to } = getBlockRange(blocks[mid]);
    if (line < from) {
      hi = mid - 1;
    } else if (line > to) {
      lo = mid + 1;
    } else {
      return blocks[mid];
    }
  }
  return undefined;
}

function findEnclosingBlocks(blocks: HTMLElement[], line: number) {
  let beforeBlock: HTMLElement | undefined;
  let afterBlock: HTMLElement | undefined;
  for (const block of blocks) {
    const { from, to } = getBlockRange(block);
    if (to < line) {
      beforeBlock = block;
    } else if (from > line) {
      afterBlock = block;
      break;
    }
  }
  return { beforeBlock, afterBlock };
}

function getRelativeProgress(line: number, progress: number, from: number, to: number) {
  const count = to - from;
  if (count < 1) { return line === from ? progress : 0; }
  return clampProgressValue(((line - from) + progress) / count);
}

function clampProgressValue(value: number) {
  return Math.max(0, Math.min(1, value));
}
