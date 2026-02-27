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

export function extractBackgroundColor(css: string | undefined): string | undefined {
  const match = css?.match(/--bgColor-default:\s*([^;]+);/);
  return match?.[1]?.trim();
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

export function getElementTop(container: HTMLElement, element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;

  while (current !== null && current !== container) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return top;
}

export function scrollToElement(container: HTMLElement, element: HTMLElement, progress: number, animated = true) {
  const position = getElementTop(container, element) + (element.offsetHeight * progress);
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

export function isLocalImagePath(path: string) {
  if (/^(https?:)?\/\//.test(path)) {
    return false;
  }

  return /\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(path);
}

export function joinPaths(path1: string, path2: string) {
  if (path1.endsWith('/')) {
    return path1 + path2;
  }

  return path1 + '/' + path2;
}
