import { createToolbar } from './toolbar';
import { currentMode, saveMode } from './mode';
import { getEditorText } from './editor';
import {
  interceptForceTouch,
  interceptPinchZoom,
  interceptDragging,
  interceptWheelEvent,
  interceptPreviewCopy,
  trackToolbarSeparator,
} from './interaction';
import { renderMarkdown, handlePostRender } from '../render';
import { replaceImageURLs } from '../features/image';
import { appendStyle } from '../shared/utils';
import quicklookCss from '../../styles/quicklook.css?raw';

/**
 * Quick Look (lite host) UI: a toolbar with a segmented control that toggles
 * between the underlying source editor and the rendered markdown overlay.
 */
export function setUpQuickLook(previewPane: HTMLElement) {
  appendStyle(quicklookCss);
  document.body.classList.add('quicklook');

  const { toolbar, sourceButton, previewButton } = createToolbar();
  document.body.appendChild(toolbar);

  const renderer = createRenderer(previewPane);
  const refreshSeparator = trackToolbarSeparator(currentMode, previewPane, toolbar);

  const context: ViewContext = {
    previewPane,
    sourceButton,
    previewButton,
    refreshSeparator,
    ensureRendered: renderer.ensureRendered,
  };

  sourceButton.addEventListener('click', () => {
    saveMode('source');
    updateViews(context);
  });

  previewButton.addEventListener('click', () => {
    saveMode('preview');
    updateViews(context);
  });

  updateViews(context);
  setTimeout(renderer.ensureRendered, 0);

  // Re-render the preview on color-scheme change so Mermaid picks up the new theme
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (previewPane.querySelector('.mermaid') === null) {
      return;
    }

    renderer.invalidate();
    if (currentMode() === 'preview') {
      void renderer.ensureRendered();
    }
  });

  interceptForceTouch();
  interceptPinchZoom(currentMode, previewPane);
  interceptDragging(currentMode, previewPane);
  interceptWheelEvent(currentMode, previewPane, toolbar);
  interceptPreviewCopy(previewPane);
}

interface ViewContext {
  previewPane: HTMLElement;
  sourceButton: HTMLButtonElement;
  previewButton: HTMLButtonElement;
  refreshSeparator: () => void;
  ensureRendered: () => Promise<void> | undefined;
}

function updateViews(context: ViewContext) {
  const sourceSelected = currentMode() === 'source';
  const previewSelected = !sourceSelected;

  context.sourceButton.classList.toggle('active', sourceSelected);
  context.previewButton.classList.toggle('active', previewSelected);
  context.sourceButton.setAttribute('aria-selected', String(sourceSelected));
  context.previewButton.setAttribute('aria-selected', String(previewSelected));
  context.previewPane.classList.toggle('overlay', previewSelected);
  context.refreshSeparator();

  if (previewSelected) {
    void context.ensureRendered();
  }
}

/**
 * Render the markdown into `previewPane` once. `invalidate` clears the cache
 * so the next `ensureRendered` call re-runs the render pipeline.
 */
function createRenderer(previewPane: HTMLElement): {
  ensureRendered: () => Promise<void> | undefined;
  invalidate: () => void;
} {
  let rendered = false;
  let prerender: Promise<void> | undefined;

  const ensureRendered = () => {
    if (rendered || prerender) {
      return prerender;
    }

    prerender = (async () => {
      try {
        const innerHTML = replaceImageURLs(await renderMarkdown(getEditorText(), false));
        previewPane.innerHTML = `<div class="quicklook-content">${innerHTML}</div>`;

        // Links aren't interactive in quicklook; drop href so WebKit treats them
        // as selectable plain text.
        previewPane.querySelectorAll('a[href]').forEach(anchor => {
          anchor.removeAttribute('href');
          anchor.removeAttribute('target');
        });

        handlePostRender(() => {});
        rendered = true;
      } catch (error) {
        prerender = undefined;
        throw error;
      }
    })();

    return prerender;
  };

  const invalidate = () => {
    rendered = false;
    prerender = undefined;
  };

  return { ensureRendered, invalidate };
}
