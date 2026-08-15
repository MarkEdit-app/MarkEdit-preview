// @vitest-environment happy-dom
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { followPreviewLinkAnchor, handlePreviewLinkClick } from '../src/features/navigation';

const mocks = vi.hoisted(() => ({ scrollToElement: vi.fn() }));
vi.mock('../src/shared/utils', () => ({ scrollToElement: mocks.scrollToElement }));

beforeEach(() => {
  mocks.scrollToElement.mockClear();
});

describe('preview link navigation', () => {
  test('positions internal anchors at the top of the preview pane', () => {
    const container = document.createElement('div');
    const heading = container.appendChild(document.createElement('h2'));
    heading.id = 'hello-world';

    expect(followPreviewLinkAnchor(container, '#hello-world')).toBe(true);
    expect(mocks.scrollToElement).toHaveBeenCalledWith(container, heading, 0, false);
  });

  test('intercepts internal anchor clicks but leaves external links alone', () => {
    const container = document.createElement('div');
    const heading = container.appendChild(document.createElement('h2'));
    heading.id = 'heading';
    const internal = container.appendChild(document.createElement('a'));
    internal.href = '#heading';
    const external = container.appendChild(document.createElement('a'));
    external.href = 'https://example.com';

    const internalEvent = new MouseEvent('click', { cancelable: true });
    Object.defineProperty(internalEvent, 'target', { value: internal });
    expect(handlePreviewLinkClick(container, internalEvent)).toBe(true);
    expect(internalEvent.defaultPrevented).toBe(true);

    const externalEvent = new MouseEvent('click', { cancelable: true });
    Object.defineProperty(externalEvent, 'target', { value: external });
    expect(handlePreviewLinkClick(container, externalEvent)).toBe(false);
    expect(externalEvent.defaultPrevented).toBe(false);
  });

  test('decodes anchors and ignores external or unresolved destinations', () => {
    const container = document.createElement('div');
    const heading = container.appendChild(document.createElement('h2'));
    heading.id = 'hello world';

    expect(followPreviewLinkAnchor(container, '#hello%20world')).toBe(true);
    expect(followPreviewLinkAnchor(container, 'https://example.com')).toBe(false);
    expect(followPreviewLinkAnchor(container, '#missing')).toBe(false);
    expect(mocks.scrollToElement).toHaveBeenCalledTimes(1);
  });
});
