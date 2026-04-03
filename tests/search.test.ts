// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockMatchCount = vi.hoisted(() => ({ value: 1 }));
const mockViewState = vi.hoisted(() => ({
  mode: 'preview' as string,
  pane: null as HTMLElement | null,
}));

vi.mock('mark.js', () => ({
  default: class MockMark {
    private container: Element;
    constructor(container: Element) { this.container = container; }

    mark(_keyword: string, options?: { className?: string; done?: (n: number) => void }) {
      for (let i = 0; i < mockMatchCount.value; i++) {
        const el = document.createElement('mark');
        el.className = options?.className ?? '';
        this.container.appendChild(el);
      }
      options?.done?.(mockMatchCount.value);
    }

    markRegExp(_re: RegExp, options?: { className?: string; done?: (n: number) => void }) {
      for (let i = 0; i < mockMatchCount.value; i++) {
        const el = document.createElement('mark');
        el.className = options?.className ?? '';
        this.container.appendChild(el);
      }
      options?.done?.(mockMatchCount.value);
    }

    unmark(options?: { done?: () => void }) {
      this.container.querySelectorAll('mark').forEach(el => el.remove());
      options?.done?.();
    }
  },
}));

vi.mock('../src/settings', () => ({ themeName: 'github' }));

vi.mock('../src/view', () => ({
  ViewMode: { edit: 'edit', sideBySide: 'side-by-side', preview: 'preview' },
  currentViewMode: vi.fn(() => mockViewState.mode),
  getPreviewPane: vi.fn(() => mockViewState.pane),
}));

import { performSearch, setSearchMatchIndex, clearSearch, searchCounterInfo } from '../src/search';

const baseOptions = {
  search: 'hello',
  caseSensitive: false,
  diacriticInsensitive: false,
  wholeWord: false,
  regexp: false,
};

beforeEach(() => {
  mockViewState.pane = document.createElement('div');
  document.body.appendChild(mockViewState.pane);
  mockViewState.mode = 'preview';
  mockMatchCount.value = 1;
  clearSearch();
});

afterEach(() => {
  document.body.innerHTML = '';
  mockViewState.pane = null;
});

describe('searchCounterInfo', () => {
  it('returns undefined in edit mode', () => {
    mockViewState.mode = 'edit';
    expect(searchCounterInfo()).toBeUndefined();
  });

  it('returns undefined in side-by-side mode', () => {
    mockViewState.mode = 'side-by-side';
    expect(searchCounterInfo()).toBeUndefined();
  });

  it('returns zero counter in preview mode with no active search', () => {
    expect(searchCounterInfo()).toEqual({ numberOfItems: 0, currentIndex: 0 });
  });

  it('reflects mark count after search', () => {
    mockMatchCount.value = 3;
    performSearch(baseOptions);
    expect(searchCounterInfo()).toEqual({ numberOfItems: 3, currentIndex: 0 });
  });
});

describe('performSearch', () => {
  it('clears marks when query is empty', () => {
    mockMatchCount.value = 2;
    performSearch(baseOptions);
    performSearch({ ...baseOptions, search: '' });
    expect(searchCounterInfo()?.numberOfItems).toBe(0);
  });

  it('resets currentIndex to 0 on new search', () => {
    mockMatchCount.value = 3;
    performSearch(baseOptions);
    setSearchMatchIndex(2);
    performSearch({ ...baseOptions, search: 'world' });
    expect(searchCounterInfo()?.currentIndex).toBe(0);
  });

  it('handles regexp queries', () => {
    performSearch({ ...baseOptions, regexp: true });
    expect(searchCounterInfo()?.numberOfItems).toBe(1);
  });

  it('handles invalid regexp without throwing', () => {
    expect(() => {
      performSearch({ ...baseOptions, regexp: true, search: '[invalid' });
    }).not.toThrow();
  });
});

describe('setSearchMatchIndex', () => {
  it('is a no-op when there are no marks', () => {
    setSearchMatchIndex(5);
    expect(searchCounterInfo()?.currentIndex).toBe(0);
  });

  it('sets the current index within range', () => {
    mockMatchCount.value = 3;
    performSearch(baseOptions);
    setSearchMatchIndex(1);
    expect(searchCounterInfo()?.currentIndex).toBe(1);
  });

  it('wraps index using modulo when out of range', () => {
    mockMatchCount.value = 3;
    performSearch(baseOptions);
    setSearchMatchIndex(5); // 5 % 3 = 2
    expect(searchCounterInfo()?.currentIndex).toBe(2);
  });

  it('wraps to 0 when index equals mark count', () => {
    mockMatchCount.value = 3;
    performSearch(baseOptions);
    setSearchMatchIndex(3); // 3 % 3 = 0
    expect(searchCounterInfo()?.currentIndex).toBe(0);
  });
});

describe('clearSearch', () => {
  it('resets mark count to 0', () => {
    mockMatchCount.value = 3;
    performSearch(baseOptions);
    clearSearch();
    expect(searchCounterInfo()?.numberOfItems).toBe(0);
  });

  it('resets currentIndex to 0', () => {
    mockMatchCount.value = 3;
    performSearch(baseOptions);
    setSearchMatchIndex(2);
    clearSearch();
    expect(searchCounterInfo()?.currentIndex).toBe(0);
  });
});
