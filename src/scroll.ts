import { MarkEdit } from 'markedit-api';
import { getClosestLine, getBlockRange, getElementTop, scrollToElement, scrollToPosition } from './utils';
import { syncScroll } from './settings';

export function startObserving(sourcePane: HTMLElement, targetPane: HTMLElement) {
  if (!syncScroll) {
    return;
  }

  sourcePane.addEventListener('scroll', () => {
    if (states.scrollUpdater !== undefined) {
      clearTimeout(states.scrollUpdater);
    }

    states.scrollUpdater = setTimeout(() => {
      syncScrollProgress(sourcePane, targetPane);
    }, 100);
  });
}

export function syncScrollProgress(sourcePane: HTMLElement, targetPane: HTMLElement, animated = true) {
  // When the editor is scrolled to the bottom, sync the preview to the bottom
  if (isAtBottom(sourcePane)) {
    return scrollToPosition(targetPane, targetPane.scrollHeight, animated);
  }

  const { line, progress } = getScrollProgress(sourcePane);
  scrollToProgress(targetPane, line, progress, animated);
}

function getScrollProgress(container: HTMLElement, paddingTop: number = 0) {
  const editor = MarkEdit.editorView;
  const block = editor.lineBlockAtHeight(container.scrollTop + paddingTop);
  const line = editor.state.doc.lineAt(block.from).number - 1; // CodeMirror's line number is 1-based
  const element = getClosestLine(editor.domAtPos(block.from).node);

  if (element === null) {
    return { line, progress: 0 };
  }

  const containerRect = container.getBoundingClientRect();
  const lineRect = element.getBoundingClientRect();

  const offset = containerRect.top - lineRect.top - paddingTop;
  const progress = clampProgressValue(offset / lineRect.height);
  return { line, progress };
}

function scrollToProgress(container: HTMLElement, line: number, progress: number, animated = true) {
  const allBlocks = Array.from(document.querySelectorAll<HTMLElement>('[data-line-from]'));
  const bestBlock = proposeTargetBlock(allBlocks, line);

  // The best result, we can scroll to a block with relative progress
  if (bestBlock !== undefined) {
    const { from, to } = getBlockRange(bestBlock);
    return scrollToElement(
      container,
      bestBlock,
      getRelativeProgress(line, progress, from, to),
      animated,
    );
  }

  // The target block should be the first block, but we couldn't find it
  if (line === 0) {
    return scrollToPosition(container, 0, animated);
  }

  // Interpolate between the closest blocks before and after the current line
  const { before, after } = findSurroundingBlocks(allBlocks, line);

  if (before !== undefined && after !== undefined) {
    const beforeRange = getBlockRange(before);
    const afterRange = getBlockRange(after);
    const beforeEnd = getElementTop(container, before) + before.offsetHeight;
    const afterStart = getElementTop(container, after);

    const gapLines = afterRange.from - beforeRange.to;
    const lineInGap = (line - beforeRange.to) + progress;
    const gapProgress = gapLines > 0 ? clampProgressValue(lineInGap / gapLines) : 0;

    const position = beforeEnd + (afterStart - beforeEnd) * gapProgress;
    return scrollToPosition(container, position, animated);
  }

  if (before !== undefined) {
    return scrollToElement(container, before, 1, animated);
  }

  if (after !== undefined) {
    return scrollToElement(container, after, 0, animated);
  }
}

function proposeTargetBlock(blocks: HTMLElement[], line: number) {
  // Find the closest block to scroll to
  return blocks.find(block => {
    const { from, to } = getBlockRange(block);
    return line >= from && line <= to;
  });
}

function getRelativeProgress(line: number, progress: number, from: number, to: number) {
  const count = to - from;
  if (count < 1) {
    // One to one mapping
    return line === from ? progress : 0;
  }

  // Clamp to [0, 1] because there are cases multiple paragraphs are merged into a single one
  const relative = (line - from) + progress;
  return clampProgressValue(relative / count);
}

function findSurroundingBlocks(blocks: HTMLElement[], line: number) {
  let before: HTMLElement | undefined;
  let after: HTMLElement | undefined;

  for (const block of blocks) {
    const { from, to } = getBlockRange(block);
    if (to < line) {
      before = block;
    } else if (from > line) {
      after = block;
      break;
    }
  }

  return { before, after };
}

function isAtBottom(element: HTMLElement) {
  return element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
}

function clampProgressValue(value: number) {
  return Math.max(0, Math.min(1, value));
}

const states: {
  scrollUpdater: ReturnType<typeof setTimeout> | undefined;
} = {
  scrollUpdater: undefined,
};
