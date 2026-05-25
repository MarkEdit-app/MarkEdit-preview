// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const ModeCacheKey = 'ui.quicklook-mode';
beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('currentMode', () => {
  it('returns "source" by default', async () => {
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('source');
  });

  it('returns "preview" when localStorage holds "preview"', async () => {
    localStorage.setItem(ModeCacheKey, 'preview');
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('preview');
  });

  it('treats any non-"preview" value as "source"', async () => {
    localStorage.setItem(ModeCacheKey, 'garbage');
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('source');
  });

  it('caches the first read; later localStorage mutations are ignored', async () => {
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('source');
    localStorage.setItem(ModeCacheKey, 'preview');
    expect(currentMode()).toBe('source');
  });

  it('falls back to "source" when localStorage.getItem throws', async () => {
    const original = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => { throw new Error('denied'); },
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      },
    });

    try {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { currentMode } = await import('../src/quicklook/mode');
      expect(currentMode()).toBe('source');
      expect(errorSpy).toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, 'localStorage', { configurable: true, value: original });
    }
  });
});

describe('saveMode', () => {
  it('updates the cache so subsequent currentMode() reflects it', async () => {
    const { currentMode, saveMode } = await import('../src/quicklook/mode');
    saveMode('preview');
    expect(currentMode()).toBe('preview');
  });

  it('persists the value to localStorage', async () => {
    const { saveMode } = await import('../src/quicklook/mode');
    saveMode('preview');
    expect(localStorage.getItem(ModeCacheKey)).toBe('preview');
  });

  it('updates the cache even when localStorage.setItem throws', async () => {
    const original = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => null,
        setItem: () => { throw new Error('quota'); },
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      },
    });

    try {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { currentMode, saveMode } = await import('../src/quicklook/mode');
      saveMode('preview');
      expect(currentMode()).toBe('preview');
      expect(errorSpy).toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, 'localStorage', { configurable: true, value: original });
    }
  });
});
