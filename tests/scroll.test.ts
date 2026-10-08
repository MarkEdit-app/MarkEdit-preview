// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { ChangeSet, EditorSelection, Text } from '@codemirror/state';
import { startObserving, syncScrollProgress } from '../src/scroll';

const mocks = vi.hoisted(() => ({
  doc: undefined as unknown as Text,
  selection: undefined as unknown as EditorSelection,
  syncScroll: true,
  blockFrom: 0,
  scrollToElement: vi.fn(),
  scrollToPosition: vi.fn(),
}));

vi.mock('markedit-api', () => ({
  MarkEdit: {
    editorView: {
      lineBlockAtHeight: () => ({ from: mocks.blockFrom }),
      state: {
        get selection() { return mocks.selection; },
        get doc() { return mocks.doc; },
      },
      domAtPos: () => ({ node: document.createElement('div') }),
    },
  },
}));

vi.mock('../src/support/settings', () => ({ get syncScroll() { return mocks.syncScroll; } }));
vi.mock('../src/shared/utils', () => ({
  getClosestLine: () => null,
  getBlockRange: (element: HTMLElement) => ({
    from: Number(element.dataset.lineFrom),
    to: Number(element.dataset.lineTo),
  }),
  getElementTop: (_container: HTMLElement, element: HTMLElement) => element.offsetTop,
  scrollToElement: mocks.scrollToElement,
  scrollToPosition: mocks.scrollToPosition,
}));

beforeEach(() => {
  vi.useFakeTimers();
  mocks.doc = Text.of(['Example document']);
  mocks.selection = EditorSelection.single(0);
  mocks.syncScroll = true;
  mocks.blockFrom = 0;
  mocks.scrollToElement.mockClear();
  mocks.scrollToPosition.mockClear();
  document.body.innerHTML = '';
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

function scroll(source: HTMLElement, top: number) {
  source.scrollTop = top;
  source.dispatchEvent(new Event('onscrollend' in window ? 'scrollend' : 'scroll'));
}

describe('Editor scroll synchronization', () => {
  function previewWithStaging() {
    mocks.doc = Text.of(Array.from({ length: 12 }, () => 'line'));
    const target = document.createElement('div');
    target.innerHTML = '<div class="mermaid" data-line-from="3" data-line-to="7">Diagram</div><p data-line-from="9" data-line-to="9">Last paragraph</p>';

    const staging = document.createElement('div');
    staging.style.visibility = 'hidden';
    staging.appendChild(target.firstElementChild!.cloneNode(true));

    document.body.append(target, staging);
    return { target, staging, source: document.createElement('div') };
  }

  test('ignores hidden diagram copies when scrolling to trailing blank lines', () => {
    const { target, source } = previewWithStaging();
    mocks.blockFrom = mocks.doc.line(12).from;

    syncScrollProgress(source, target, false);
    expect(mocks.scrollToElement).toHaveBeenCalledExactlyOnceWith(target, target.lastElementChild, 1, false);
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();
  });

  test('interpolates within the preview when a removed diagram is still staged', () => {
    const { target, source } = previewWithStaging();
    target.innerHTML = '<p data-line-from="0" data-line-to="0">Start</p><p data-line-from="10" data-line-to="10">End</p>';
    Object.defineProperty(target.firstElementChild, 'offsetTop', { value: 100 });
    Object.defineProperty(target.firstElementChild, 'offsetHeight', { value: 20 });
    Object.defineProperty(target.lastElementChild, 'offsetTop', { value: 320 });

    mocks.blockFrom = mocks.doc.line(6).from;
    syncScrollProgress(source, target, false);
    expect(mocks.scrollToPosition).toHaveBeenCalledExactlyOnceWith(target, 220, false);
    expect(mocks.scrollToElement).not.toHaveBeenCalled();
  });

  test('selects the visible diagram even when a hidden copy precedes the preview', () => {
    const { target, staging, source } = previewWithStaging();
    document.body.prepend(staging);
    mocks.blockFrom = mocks.doc.line(6).from;

    syncScrollProgress(source, target, false);
    expect(mocks.scrollToElement).toHaveBeenCalledExactlyOnceWith(target, target.firstElementChild, 0.5, false);
    expect(mocks.scrollToElement.mock.calls[0][1]).toBe(target.firstElementChild);
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();
  });

  test('ignores hidden-editor scrolling in preview mode', () => {
    const source = document.createElement('div');
    const target = document.createElement('div');
    target.classList.add('overlay');

    startObserving(source, target);
    scroll(source, 400);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();

    target.classList.remove('overlay');
    scroll(source, 500);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).toHaveBeenCalledWith(target, 0, true);
  });

  test('continues synchronizing side-by-side scrolling', () => {
    const source = document.createElement('div');
    const target = document.createElement('div');
    startObserving(source, target);
    scroll(source, 400);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).toHaveBeenCalledWith(target, 0, true);
  });

  test('syncs selection navigation in preview mode but ignores later corrections', () => {
    const source = document.createElement('div');
    const target = document.createElement('div');
    target.classList.add('overlay');
    startObserving(source, target);

    mocks.selection = EditorSelection.single(40);
    scroll(source, 400);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).toHaveBeenCalledWith(target, 0, true);

    mocks.scrollToPosition.mockClear();
    scroll(source, 450);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();
  });

  test('ignores document-mapped selections but allows subsequent navigation', () => {
    const source = document.createElement('div');
    const target = document.createElement('div');
    target.classList.add('overlay');
    mocks.selection = EditorSelection.single(8);
    startObserving(source, target);

    const changes = ChangeSet.of({ from: 0, insert: 'External ' }, mocks.doc.length);
    mocks.selection = mocks.selection.map(changes);
    mocks.doc = changes.apply(mocks.doc);
    scroll(source, 400);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();

    scroll(source, 450);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();

    mocks.selection = EditorSelection.single(0);
    scroll(source, 0);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).toHaveBeenCalledWith(target, 0, true);
  });

  test('uses the reset selection as the baseline for a new observer', () => {
    const source = document.createElement('div');
    const target = document.createElement('div');
    target.classList.add('overlay');
    mocks.selection = EditorSelection.single(40);
    startObserving(source, target);

    scroll(source, 400);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();
  });

  test('ignores phantom scroll events', () => {
    const source = document.createElement('div');
    startObserving(source, document.createElement('div'));
    scroll(source, 0);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();
  });

  test('cancels pending scroll synchronization when observation restarts', () => {
    const source = document.createElement('div');
    const target = document.createElement('div');
    startObserving(source, target);
    scroll(source, 400);

    startObserving(document.createElement('div'), target);
    mocks.scrollToPosition.mockClear();
    vi.runAllTimers();
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();
  });

  test('respects disabled synchronization', () => {
    mocks.syncScroll = false;
    const source = document.createElement('div');
    startObserving(source, document.createElement('div'));

    vi.runAllTimers();
    scroll(source, 400);
    vi.runAllTimers();
    expect(mocks.scrollToPosition).not.toHaveBeenCalled();
  });
});
