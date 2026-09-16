// @vitest-environment happy-dom
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type * as Render from '../src/render';
import type * as Scroll from '../src/scroll';

const mocks = vi.hoisted(() => ({
  handlePostRender: vi.fn<typeof Render.handlePostRender>(),
  renderMarkdown: vi.fn<typeof Render.renderMarkdown>(),
  syncScrollProgress: vi.fn<typeof Scroll.syncScrollProgress>(),
  editorView: undefined as unknown as {
    contentDOM: HTMLElement;
    scrollDOM: HTMLElement;
    focus: ReturnType<typeof vi.fn>;
    hasFocus: boolean;
  },
  setHiddenSyntaxMode: vi.fn(),
  destroySplitter: vi.fn(),
  viewModes: ['edit', 'side-by-side', 'preview', 'syntax-hidden'],
}));

const {
  handlePostRender,
  renderMarkdown,
  syncScrollProgress,
} = mocks;

vi.mock('markedit-api', () => ({
  MarkEdit: {
    get editorView() { return mocks.editorView; },
    editorAPI: { getText: vi.fn(() => '') },
  },
}));

vi.mock('split-grid', () => ({
  default: vi.fn(() => ({ destroy: mocks.destroySplitter })),
}));

vi.mock('../src/hiddenSyntax/mode', () => ({
  setHiddenSyntaxMode: mocks.setHiddenSyntaxMode,
}));

vi.mock('../src/support/settings', () => ({
  hidePreviewButtons: false,
  viewModes: mocks.viewModes,
}));

vi.mock('../src/shared/utils', () => ({
  appendStyle: vi.fn(() => ({ disabled: true })),
  getBlockRange: vi.fn(),
  getFileExtension: vi.fn(),
  getFileName: vi.fn(),
  joinPaths: vi.fn(),
  selectFullRange: vi.fn(),
}));

vi.mock('../src/render', () => ({
  applyStyles: vi.fn(),
  handlePostRender: mocks.handlePostRender,
  renderKatex: vi.fn(),
  renderMarkdown: mocks.renderMarkdown,
  renderMermaid: vi.fn(),
}));

vi.mock('../src/features/image', () => ({ replaceImageURLs: vi.fn(html => html) }));
vi.mock('../src/features/task', () => ({ resolveTaskToggle: vi.fn() }));
vi.mock('../src/scroll', () => ({ syncScrollProgress: mocks.syncScrollProgress }));
vi.mock('../src/shared/strings', () => ({ localized: vi.fn() }));
vi.mock('../src/styling', () => ({
  codeCopyCss: vi.fn(),
  hljsCss: vi.fn(),
  previewThemeCss: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(handlePostRender).mockClear();
  vi.mocked(syncScrollProgress).mockClear();
  vi.mocked(renderMarkdown).mockReset();
  localStorage.clear();
  document.body.innerHTML = '';
  mocks.setHiddenSyntaxMode.mockClear();
  mocks.destroySplitter.mockClear();
  mocks.viewModes.splice(0, mocks.viewModes.length, 'edit', 'side-by-side', 'preview', 'syntax-hidden');
  mocks.editorView = {
    contentDOM: document.createElement('div'),
    scrollDOM: document.createElement('div'),
    focus: vi.fn(),
    hasFocus: false,
  };
});

describe('Preview refresh positioning', () => {
  async function setUpPreview() {
    vi.resetModules();
    const view = await import('../src/view');
    view.setViewMode(view.ViewMode.preview, false);
    vi.mocked(renderMarkdown).mockResolvedValue('<p>Updated content</p>');

    const pane = view.getPreviewPane();
    pane.innerHTML = '<p>Existing preview</p>';
    pane.scrollTop = 400;
    pane.scrollLeft = 20;
    return { view, pane };
  }

  test('preserves its own offsets without syncing to the editor', async () => {
    const { view, pane } = await setUpPreview();
    await view.renderHtmlPreview();

    expect(pane.innerHTML).toBe('<p>Updated content</p>');
    expect(pane.scrollTop).toBe(400);
    expect(pane.scrollLeft).toBe(20);
    expect(syncScrollProgress).not.toHaveBeenCalled();
  });

  test('aligns with the editor when requested', async () => {
    const { view, pane } = await setUpPreview();
    await view.renderHtmlPreview(true);
    expect(syncScrollProgress).toHaveBeenCalledWith(mocks.editorView.scrollDOM, pane, false);
  });

  test('aligns the first preview render with the editor', async () => {
    const { view, pane } = await setUpPreview();
    pane.innerHTML = '';
    await view.renderHtmlPreview();
    expect(syncScrollProgress).toHaveBeenCalledWith(mocks.editorView.scrollDOM, pane, false);
  });

  test('keeps side-by-side refreshes aligned with the editor', async () => {
    const { view, pane } = await setUpPreview();
    view.setViewMode(view.ViewMode.sideBySide, false);
    await view.renderHtmlPreview();
    expect(syncScrollProgress).toHaveBeenCalledWith(mocks.editorView.scrollDOM, pane, false);
  });

  test('captures the position after asynchronous rendering', async () => {
    const { view, pane } = await setUpPreview();
    let finish!: (html: string) => void;
    vi.mocked(renderMarkdown).mockReturnValueOnce(new Promise<string>(resolve => { finish = resolve; }));
    const rendering = view.renderHtmlPreview();
    pane.scrollTop = 600;
    finish('<p>Later content</p>');
    await rendering;
    expect(pane.scrollTop).toBe(600);
  });

  test('ignores superseded renders and their post-render callbacks', async () => {
    const { view, pane } = await setUpPreview();
    await view.renderHtmlPreview(true);
    const calls = vi.mocked(handlePostRender).mock.calls;
    const staleCallback = calls[calls.length - 1][0];

    let finish!: (html: string) => void;
    vi.mocked(renderMarkdown).mockReturnValueOnce(new Promise<string>(resolve => { finish = resolve; }));

    const staleRender = view.renderHtmlPreview(true);
    await view.renderHtmlPreview();
    vi.mocked(syncScrollProgress).mockClear();
    staleCallback();
    finish('<p>Stale content</p>');

    await staleRender;
    expect(pane.innerHTML).toBe('<p>Updated content</p>');
    expect(syncScrollProgress).not.toHaveBeenCalled();
  });

  test.each(['edit', 'syntaxHidden', 'sideBySide'] as const)('invalidates pending renders when switching to %s without display', async mode => {
    const { view, pane } = await setUpPreview();
    await view.renderHtmlPreview(true);
    const calls = mocks.handlePostRender.mock.calls;
    const callback = calls[calls.length - 1][0];
    let finish!: (html: string) => void;
    mocks.renderMarkdown.mockReturnValueOnce(new Promise<string>(resolve => { finish = resolve; }));
    const rendering = view.renderHtmlPreview(true);

    view.setViewMode(view.ViewMode[mode], false);
    mocks.syncScrollProgress.mockClear();
    mocks.handlePostRender.mockClear();
    callback();
    finish('<p>Stale content</p>');
    await rendering;

    expect(pane.innerHTML).toBe('<p>Updated content</p>');
    expect(mocks.syncScrollProgress).not.toHaveBeenCalled();
    expect(mocks.handlePostRender).not.toHaveBeenCalled();
  });

  test('does not undo user scrolling when a diagram finishes', async () => {
    const { view, pane } = await setUpPreview();
    await view.renderHtmlPreview();
    pane.scrollTop = 700;
    const calls = vi.mocked(handlePostRender).mock.calls;
    calls[calls.length - 1][0]();
    expect(pane.scrollTop).toBe(700);
  });
});

describe('Syntax-hidden mode', () => {
  test('preserves mode values and remains editor-only', async () => {
    const { ViewMode, setViewMode } = await import('../src/view');

    expect(ViewMode.edit).toBe(0);
    expect(ViewMode.sideBySide).toBe(1);
    expect(ViewMode.preview).toBe(2);
    expect(ViewMode.syntaxHidden).toBe(3);

    setViewMode(ViewMode.edit, false);
    setViewMode(ViewMode.syntaxHidden, false);
    setViewMode(ViewMode.sideBySide, false);
    setViewMode(ViewMode.preview, false);

    expect(mocks.editorView.focus).toHaveBeenCalledTimes(2);
  });

  test('enables hidden syntax only in syntax-hidden mode', async () => {
    const { setViewMode, ViewMode } = await import('../src/view');

    setViewMode(ViewMode.syntaxHidden, false);
    setViewMode(ViewMode.edit, false);
    setViewMode(ViewMode.sideBySide, false);
    setViewMode(ViewMode.preview, false);

    expect(mocks.setHiddenSyntaxMode.mock.calls).toEqual([
      [mocks.editorView, true],
      [mocks.editorView, false],
      [mocks.editorView, false],
      [mocks.editorView, false],
    ]);
  });

  test('rotates after Preview and restores cached syntax-hidden mode', async () => {
    vi.resetModules();
    const view = await import('../src/view');

    view.changeViewMode();
    expect(view.currentViewMode()).toBe(view.ViewMode.sideBySide);
    view.changeViewMode();
    expect(view.currentViewMode()).toBe(view.ViewMode.preview);
    view.changeViewMode();
    expect(view.currentViewMode()).toBe(view.ViewMode.syntaxHidden);

    vi.resetModules();
    localStorage.setItem('ui.view-mode', String(view.ViewMode.syntaxHidden));
    const restoredView = await import('../src/view');
    restoredView.restoreViewMode();
    expect(restoredView.currentViewMode()).toBe(restoredView.ViewMode.syntaxHidden);
    expect(mocks.setHiddenSyntaxMode).toHaveBeenLastCalledWith(mocks.editorView, true);
  });

  test('reapplies syntax-hidden mode after editor replacement', async () => {
    vi.resetModules();
    const view = await import('../src/view');
    view.setViewMode(view.ViewMode.syntaxHidden, false);
    mocks.setHiddenSyntaxMode.mockClear();

    mocks.editorView = {
      contentDOM: document.createElement('div'),
      scrollDOM: document.createElement('div'),
      focus: vi.fn(),
      hasFocus: false,
    };

    view.restoreViewMode();
    expect(mocks.setHiddenSyntaxMode).toHaveBeenCalledWith(mocks.editorView, true);
  });

  test('uses the configured editor and preview modes as the complete rotation', async () => {
    vi.resetModules();
    mocks.viewModes.splice(0, mocks.viewModes.length, 'syntax-hidden', 'preview');
    const view = await import('../src/view');

    view.changeViewMode();
    expect(view.currentViewMode()).toBe(view.ViewMode.syntaxHidden);
    view.changeViewMode();
    expect(view.currentViewMode()).toBe(view.ViewMode.preview);
    view.changeViewMode();
    expect(view.currentViewMode()).toBe(view.ViewMode.syntaxHidden);
  });

  test('adds Edit when the configured rotation has no editor mode', async () => {
    vi.resetModules();
    mocks.viewModes.splice(0, mocks.viewModes.length, 'preview');
    const view = await import('../src/view');

    view.changeViewMode();
    expect(view.currentViewMode()).toBe(view.ViewMode.preview);
    view.changeViewMode();
    expect(view.currentViewMode()).toBe(view.ViewMode.edit);
  });
});
