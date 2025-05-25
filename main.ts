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
  saveCleanHtml,
  saveStyledHtml,
  copyHtml,
  copyRichText,
  getEditPane,
  getPreviewPane,
} from './src/view';

import { startObserving } from './src/scroll';
import { checkForUpdates } from './src/updater';
import { keyboardShortcut } from './src/settings';
import { localized } from './src/strings';

setUp();
setTimeout(checkForUpdates, 4000);

MarkEdit.addMainMenuItem({
  title: localized('viewMode'),
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
  if (states.isInitiating) {
    states.isInitiating = false;
    restoreViewMode();
  }

  renderHtmlPreview();
  startObserving(getEditPane(), getPreviewPane());
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
} = {
  isInitiating: true,
  renderUpdater: undefined,
};
