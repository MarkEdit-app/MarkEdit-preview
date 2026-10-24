// @vitest-environment happy-dom
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { followPreviewLinkAnchor, handlePreviewLinkClick } from '../src/features/navigation';
import { headingLineForAnchor, renderMarkdown } from '../src/render';
import type * as utils from '../src/shared/utils';

const mocks = vi.hoisted(() => ({ scrollToElement: vi.fn() }));
vi.mock('markedit-api', () => ({ MarkEdit: {} }));
vi.mock('../src/shared/utils', async importOriginal => ({
  ...await importOriginal<typeof utils>(),
  scrollToElement: mocks.scrollToElement,
}));

beforeEach(() => {
  mocks.scrollToElement.mockClear();
});

describe('preview link navigation', () => {
  test.each([
    ['## 1. Test Link', '#1-test-link', 0],
    ['Test (Link)\n-----------', '#test-link', 0],
    ['## Héllo, World!', '#hello-world', 0],
    ['# λ', '#Λ', 0],
    ['# λ', '#%CE%9B', 0],
    ['# Closing #', '#closing-', 0],
    [`## ${'a'.repeat(65)}`, `#${'a'.repeat(64)}`, 0],
    ['# Heading\n# Heading\n# Heading-1', '#heading-1', 2],
    ['# Heading\n# Heading', '#heading-1', 1],
    ['## 1. Test Link', '#1.-test-link', 0],
    ['# Héllo, World! _One_', '#h%C3%A9llo%2C-world!-one', 0],
  ] as const)('shares hidden-mode targets for %s via %s', async (heading, destination, line) => {
    const markdown = `[test](${destination})\n\n${heading}`;
    const container = document.createElement('div');
    container.innerHTML = await renderMarkdown(markdown);

    const target = container.querySelector(`[data-markedit-anchor][data-line-from="${line + 2}"]`);
    expect(target).not.toBeNull();
    expect(await headingLineForAnchor(markdown, destination)).toBe(line + 2);

    const event = new MouseEvent('click', { cancelable: true });
    Object.defineProperty(event, 'target', { value: container.querySelector('a') });
    expect(handlePreviewLinkClick(container, event)).toBe(true);
    expect(event.defaultPrevented).toBe(true);
    expect(mocks.scrollToElement).toHaveBeenCalledWith(container, target, 0, false);
  });

  test.each([
    ['# FN1!\n\nText[^note]\n\n[^note]: Footnote', '#fn1', 'li#fn1'],
    ['# FNREF1!\n\nText[^note]\n\n[^note]: Footnote', '#fnref1', 'a#fnref1'],
    ['[jump](#custom)\n\n# Custom!\n\n<span id="custom">Target</span>', '#custom', 'span#custom'],
  ])('preserves exact non-heading targets in %s', async (markdown, destination, selector) => {
    const container = document.createElement('div');
    container.innerHTML = await renderMarkdown(markdown);

    const target = container.querySelector(selector);
    expect(target).not.toBeNull();
    expect(container.querySelector(`[data-markedit-anchor="${destination.substring(1)}"]`)).not.toBeNull();

    const event = new MouseEvent('click', { cancelable: true });
    Object.defineProperty(event, 'target', { value: container.querySelector(`a[href="${destination}"]`) });
    expect(handlePreviewLinkClick(container, event)).toBe(true);
    expect(event.defaultPrevented).toBe(true);
    expect(mocks.scrollToElement).toHaveBeenCalledWith(container, target, 0, false);
  });

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
