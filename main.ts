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
  increasePageZoom,
  decreasePageZoom,
  resetPageZoom,
  isPageZoomAvailable,
  saveCleanHtml,
  saveStyledHtml,
  copyHtml,
  copyRichText,
  getEditPane,
  getPreviewPane,
} from './src/view';

import { enableHoverPreview } from './src/image';
import { startObserving } from './src/scroll';
import { checkForUpdates } from './src/updater';
import { imageHoverPreview, keyboardShortcut } from './src/settings';
import { localized } from './src/strings';
import { macOSTahoe } from './src/utils';

setUp();
setTimeout(checkForUpdates, 4000);

MarkEdit.addMainMenuItem({
  title: localized('viewMode'),
  icon: macOSTahoe() ? 'eye' : undefined,
  children: [
    {
      title: localized('changeMode'),
      action: changeViewMode,
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
      title: localized('pageZoom'),
      children: [
        {
          title: localized('increaseZoom'),
          action: increasePageZoom,
          key: '=',
          modifiers: ['Command'],
          state: () => ({ isEnabled: isPageZoomAvailable() }),
        },
        {
          title: localized('decreaseZoom'),
          action: decreasePageZoom,
          key: '-',
          modifiers: ['Command'],
          state: () => ({ isEnabled: isPageZoomAvailable() }),
        },
        {
          title: localized('resetZoom'),
          action: resetPageZoom,
          key: '0',
          modifiers: ['Command'],
          state: () => ({ isEnabled: isPageZoomAvailable() }),
        },
      ],
    },
    { separator: true },
    { title: `${localized('version')} ${__PKG_VERSION__}` },
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

  if (states.isInitiating) {
    states.isInitiating = false;
    restoreViewMode();
  }

  renderHtmlPreview();
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
    action: () => setViewMode(mode),
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

const states: {
  isInitiating: boolean;
  renderUpdater: ReturnType<typeof setTimeout> | undefined;
  keyDownListener: ((event: KeyboardEvent) => void) | undefined;
} = {
  isInitiating: true,
  renderUpdater: undefined,
  keyDownListener: undefined,
};
