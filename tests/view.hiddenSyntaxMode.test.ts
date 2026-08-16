// @vitest-environment happy-dom
import { beforeEach, describe, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
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
  handlePostRender: vi.fn(),
  renderKatex: vi.fn(),
  renderMarkdown: vi.fn(),
  renderMermaid: vi.fn(),
}));

vi.mock('../src/features/image', () => ({ replaceImageURLs: vi.fn() }));
vi.mock('../src/features/task', () => ({ resolveTaskToggle: vi.fn() }));
vi.mock('../src/scroll', () => ({ syncScrollProgress: vi.fn() }));
vi.mock('../src/shared/strings', () => ({ localized: vi.fn() }));
vi.mock('../src/styling', () => ({
  codeCopyCss: vi.fn(),
  hljsCss: vi.fn(),
  previewThemeCss: vi.fn(),
}));

beforeEach(() => {
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

  test('hides a late update pill in syntax-hidden mode', async () => {
    vi.resetModules();
    const view = await import('../src/view');
    const { renderUpdatePill } = await import('../src/support/updater');
    view.setViewMode(view.ViewMode.syntaxHidden, false);

    const pill = renderUpdatePill({
      name: '2.0.0',
      body: '',
      tag_name: 'v2.0.0',
      html_url: 'https://example.com',
    });

    expect(pill?.style.display).toBe('none');
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
