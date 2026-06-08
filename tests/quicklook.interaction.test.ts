// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { interceptPreviewCopy } from '../src/quicklook/interaction';

beforeEach(() => {
  document.body.innerHTML = '';
  getSelection()?.removeAllRanges();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('interceptPreviewCopy', () => {
  it('does nothing when the preview pane is not an overlay', () => {
    makePreviewPane('<p>hello world</p>', false);
    interceptPreviewCopy(document.querySelector('.markdown-body') as HTMLElement);

    const { setData, event } = dispatchCopy();
    expect(setData).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('copies the whole pane when there is no selection', () => {
    const pane = makePreviewPane('<p>hello world</p>');
    interceptPreviewCopy(pane);

    const { setData, event } = dispatchCopy();
    expect(setData).toHaveBeenCalledWith('text/html', expect.stringContaining('hello world'));
    expect(setData).toHaveBeenCalledWith('text/plain', pane.innerText);
    expect(event.defaultPrevented).toBe(true);
  });

  it('copies only the selected range when a preview selection exists', () => {
    const pane = makePreviewPane('<p id="a">first</p><p id="b">second</p>');
    interceptPreviewCopy(pane);

    const target = pane.querySelector('#b') as HTMLElement;
    const range = document.createRange();
    range.selectNodeContents(target);

    const selection = getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const { setData } = dispatchCopy();
    expect(setData).toHaveBeenCalledWith('text/plain', 'second');
    expect(setData).toHaveBeenCalledWith('text/html', expect.stringContaining('second'));
    expect(setData).not.toHaveBeenCalledWith('text/html', expect.stringContaining('first'));
  });

  it('falls back to the whole pane when the selection is outside the preview', () => {
    const pane = makePreviewPane('<p>inside preview</p>');
    const outside = document.createElement('p');
    outside.textContent = 'outside';
    document.body.appendChild(outside);
    interceptPreviewCopy(pane);

    const range = document.createRange();
    range.selectNodeContents(outside);

    const selection = getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const { setData } = dispatchCopy();
    expect(setData).toHaveBeenCalledWith('text/html', expect.stringContaining('inside preview'));
  });
});

function makePreviewPane(html: string, overlay = true) {
  const pane = document.createElement('div');
  pane.className = 'markdown-body';
  if (overlay) {
    pane.classList.add('overlay');
  }

  pane.innerHTML = html;
  document.body.appendChild(pane);
  return pane;
}

function dispatchCopy() {
  const setData = vi.fn();
  const event = new Event('copy', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', { value: { setData } });

  document.dispatchEvent(event);
  return { setData, event };
}
