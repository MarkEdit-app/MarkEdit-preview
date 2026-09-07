import { Annotation } from '@codemirror/state';
import { MarkEdit } from 'markedit-api';
import { appendStyle, getBlockRange, getFileExtension, getFileName, joinPaths, selectFullRange, writeClipboard, htmlToPlainText } from './shared/utils';
import { renderMarkdown, renderMermaid, renderKatex, handlePostRender, applyStyles } from './render';
import { replaceImageURLs } from './features/image';
import { hidePreviewButtons, isAutoTheme, viewModes } from './support/settings';
import { localized } from './shared/strings';
import { syncScrollProgress } from './scroll';
import { resolveTaskToggle } from './features/task';
import { handlePreviewLinkClick } from './features/navigation';
import { ClassNames, CacheKeys } from './shared/const';
import { setHiddenSyntaxMode } from './hiddenSyntax/mode';

import Split from 'split-grid';
import type { SplitInstance as Splitter } from 'split-grid';

import mainCss from '../styles/main.css?raw';
import { previewThemeCss, hljsCss, codeCopyCss } from './styling';

const containerView = document.body;
const gutterView = document.createElement('div');
const previewPane = document.createElement('div');

// The default cursor styling doesn't work well when the container is body
const draggingStyle = appendStyle(
  '* { cursor: col-resize }',
  false, // Enabled only when we drag, see onDragStart
);

// Transaction annotation for edits that should not trigger a preview re-render
export const silentChange = Annotation.define<boolean>();

export enum ViewMode {
  edit,
  sideBySide,
  preview,
  syntaxHidden,
}

export function setUp() {
  appendStyle(mainCss);
  themeStyles = appendStyle(previewThemeCss());
  appendStyle(codeCopyCss());

  if (__FULL_BUILD__) {
    import('../styles/katex.css?raw').then(mod => appendStyle(mod.default));
    hljsStyles = appendStyle(hljsCss());

    // Hide the built-in preview buttons in side-by-side mode
    if (hidePreviewButtons) {
      appendStyle(`.markdown-container .cm-md-previewWrapper {
        display: none !important;
      }`);
    }
  }

  const dividerView = document.createElement('div');
  dividerView.className = ClassNames.dividerViewClass;
  gutterView.appendChild(dividerView);

  gutterView.className = ClassNames.gutterViewClass;
  containerView.appendChild(gutterView);

  previewPane.className = ClassNames.previewPaneClass;
  containerView.appendChild(previewPane);

  document.addEventListener('keydown', event => {
    if (!event.metaKey || event.key !== 'a') {
      return;
    }

    // Cmd-a to select the preview pane when it's the active surface: the
    // overlay is shown, or focus isn't in the editor (e.g. side-by-side).
    // Fall back to `.cm-content` for lite hosts where `editorView` is absent.
    const contentDOM = MarkEdit.editorView?.contentDOM ?? document.querySelector<HTMLElement>('.cm-content');
    if (previewPane.classList.contains('overlay') || document.activeElement !== contentDOM) {
      selectFullRange(previewPane);
      event.preventDefault();
    }
  });

  const mutationObserver = new MutationObserver(updateGutterStyle);
  mutationObserver.observe(previewPane, { attributes: true, attributeFilter: ['style', 'class'] });

  const darkModeObserver = matchMedia('(prefers-color-scheme: dark)');
  darkModeObserver.addEventListener('change', () => {
    updateGutterStyle();

    // The app may switch its theme along with the appearance
    setTimeout(refreshThemeStyles, 200);

    // Re-render mermaid diagrams to apply the new theme
    if (document.querySelector('.mermaid') !== null) {
      renderHtmlPreview();
    }
  });

  // Delegate external links ("../link") to native file opening
  if (typeof MarkEdit.getFileInfo === 'function' && typeof MarkEdit.openFile === 'function') {
    previewPane.addEventListener('click', handleExternalFiles);
  }

  previewPane.addEventListener('click', event => {
    handleAnchorClick(event);
    handleTaskItemToggle(event);
  });
}

export function setViewMode(mode: ViewMode, needsDisplay = true) {
  const oldMode = currentViewMode();
  states.viewMode = mode;

  if (mode !== oldMode) {
    localStorage.setItem(
      CacheKeys.viewModeCacheKey,
      String(mode),
    );
  }

  const editorView = MarkEdit.editorView;
  setHiddenSyntaxMode(editorView, mode === ViewMode.syntaxHidden);

  if (isEditorOnlyMode()) {
    // Don't call contentDOM.focus() here, it scrolls to the top
    editorView.focus();
  } else if (mode === ViewMode.preview) {
    // When the mode is side-by-side, focus won't be changed
    editorView.contentDOM.blur();
  }

  if (mode === ViewMode.sideBySide) {
    containerView.classList.add(ClassNames.containerClass);
    states.splitter ??= Split({
      columnGutters: [{ track: 1, element: gutterView }],
      minSize: 150,
      onDragStart: () => draggingStyle.disabled = false,
      onDragEnd: () => draggingStyle.disabled = true,
    });
  } else {
    containerView.classList.remove(ClassNames.containerClass);
    states.splitter?.destroy();
    states.splitter = undefined;
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
  const configuredModes = viewModes.map(mode => {
    switch (mode) {
      case 'edit': return ViewMode.edit;
      case 'side-by-side': return ViewMode.sideBySide;
      case 'preview': return ViewMode.preview;
      case 'syntax-hidden': return ViewMode.syntaxHidden;
      default: return undefined;
    }
  }).filter(mode => mode !== undefined);

  const canEdit = configuredModes.some(mode => mode === ViewMode.edit || mode === ViewMode.syntaxHidden);
  const rotation = canEdit ? configuredModes : [ViewMode.edit, ...configuredModes];

  // When current mode is not found, start at the beginning
  const currentIndex = rotation.indexOf(currentViewMode());
  const nextIndex = currentIndex === -1 ? 0 : ((currentIndex + 1) % rotation.length);
  setViewMode(rotation[nextIndex]);
}

export function restoreViewMode() {
  const cachedValue = localStorage.getItem(CacheKeys.viewModeCacheKey);
  if (cachedValue === null) {
    return;
  }

  const newMode = Number(cachedValue);
  if (currentViewMode() === newMode) {
    if (newMode === ViewMode.syntaxHidden) {
      setHiddenSyntaxMode(MarkEdit.editorView, true);
    }

    return;
  }

  setViewMode(newMode, true);
}

export function currentViewMode() {
  return states.viewMode;
}

export function isEditorOnlyMode() {
  const mode = currentViewMode();
  return mode === ViewMode.edit || mode === ViewMode.syntaxHidden;
}

let themeStyles: HTMLStyleElement | undefined;
let hljsStyles: HTMLStyleElement | undefined;

/**
 * With `"themeName": "auto"`, the css depends on the app's current theme,
 * which can change at runtime; refresh it whenever the preview updates.
 */
function refreshThemeStyles() {
  if (!isAutoTheme) {
    return;
  }

  if (themeStyles !== undefined) {
    themeStyles.textContent = previewThemeCss();
  }

  if (hljsStyles !== undefined) {
    hljsStyles.textContent = hljsCss();
  }
}

export async function renderHtmlPreview() {
  if (isEditorOnlyMode()) {
    return;
  }

  refreshThemeStyles();

  const html = replaceImageURLs(await getRenderedHtml());
  previewPane.innerHTML = html;

  handlePostRender(() => {
    syncScrollProgress(
      getEditPane(),
      getPreviewPane(),
      false,
    );

    const pageZoom = localStorage.getItem(CacheKeys.previewPageZoomKey);
    if (pageZoom !== null) {
      setPageZoom(pageZoom);
    }
  });
}

export function handlePageZoom(event: KeyboardEvent) {
  if (isEditorOnlyMode() || (currentViewMode() === ViewMode.sideBySide && MarkEdit.editorView.hasFocus)) {
    return;
  }

  if (!event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }

  // Shift-Cmd-0 belongs to View > Actual Size
  if (event.shiftKey && event.key === '0') {
    return;
  }

  const zoom = Number(previewPane.style.zoom) || 1.0;
  const clamp = (value: number) => String(Math.min(Math.max(value, 0.5), 3.0));

  // Shifted forms are accepted too, menus advertise these shortcuts as `Cmd +` and `Cmd -`
  switch (event.key) {
    case '-': case '_': setPageZoom(clamp(zoom - 0.1)); break;
    case '=': case '+': setPageZoom(clamp(zoom + 0.1)); break;
    case '0': setPageZoom('1'); break;
    default: return; // Ignores caching and event handling
  }

  localStorage.setItem(
    CacheKeys.previewPageZoomKey,
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

export function copyHtml() {
  const html = getRenderedHtml(false);
  const items = new ClipboardItem({
    'text/plain': html.then(value => new Blob([value], { type: 'text/plain' })),
  });

  return writeClipboard(items, localized('failedToCopy'));
}

export function copyRichText() {
  const html = getRenderedHtml(false);
  const items = new ClipboardItem({
    'text/html': html.then(value => new Blob([value], { type: 'text/html' })),
    'text/plain': html.then(value => new Blob([htmlToPlainText(value)], { type: 'text/plain' })),
  });

  return writeClipboard(items, localized('failedToCopy'));
}

export function getEditPane() {
  return MarkEdit.editorView.scrollDOM;
}

export function getPreviewPane() {
  return previewPane;
}

export async function generateStaticHtml(styled: boolean) {
  const html = await getRenderedHtml(false);
  return styled ? (await applyStyles(html)) : `<meta charset="UTF-8">\n${html}`;
}

/**
 * Render arbitrary markdown to HTML, mirroring `generateStaticHtml`
 * but using the provided input instead of the current document.
 */
export async function renderStaticHtml(markdown: string, styled: boolean) {
  const html = await renderMarkdown(markdown, false);
  return styled ? (await applyStyles(html)) : `<meta charset="UTF-8">\n${html}`;
}

async function getRenderedHtml(lineInfo = true) {
  const markdown = MarkEdit.editorAPI.getText();

  if (__FULL_BUILD__) {
    const fileType = await (async () => {
      if (typeof MarkEdit.getFileInfo !== 'function') {
        return undefined;
      }

      const fileInfo = await MarkEdit.getFileInfo();
      return getFileExtension(fileInfo?.filePath);
    })();

    // The entire file is mermaid
    if (fileType === '.mmd' || fileType === '.mermaid') {
      return await renderMermaid(markdown, lineInfo);
    }

    // The entire file is KaTeX
    if (fileType === '.tex') {
      return await renderKatex(markdown, lineInfo);
    }
  }

  return await renderMarkdown(markdown, lineInfo);
}

function updateGutterStyle() {
  const backgroundColor = getComputedStyle(previewPane).backgroundColor;
  gutterView.style.background = `linear-gradient(to right, transparent 50%, ${backgroundColor} 50%)`;
}

function setPageZoom(value: string) {
  previewPane.style.zoom = value;

  // Zooming in narrows the layout width,
  // mark it so that diagrams can opt out of shrinking.
  previewPane.classList.toggle('zoomed-in', Number(value) > 1);
}

async function saveGeneratedHtml(styled: boolean) {
  const fileName = await (async () => {
    const info = await MarkEdit.getFileInfo();
    if (info === undefined) {
      return `${localized('untitled')}.html`;
    }

    return `${getFileName(info.filePath)}.html`;
  })();

  const string = await generateStaticHtml(styled);
  MarkEdit.showSavePanel({ fileName, string });
}

async function handleExternalFiles(event: MouseEvent) {
  if (!(event.target instanceof Element)) {
    return;
  }

  const anchor = event.target.closest('a');
  if (anchor === null) {
    return;
  }

  // We need to handle this because it is outside of the webpage root
  const href = anchor.getAttribute('href');
  if (!href?.startsWith('../')) {
    return;
  }

  const basePath = (await MarkEdit.getFileInfo())?.parentPath;
  if (basePath === undefined) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  try {
    const absolutePath = joinPaths(basePath, decodeURIComponent(href));
    await MarkEdit.openFile(absolutePath);
  } catch (error) {
    console.error('Failed to open file:', error);
  }
}

/**
 * Opening a link steals focus and leaves WebKit's link :hover state stale.
 *
 * Suppress the underline after a click until the pointer actually leaves.
 */
function handleAnchorClick(event: MouseEvent) {
  const suppressor = 'suppress-underline';
  const anchor = event.target instanceof Element ? event.target.closest('a') : null;
  if (anchor !== null) {
    handlePreviewLinkClick(previewPane, event);
  }

  if (anchor === null || anchor.classList.contains(suppressor) || !anchor.matches(':hover')) {
    return;
  }

  anchor.classList.add(suppressor);
  anchor.addEventListener(
    'mouseleave',
    () => anchor.classList.remove(suppressor),
    { once: true },
  );
}

function handleTaskItemToggle(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.classList.contains('task-list-item-checkbox')) {
    return;
  }

  const block = target.closest<HTMLElement>('[data-line-from]');
  if (block === null) {
    console.error('Failed to find task item block');
    return;
  }

  const editorAPI = MarkEdit.editorAPI;
  const lineRange = editorAPI.getLineRange(getBlockRange(block).from);
  const toggle = resolveTaskToggle(editorAPI.getText(lineRange));

  // Source no longer matches; revert the native toggle to stay in sync
  if (toggle === null) {
    target.checked = !target.checked;
    console.error('Failed to resolve task toggle');
    return;
  }

  // Let the native toggle stand for instant feedback; just sync the source
  const from = lineRange.from + toggle.offset;
  MarkEdit.editorView.dispatch({
    changes: { from, to: from + 1, insert: toggle.replacement },
    annotations: silentChange.of(true),
  });
}

const states: {
  viewMode: ViewMode;
  splitter: Splitter | undefined;
} = {
  viewMode: ViewMode.edit,
  splitter: undefined,
};
