export function macOSTahoe() {
  const match = navigator.userAgent.match(/macOS\/(\d+)/);
  return match === null ? false : parseInt(match[1]) >= 26;
}

export function appendStyle(css: string, enabled = true) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  style.disabled = !enabled;
  return style;
}

/**
 * @returns File name without the path extension.
 */
export function getFileName(filePath: string) {
  const fileName = filePath.split('/').pop() ?? filePath;
  return fileName.split('.').slice(0, -1).join('.');
}

export function getClosestLine(node: Node) {
  return (node instanceof HTMLElement ? node : node.parentElement)?.closest('.cm-line') as HTMLElement | null;
}

export function getBlockRange(block: HTMLElement) {
  const from = parseInt(block.dataset.lineFrom ?? '0');
  const to = parseInt(block.dataset.lineTo ?? '0');
  return { from, to };
}

export function scrollToElement(container: HTMLElement, element: HTMLElement, progress: number, animated = true) {
  const position = element.offsetTop + (element.offsetHeight * progress);
  scrollToPosition(container, position, animated);
}

export function scrollToPosition(element: HTMLElement, position: number, animated = true) {
  const threshold = parseFloat(getComputedStyle(element).paddingTop);
  element.scrollTo({
    top: position <= threshold ? 0 : position,
    behavior: animated ? 'smooth' : 'instant',
  });
}

export function selectFullRange(element: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(element);

  const selection = getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}
