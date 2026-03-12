import { EditorView } from '@codemirror/view';
import { MarkEdit } from 'markedit-api';
import type { MenuItem } from 'markedit-api';

import {
  setUp,
  ViewMode,
  setViewMode,
  changeViewMode,
  restoreViewMode,
  currentViewMode,
  renderHtmlPreview,
  handlePageZoom,
  saveCleanHtml,
  saveStyledHtml,
  copyHtml,
  copyRichText,
  getEditPane,
  getPreviewPane,
} from './src/view';

import { enableHoverPreview } from './src/image';
import { startObserving } from './src/scroll';
import { checkForUpdates, renderUpdatePill } from './src/updater';
import { imageHoverPreview, keyboardShortcut, updateBehavior } from './src/settings';
import { localized } from './src/strings';
import { macOSTahoe } from './src/utils';

if (window.__markeditPreviewInitialized__) {
  console.error('MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior.');
} else {
  setUp();
  setTimeout(checkForUpdates, 4000);

  if (updateBehavior === 'quiet') {
    // Checks for updates every 7 days when in quiet mode
    setInterval(checkForUpdates, 604800000);
  }

  // Global flag to prevent multiple initializations
  window.__markeditPreviewInitialized__ = true;
}

MarkEdit.addMainMenuItem({
  title: localized('viewMode'),
  icon: macOSTahoe() ? 'eye' : undefined,
  children: [
    {
      title: localized('changeMode'),
      action: () => {
        changeViewMode();
        renderDecorationViews();
      },
      key: (keyboardShortcut['key'] ?? 'V') as string,
      modifiers: (keyboardShortcut['modifiers'] ?? ['Command']) as MenuItem['modifiers'],
    },
    { separator: true },
    createModeItem(localized('editMode'), ViewMode.edit),
    createModeItem(localized('sideBySideMode'), ViewMode.sideBySide),
    createModeItem(localized('previewMode'), ViewMode.preview),
    { separator: true },
    ...createHtmlItems(),
    { separator: true },
    {
      title: `${localized('version')} ${__PKG_VERSION__}`,
      action: () => open(`https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v${__PKG_VERSION__}`),
    },
    {
      title: `${localized('checkReleases')} (GitHub)`,
      action: () => open('https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest'),
    },
  ],
});

MarkEdit.addExtension(EditorView.updateListener.of(update => {
  if (!update.docChanged) {
    return;
  }

  if (states.renderUpdater !== undefined) {
    clearTimeout(states.renderUpdater);
  }

  states.renderUpdater = setTimeout(renderHtmlPreview, 500);
}));

MarkEdit.onEditorReady(() => {
  if (imageHoverPreview) {
    enableHoverPreview(MarkEdit.editorView.scrollDOM);
  }

  // Restore to the last view mode, if available
  restoreViewMode();

  // For empty new drafts only, avoid using preview because it looks confusing
  requestAnimationFrame(async() => {
    if (document.visibilityState === 'visible' && currentViewMode() === ViewMode.preview && typeof MarkEdit.getFileInfo === 'function') {
      const isDraft = (await MarkEdit.getFileInfo())?.filePath === undefined;
      if (isDraft && MarkEdit.editorAPI.getText().length === 0) {
        setViewMode(ViewMode.edit, false);
      }
    }
  });

  renderHtmlPreview();
  renderDecorationViews();
  startObserving(getEditPane(), getPreviewPane());

  if (states.keyDownListener !== undefined) {
    document.removeEventListener('keydown', states.keyDownListener);
  }

  states.keyDownListener = event => handlePageZoom(event);
  document.addEventListener('keydown', states.keyDownListener);
});

function createModeItem(title: string, mode: ViewMode): MenuItem {
  return {
    title,
    action: () => {
      setViewMode(mode);
      renderDecorationViews();
    },
    // state requires MarkEdit 1.24.0+
    state: () => ({ isSelected: currentViewMode() === mode }),
  };
}

function createHtmlItems(): MenuItem[] {
  const copyItems = [
    {
      title: localized('copyHtml'),
      action: copyHtml,
    },
    {
      title: localized('copyRichText'),
      action: copyRichText,
    },
  ];

  // showSavePanel requires MarkEdit 1.24.0+
  if (typeof MarkEdit.showSavePanel === 'undefined') {
    return copyItems;
  }

  return [
    {
      title: localized('saveCleanHtml'),
      action: saveCleanHtml,
    },
    {
      title: localized('saveStyledHtml'),
      action: saveStyledHtml,
    },
    ...copyItems,
  ];
}

function renderDecorationViews() {
  const updatePill = renderUpdatePill();
  if (updatePill !== undefined) {
    updatePill.style.display = currentViewMode() === ViewMode.edit ? 'none' : '';
  }
}

const states: {
  renderUpdater: ReturnType<typeof setTimeout> | undefined;
  keyDownListener: ((event: KeyboardEvent) => void) | undefined;
} = {
  renderUpdater: undefined,
  keyDownListener: undefined,
};
