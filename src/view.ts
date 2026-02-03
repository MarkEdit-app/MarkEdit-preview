import { MarkEdit } from 'markedit-api';
import { appendStyle, getFileName, selectFullRange } from './utils';
import { renderMarkdown, handlePostRender, applyStyles } from './render';
import { replaceImageURLs } from './image';
import { hidePreviewButtons, previewModes } from './settings';
import { localized } from './strings';
import { syncScrollProgress } from './scroll';

import Split from 'split-grid';
import type { SplitInstance as Splitter } from 'split-grid';

import mainCss from '../styles/main.css?raw';
import { githubCss, hljsCss, codeCopyCss } from './styling';

const containerView = document.body;
const gutterView = document.createElement('div');
const previewPane = document.createElement('div');

// The default cursor styling doesn't work well when the container is body
const draggingStyle = appendStyle(
  '* { cursor: col-resize }',
  false, // Enabled only when we drag, see onDragStart
);

export enum ViewMode {
  edit,
  sideBySide,
  preview,
}

export function setUp() {
  appendStyle(mainCss);
  appendStyle(githubCss());
  appendStyle(codeCopyCss());

  if (__FULL_BUILD__) {
    import('../styles/katex.css?raw').then(mod => appendStyle(mod.default));
    appendStyle(hljsCss());

    // Hide the built-in preview button since we have a better preview with all features
    if (hidePreviewButtons) {
      appendStyle(`.cm-md-previewWrapper {
        display: none !important;
      }`);
    }
  }

  const dividerView = document.createElement('div');
  dividerView.className = Constants.dividerViewClass;
  gutterView.appendChild(dividerView);

  gutterView.className = Constants.gutterViewClass;
  containerView.appendChild(gutterView);

  previewPane.className = Constants.previewPaneClass;
  containerView.appendChild(previewPane);

  document.addEventListener('keydown', event => {
    // Cmd-a to select the preview pane, if the editor is not focused
    if (event.metaKey && event.key === 'a' && document.activeElement !== MarkEdit.editorView.contentDOM) {
      selectFullRange(previewPane);
    }
  });

  const mutationObserver = new MutationObserver(updateGutterStyle);
  mutationObserver.observe(previewPane, { attributes: true, attributeFilter: ['style', 'class'] });

  const darkModeObserver = matchMedia('(prefers-color-scheme: dark)');
  darkModeObserver.addEventListener('change', () => {
    updateGutterStyle();

    // Re-render mermaid diagrams to apply the new theme
    if (document.querySelector('.mermaid') !== null) {
      renderHtmlPreview();
    }
  });
}

export function setViewMode(mode: ViewMode, needsDisplay = true) {
  const oldMode = states.viewMode;
  states.viewMode = mode;

  if (mode !== oldMode) {
    localStorage.setItem(
      Constants.viewModeCacheKey,
      String(mode),
    );
  }

  const editorView = MarkEdit.editorView;
  if (mode === ViewMode.edit) {
    // Don't call contentDOM.focus() here, it scrolls to the top
    editorView.focus();
  } else if (mode === ViewMode.preview) {
    // When the mode is side-by-side, focus won't be changed
    editorView.contentDOM.blur();
  }

  if (mode === ViewMode.sideBySide) {
    containerView.classList.add(Constants.containerClass);
    states.splitter = Split({
      columnGutters: [{ track: 1, element: gutterView }],
      minSize: 150,
      onDragStart: () => draggingStyle.disabled = false,
      onDragEnd: () => draggingStyle.disabled = true,
    });
  } else {
    containerView.classList.remove(Constants.containerClass);
    states.splitter?.destroy();
  }

  if (mode === ViewMode.preview) {
    previewPane.classList.add('overlay');
  } else {
    previewPane.classList.remove('overlay');
  }

  if (needsDisplay) {
    renderHtmlPreview();
  }
}

export function changeViewMode() {
  // Get the rotation of all modes, "edit" always goes first
  const rotation = [
    ViewMode.edit,
    ...previewModes.map(mode => {
      switch (mode) {
        case 'side-by-side': return ViewMode.sideBySide;
        case 'preview': return ViewMode.preview;
        default: return undefined;
      }
    }).filter(mode => mode !== undefined),
  ];

  // When current mode is not found in the rotation, start over from "edit"
  const currentIndex = rotation.indexOf(states.viewMode);
  const nextIndex = currentIndex === -1 ? 0 : ((currentIndex + 1) % rotation.length);
  setViewMode(rotation[nextIndex]);
}

export function restoreViewMode() {
  const initalMode = localStorage.getItem(Constants.viewModeCacheKey);
  if (initalMode !== null) {
    setViewMode(Number(initalMode), false);
  }
}

export function currentViewMode() {
  return states.viewMode;
}

export function renderHtmlPreview() {
  if (states.viewMode === ViewMode.edit) {
    return;
  }

  const html = replaceImageURLs(getRenderedHtml());
  previewPane.innerHTML = html;

  handlePostRender(() => {
    syncScrollProgress(
      getEditPane(),
      getPreviewPane(),
      false,
    );

    const pageZoom = localStorage.getItem(Constants.previewPageZoomKey);
    if (pageZoom !== null) {
      previewPane.style.zoom = pageZoom;
    }
  });
}

export function handlePageZoom(event: KeyboardEvent) {
  if (!event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
    return;
  }

  const zoom = Number(previewPane.style.zoom) || 1.0;
  const clamp = (value: number) => String(Math.min(Math.max(value, 0.5), 3.0));

  switch (event.key) {
    case '-': previewPane.style.zoom = clamp(zoom - 0.1); break;
    case '=': previewPane.style.zoom = clamp(zoom + 0.1); break;
    case '0': previewPane.style.zoom = '1'; break;
    default: return; // Ignores caching and event handling
  }

  localStorage.setItem(
    Constants.previewPageZoomKey,
    previewPane.style.zoom,
  );

  event.preventDefault();
  event.stopPropagation();
}

export function saveCleanHtml() {
  saveGeneratedHtml(false);
}

export function saveStyledHtml() {
  saveGeneratedHtml(true);
}

export async function copyHtml() {
  const html = getRenderedHtml(false);
  await navigator.clipboard.writeText(html);
}

export async function copyRichText() {
  const items = new ClipboardItem({
    'text/html': new Blob([getRenderedHtml(false)], { type: 'text/html' }),
    'text/plain': new Blob([previewPane.innerText], { type: 'text/plain' }),
  });

  await navigator.clipboard.write([items]);
}

export function getEditPane() {
  return MarkEdit.editorView.scrollDOM;
}

export function getPreviewPane() {
  return previewPane;
}

function getRenderedHtml(lineInfo = true) {
  const markdown = MarkEdit.editorAPI.getText();
  return renderMarkdown(markdown, lineInfo);
}

function updateGutterStyle() {
  const backgroundColor = getComputedStyle(previewPane).backgroundColor;
  gutterView.style.background = `linear-gradient(to right, transparent 50%, ${backgroundColor} 50%)`;
}

async function saveGeneratedHtml(styled: boolean) {
  const fileName = await (async() => {
    const info = await MarkEdit.getFileInfo();
    if (info === undefined) {
      return `${localized('untitled')}.html`;
    }

    return `${getFileName(info.filePath)}.html`;
  })();

  const fileContent = await (async() => {
    const html = getRenderedHtml(false);
    return styled ? (await applyStyles(html)) : html;
  })();

  MarkEdit.showSavePanel({
    fileName,
    string: fileContent,
  });
}

const Constants = {
  containerClass: 'markdown-container',
  gutterViewClass: 'markdown-gutter',
  dividerViewClass: 'markdown-divider',
  previewPaneClass: 'markdown-body',
  viewModeCacheKey: 'ui.view-mode',
  previewPageZoomKey: 'ui.preview-page-zoom',
};

const states: {
  viewMode: ViewMode;
  splitter: Splitter | undefined;
} = {
  viewMode: ViewMode.edit,
  splitter: undefined,
};
