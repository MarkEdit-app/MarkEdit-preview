// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getEditorText } from '../src/quicklook/editor';

interface MutableWindow {
  editor?: { state?: { doc: { toString(): string } } };
  config?: { text?: string };
}

const mutableWindow = window as unknown as MutableWindow;
beforeEach(() => {
  delete mutableWindow.editor;
  delete mutableWindow.config;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getEditorText', () => {
  it('returns text from window.editor.state.doc', () => {
    mutableWindow.editor = { state: { doc: { toString: () => 'hello' } } };
    expect(getEditorText()).toBe('hello');
  });

  it('falls back to window.config.text when editor state is unavailable', () => {
    mutableWindow.config = { text: 'fallback' };
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(getEditorText()).toBe('fallback');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('returns "" when neither source is available', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(getEditorText()).toBe('');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('does not call console.error when editor state succeeds', () => {
    mutableWindow.editor = { state: { doc: { toString: () => 'ok' } } };
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    getEditorText();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
