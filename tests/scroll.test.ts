// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { ChangeSet, EditorSelection, Text } from '@codemirror/state';
import { startObserving } from '../src/scroll';

const mocks = vi.hoisted(() => ({
  doc: undefined as unknown as Text,
  selection: undefined as unknown as EditorSelection,
  syncScroll: true,
  scrollToPosition: vi.fn(),
}));

vi.mock('markedit-api', () => ({
  MarkEdit: {
    editorView: {
      lineBlockAtHeight: () => ({ from: 0 }),
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
  getBlockRange: vi.fn(),
  getElementTop: vi.fn(),
  scrollToElement: vi.fn(),
  scrollToPosition: mocks.scrollToPosition,
}));

beforeEach(() => {
  vi.useFakeTimers();
  mocks.doc = Text.of(['Example document']);
  mocks.selection = EditorSelection.single(0);
  mocks.syncScroll = true;
  mocks.scrollToPosition.mockClear();
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
