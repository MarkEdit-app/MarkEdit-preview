import { MarkEdit } from 'markedit-api';
import { isLocalImagePath, joinPaths } from './utils';

const parser = new DOMParser();
const scheme = 'image-loader';

const previewClass = 'cm-md-image-preview';
const previewOffset = 5;

/**
 * Replace localhost urls with a url scheme that can be used in the client.
 *
 * We don't use a markdown-it rule here because it's hard to handle inline html.
 */
export function replaceImageURLs(html: string) {
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll<HTMLImageElement>('img');

  images.forEach(image => {
    // Don't use image.src, which includes the host
    const url = image.getAttribute('src');
    if (url === null) {
      return;
    }

    // Image with a remote url or base64 data
    if (url.includes('://') || url.startsWith('data:image/')) {
      return;
    }

    // Image with a local file path
    image.src = `${scheme}://${url}`;
  });

  return doc.body.innerHTML;
}

/**
 * Enable hover preview for local images in the editor.
 */
export function enableHoverPreview(scrollDOM: HTMLElement) {
  // Prevent multiple initializations
  if (states.isInitialized) {
    return;
  }

  if (typeof MarkEdit.getFileInfo !== 'function') {
    return;
  }

  const mouseMoveHandler = (event: MouseEvent) => {
    if (states.panelPresenter !== undefined) {
      clearTimeout(states.panelPresenter);
      states.panelPresenter = undefined;
    }

    states.panelPresenter = setTimeout(() => {
      const targetElement = event.target as HTMLElement | null;
      const linkElement = targetElement?.closest('.cm-md-link') as HTMLElement | null;
      const filePath = linkElement?.dataset.linkUrl ?? linkElement?.innerText ?? '';

      if (linkElement !== null && isLocalImagePath(filePath)) {
        showPreviewPanel(linkElement, filePath);
      } else if (!targetElement?.classList.contains(previewClass)) {
        removePreviewPanel();
      }
    }, 600);
  };

  const visibilityChangeHandler = () => {
    if (document.visibilityState === 'hidden') {
      removePreviewPanel(false);
    }
  };

  const scrollHandler = () => removePreviewPanel();

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('visibilitychange', visibilityChangeHandler);
  scrollDOM.addEventListener('scroll', scrollHandler);

  // Store references for cleanup
  states.eventListeners = {
    mouseMoveHandler,
    visibilityChangeHandler,
    scrollHandler,
    scrollDOM,
  };

  states.isInitialized = true;
}

/**
 * Disable hover preview and cleanup event listeners.
 */
export function disableHoverPreview() {
  if (!states.isInitialized || !states.eventListeners) {
    return;
  }

  const { mouseMoveHandler, visibilityChangeHandler, scrollHandler, scrollDOM } = states.eventListeners;

  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('visibilitychange', visibilityChangeHandler);
  scrollDOM.removeEventListener('scroll', scrollHandler);

  removePreviewPanel(false);

  states.eventListeners = undefined;
  states.isInitialized = false;
}

// MARK: - Internal functions

async function showPreviewPanel(linkElement: HTMLElement, filePath: string) {
  if (linkElement === states.focusedElement) {
    return;
  }

  const basePath = (await MarkEdit.getFileInfo())?.parentPath;
  if (basePath === undefined) {
    return;
  }

  const absolutePath = joinPaths(basePath, filePath);
  const fileObject = await MarkEdit.getFileObject(absolutePath);
  if (fileObject === undefined) {
    return;
  }

  const rect = linkElement.getBoundingClientRect();
  const panel = document.createElement('img');

  panel.className = previewClass;
  panel.style.position = 'fixed';
  panel.style.left = `${rect.left}px`;
  panel.style.zIndex = '10000';
  panel.style.borderRadius = '5px';
  panel.style.opacity = '0';
  panel.style.transition = 'opacity 120ms';
  panel.style.cursor = 'pointer';

  panel.onclick = () => {
    removePreviewPanel();
    window.open(filePath, '_blank');
  };

  panel.onload = () => {
    const panelHeight = Math.min(panel.naturalHeight, 240);
    panel.style.height = `${panelHeight}px`;

    const firstHalf = rect.top;
    const secondHalf = window.innerHeight - rect.bottom;

    if (firstHalf > secondHalf) {
      panel.style.top = `${rect.top - panelHeight - previewOffset}px`;
    } else {
      panel.style.top = `${rect.bottom + previewOffset}px`;
    }

    requestAnimationFrame(() => {
      panel.style.opacity = '1';
    });
  };

  const mimeType = fileObject.mimeType ?? 'image/png';
  panel.src = `data:${mimeType};base64,${fileObject.data}`;

  removePreviewPanel(false);
  states.focusedElement = linkElement;
  document.body.appendChild(panel);
}

function removePreviewPanel(animated = true) {
  if (states.focusedElement === undefined) {
    return;
  }

  states.focusedElement = undefined;
  document.querySelectorAll(`.${previewClass}`).forEach((element: HTMLElement) => {
    if (animated) {
      element.style.opacity = '0';
      element.addEventListener(
        'transitionend',
        () => element.remove(),
        { once: true },
      );
    } else {
      element.remove();
    }
  });
}

const states: {
  panelPresenter: ReturnType<typeof setTimeout> | undefined;
  focusedElement: HTMLElement | undefined;
  isInitialized: boolean;
  eventListeners?: {
    mouseMoveHandler: (event: MouseEvent) => void;
    visibilityChangeHandler: () => void;
    scrollHandler: () => void;
    scrollDOM: HTMLElement;
  };
} = {
  panelPresenter: undefined,
  focusedElement: undefined,
  isInitialized: false,
};
