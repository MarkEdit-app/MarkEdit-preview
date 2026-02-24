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
  const { beforeBlock, afterBlock } = findEnclosingBlocks(allBlocks, line);
  if (beforeBlock !== undefined && afterBlock !== undefined) {
    const beforeRange = getBlockRange(beforeBlock);
    const afterRange = getBlockRange(afterBlock);
    const beforeBlockBottom = getElementTop(container, beforeBlock) + beforeBlock.offsetHeight;
    const afterBlockTop = getElementTop(container, afterBlock);
    const totalGapLines = afterRange.from - beforeRange.to;
    const linesIntoGap = (line - beforeRange.to) + progress;
    const interpolation = totalGapLines > 0 ? clampProgressValue(linesIntoGap / totalGapLines) : 0;
    const position = beforeBlockBottom + (afterBlockTop - beforeBlockBottom) * interpolation;
    return scrollToPosition(container, position, animated);
  }

  if (beforeBlock !== undefined) {
    return scrollToElement(container, beforeBlock, 1, animated);
  }

  if (afterBlock !== undefined) {
    return scrollToElement(container, afterBlock, 0, animated);
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

function clampProgressValue(value: number) {
  return Math.max(0, Math.min(1, value));
}

const states: {
  scrollUpdater: ReturnType<typeof setTimeout> | undefined;
} = {
  scrollUpdater: undefined,
};
