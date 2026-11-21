// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { MenuItem, ToolbarItem } from 'markedit-api';
import type * as Host from '../src/support/host';

const mocks = vi.hoisted(() => ({
  mode: 0,
  modeRotation: [0, 1, 2, 3],
  toolbarSupported: true,
  addToolbarItem: vi.fn<(item: ToolbarItem | ToolbarItem[]) => void>(),
  addMainMenuItem: vi.fn<(item: MenuItem | MenuItem[]) => void>(),
  invalidateToolbarItem: vi.fn<(id: string) => void>(),
  onEditorReady: vi.fn<(callback: () => void) => void>(),
  restoreViewMode: vi.fn(),
}));

vi.mock('markedit-api', () => ({
  MarkEdit: {
    get addToolbarItem() { return mocks.toolbarSupported ? mocks.addToolbarItem : undefined; },
    get invalidateToolbarItem() { return mocks.toolbarSupported ? mocks.invalidateToolbarItem : undefined; },
    addMainMenuItem: mocks.addMainMenuItem,
    addExtension: vi.fn(),
    onEditorReady: mocks.onEditorReady,
    editorView: {},
  },
}));

vi.mock('../src/view', () => ({
  ViewMode: { edit: 0, sideBySide: 1, preview: 2, syntaxHidden: 3 },
  setUp: vi.fn(),
  silentChange: {},
  setViewMode: (mode: number) => { mocks.mode = mode; },
  changeViewMode: () => { mocks.mode = (mocks.mode + 1) % 4; },
  getViewModeRotation: () => mocks.modeRotation,
  restoreViewMode: mocks.restoreViewMode,
  currentViewMode: () => mocks.mode,
  renderHtmlPreview: vi.fn(),
  handlePageZoom: vi.fn(),
  saveCleanHtml: vi.fn(),
  saveStyledHtml: vi.fn(),
  copyHtml: vi.fn(),
  copyRichText: vi.fn(),
  getEditPane: vi.fn(),
  getPreviewPane: vi.fn(),
  generateStaticHtml: vi.fn(),
  renderStaticHtml: vi.fn(),
}));

vi.mock('../src/features/image', () => ({ enableHoverPreview: vi.fn() }));
vi.mock('../src/scroll', () => ({ startObserving: vi.fn() }));
vi.mock('../src/support/settings', () => ({ imageHoverPreview: false, keyboardShortcut: {} }));
vi.mock('../src/support/host', async importOriginal => ({
  ...await importOriginal<typeof Host>(),
  hasFullHost: () => true,
}));

vi.mock('../src/quicklook', () => ({ copyToSharedContainer: vi.fn(), setUpQuickLook: vi.fn() }));
vi.mock('../src/shared/strings', () => ({ localized: (key: string) => key }));
vi.mock('../src/shared/utils', () => ({ macOSTahoe: () => true }));
vi.mock('../src/hiddenSyntax/mode', () => ({ hiddenSyntaxModeExtension: [] }));
vi.mock('../src/features/search', () => ({
  performSearch: vi.fn(), setSearchMatchIndex: vi.fn(), clearSearch: vi.fn(), searchCounterInfo: vi.fn(),
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();

  mocks.onEditorReady.mockReset();
  mocks.mode = 0;
  mocks.modeRotation = [0, 1, 2, 3];
  mocks.toolbarSupported = true;
  mocks.restoreViewMode.mockImplementation(() => { mocks.mode = 2; });

  window.__markeditPreviewInitialized__ = false;
  vi.stubGlobal('requestAnimationFrame', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('View Mode toolbar registration', () => {
  test.each([false, true])('registers once and enables restored state (already ready: %s)', async alreadyReady => {
    if (alreadyReady) {
      mocks.onEditorReady.mockImplementation(callback => callback());
    }

    await import('../main');
    expect(mocks.addToolbarItem).toHaveBeenCalledOnce();
    const toolbar = mocks.addToolbarItem.mock.calls[0][0];
    if (Array.isArray(toolbar) || toolbar.type !== 'segmented') {
      throw new Error('Expected a segmented toolbar');
    }

    expect(toolbar.initialPlacement).toBe('toolbar');
    if (!alreadyReady) {
      expect(toolbar.segments.every(segment => segment.state().isEnabled === false)).toBe(true);
      expect(toolbar.segments.every(segment => segment.state().isSelected === false)).toBe(true);
      mocks.onEditorReady.mock.calls[0][0]();
    }

    expect(mocks.invalidateToolbarItem).toHaveBeenCalledWith('markedit-preview.view-mode');
    expect(toolbar.segments.map(segment => segment.state().isSelected)).toEqual([false, false, true, false]);
    expect(toolbar.segments.every(segment => segment.state().isEnabled === true)).toBe(true);

    const menu = mocks.addMainMenuItem.mock.calls[0][0];
    if (Array.isArray(menu)) {
      throw new Error('Expected one menu');
    }

    const menuModes = menu.children?.filter(item => item.state !== undefined) ?? [];
    toolbar.segments[3].action();
    expect(menuModes[3].state?.().isSelected).toBe(true);
    menuModes[0].action?.();
    expect(toolbar.segments[0].state().isSelected).toBe(true);

    mocks.onEditorReady.mock.calls[0][0]();
    expect(mocks.addToolbarItem).toHaveBeenCalledOnce();
    expect(toolbar.segments[2].state().isSelected).toBe(true);
  });

  test('keeps menus working on older hosts', async () => {
    mocks.toolbarSupported = false;
    await import('../main');
    mocks.onEditorReady.mock.calls[0][0]();
    expect(mocks.addToolbarItem).not.toHaveBeenCalled();
    expect(mocks.invalidateToolbarItem).not.toHaveBeenCalled();
    expect(mocks.addMainMenuItem).toHaveBeenCalledOnce();
  });

  test('uses the configured rotation for toolbar choices without filtering the menu', async () => {
    mocks.modeRotation = [3, 2];
    await import('../main');
    const toolbar = mocks.addToolbarItem.mock.calls[0][0];
    const menu = mocks.addMainMenuItem.mock.calls[0][0];
    if (Array.isArray(toolbar) || toolbar.type !== 'segmented' || Array.isArray(menu)) {
      throw new Error('Expected a segmented toolbar and one menu');
    }

    expect(toolbar.segments.map(segment => segment.title)).toEqual(['syntaxHiddenMode', 'previewMode']);
    toolbar.segments[0].action();
    expect(mocks.mode).toBe(3);
    toolbar.segments[1].action();
    expect(mocks.mode).toBe(2);
    expect(menu.children?.filter(item => item.state !== undefined)).toHaveLength(4);
  });
});
