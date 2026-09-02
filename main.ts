import { EditorView } from '@codemirror/view';
import { MarkEdit } from 'markedit-api';
import type { MenuItem } from 'markedit-api';

import {
  setUp,
  silentChange,
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
  generateStaticHtml,
  renderStaticHtml,
} from './src/view';

import { enableHoverPreview } from './src/features/image';
import { startObserving } from './src/scroll';
import { imageHoverPreview, keyboardShortcut } from './src/support/settings';
import { hasFullHost } from './src/support/host';
import { copyToSharedContainer, setUpQuickLook } from './src/quicklook';
import { localized } from './src/shared/strings';
import { macOSTahoe } from './src/shared/utils';
import { hiddenSyntaxModeExtension } from './src/hiddenSyntax/mode';

import {
  performSearch,
  setSearchMatchIndex,
  clearSearch,
  searchCounterInfo,
} from './src/features/search';

if (window.__markeditPreviewInitialized__) {
  console.error('MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior.');
} else {
  setUp();

  if (hasFullHost()) {
    // onAppReady is ensured to be called once per app lifecycle
    if (typeof MarkEdit.onAppReady === 'function') {
      MarkEdit.onAppReady(copyToSharedContainer);
    }
  } else {
    // Minimal UI for lite hosts, like the preview extension
    setUpQuickLook(getPreviewPane());
  }

  // Global flag to prevent multiple initializations
  window.__markeditPreviewInitialized__ = true;
}

// Allow other extensions or scripts to generate the HTML
window.MarkEditGetHtml ??= generateStaticHtml;
window.MarkEditRenderHtml ??= renderStaticHtml;

// Expose bridge API for CoreEditor to call functions in the preview
window.__markeditPreviewSPI__ = {
  performSearch,
  setSearchMatchIndex,
  clearSearch,
  searchCounterInfo,
};

if (hasFullHost()) {
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
      createModeItem(localized('syntaxHiddenMode'), ViewMode.syntaxHidden),
      { separator: true },
      ...createHtmlItems(),
      { separator: true },
      {
        title: `${localized('version')} ${__PKG_VERSION__}`,
        action: () => open(`https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v${__PKG_VERSION__}`),
      },
    ],
  });

  MarkEdit.addExtension([
    EditorView.updateListener.of(update => {
      if (!update.docChanged) {
        return;
      }

      if (update.transactions.every(tr => tr.annotation(silentChange))) {
        return;
      }

      if (states.renderUpdater !== undefined) {
        clearTimeout(states.renderUpdater);
      }

      states.renderUpdater = setTimeout(renderHtmlPreview, 500);
    }),
    hiddenSyntaxModeExtension,
  ]);

  MarkEdit.onEditorReady(() => {
    if (imageHoverPreview) {
      enableHoverPreview(MarkEdit.editorView.scrollDOM);
    }

    // Restore to the last view mode, if available
    restoreViewMode();

    // For empty new drafts only, avoid using preview because it looks confusing
    requestAnimationFrame(async () => {
      if (document.visibilityState === 'visible' && currentViewMode() === ViewMode.preview && typeof MarkEdit.getFileInfo === 'function') {
        const isDraft = (await MarkEdit.getFileInfo())?.filePath === undefined;
        if (isDraft && MarkEdit.editorAPI.getText().length === 0) {
          setViewMode(ViewMode.edit, false);
        }
      }
    });

    renderHtmlPreview();
    startObserving(getEditPane(), getPreviewPane());

    if (states.keyDownListener !== undefined) {
      document.removeEventListener('keydown', states.keyDownListener);
    }

    states.keyDownListener = event => handlePageZoom(event);
    document.addEventListener('keydown', states.keyDownListener);
  });

  // Handle lineHeight change, which doesn't trigger a CodeMirror update
  if (typeof MarkEdit.onEditorConfigChange === 'function') {
    MarkEdit.onEditorConfigChange(key => {
      if (key === 'lineHeight' && currentViewMode() === ViewMode.syntaxHidden) {
        MarkEdit.editorView?.requestMeasure();
      }
    });
  }
}

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
  renderUpdater: ReturnType<typeof setTimeout> | undefined;
  keyDownListener: ((event: KeyboardEvent) => void) | undefined;
} = {
  renderUpdater: undefined,
  keyDownListener: undefined,
};
