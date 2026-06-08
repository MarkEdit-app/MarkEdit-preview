import type { Mode } from './mode';

/**
 * Disable the force-touch deep press (link preview / look up) on links, while
 * keeping it available for normal text.
 */
export function interceptForceTouch() {
  document.addEventListener('webkitmouseforcewillbegin', event => {
    const target = event.target;
    if (target instanceof Element && target.closest('a') !== null) {
      event.preventDefault();
    }
  });
}

/**
 * Redirect pinch-zoom to the preview pane in preview mode by overriding the
 * `pinchZoomTarget` resolver from `@light`.
 */
export function interceptPinchZoom(getMode: () => Mode, previewPane: HTMLElement) {
  const bridgeHost = window as unknown as {
    pinchZoomTarget?: () => { scroller: HTMLElement; inner: HTMLElement } | null;
  };

  const originalTarget = bridgeHost.pinchZoomTarget;
  bridgeHost.pinchZoomTarget = () => {
    if (getMode() !== 'preview') {
      return originalTarget?.() ?? null;
    }

    const inner = previewPane.querySelector<HTMLElement>('.quicklook-content');
    return inner !== null ? { scroller: previewPane, inner } : null;
  };

  // The toolbar-clearance margin lives on the zoomed element, so `zoom` scales it.
  // Track the live zoom in `--quicklook-zoom` so the margin can divide it back out (see CSS).
  for (const event of ['gesturechange', 'gestureend'] as const) {
    document.addEventListener(event, () => {
      if (getMode() !== 'preview') {
        return;
      }

      const inner = previewPane.querySelector<HTMLElement>('.quicklook-content');
      if (inner?.style.zoom.length) {
        inner?.style.setProperty('--quicklook-zoom', inner.style.zoom);
      } else {
        inner?.style.removeProperty('--quicklook-zoom');
      }
    }, { passive: false });
  }
}

/**
 * In preview mode, take over the global scrollbar-drag bridge so it drives the
 * preview pane instead of the source editor. In source mode, delegate to the
 * original handlers installed by CoreEditor's `@light` bundle.
 */
export function interceptDragging(getMode: () => Mode, previewPane: HTMLElement) {
  let scrollbarOffset: number | undefined;
  type DragFn = (location: number) => void;
  type CancelFn = () => void;

  const bridgeHost = window as unknown as {
    startDragging?: DragFn;
    updateDragging?: DragFn;
    cancelDragging?: CancelFn;
  };

  const originalDragging = {
    start: bridgeHost.startDragging,
    update: bridgeHost.updateDragging,
    cancel: bridgeHost.cancelDragging,
  };

  const geometry = () => {
    const clientHeight = previewPane.clientHeight;
    const scrollHeight = previewPane.scrollHeight;
    const scrollableSpace = scrollHeight - clientHeight;
    if (scrollableSpace <= 0 || scrollHeight <= 0) {
      return { clientHeight, scrollHeight, scrollbarHeight: clientHeight, scrollbarTop: 0 };
    }

    const scrollbarHeight = clientHeight * (clientHeight / scrollHeight);
    const progress = previewPane.scrollTop / scrollableSpace;
    const scrollbarTop = progress * (clientHeight - scrollbarHeight);
    return { clientHeight, scrollHeight, scrollbarHeight, scrollbarTop };
  };

  const scrollToLocation = (location: number, offset: number, behavior: ScrollBehavior = 'auto') => {
    const { clientHeight, scrollHeight, scrollbarHeight } = geometry();
    const scrollableSpace = clientHeight - scrollbarHeight;
    if (scrollableSpace > 0) {
      const percentage = (location - offset) / scrollableSpace;
      previewPane.scrollTo({
        top: percentage * (scrollHeight - clientHeight),
        behavior,
      });
    }
  };

  bridgeHost.startDragging = (original: number) => {
    if (getMode() !== 'preview') {
      originalDragging.start?.(original);
      return;
    }

    const { scrollbarTop, scrollbarHeight } = geometry();
    const location = convertToLocal(previewPane, original);
    scrollbarOffset = location - scrollbarTop;

    if (location < scrollbarTop || location > scrollbarTop + scrollbarHeight) {
      scrollToLocation(location, scrollbarHeight * 0.5, 'smooth');
    }
  };

  bridgeHost.updateDragging = (location: number) => {
    if (getMode() !== 'preview') {
      originalDragging.update?.(location);
      return;
    }

    if (scrollbarOffset !== undefined) {
      scrollToLocation(convertToLocal(previewPane, location), scrollbarOffset);
    }
  };

  bridgeHost.cancelDragging = () => {
    if (getMode() !== 'preview') {
      originalDragging.cancel?.();
      return;
    }

    scrollbarOffset = undefined;
  };
}

/**
 * Hijack the wheel event on the toolbar so that it scrolls the correct target.
 */
export function interceptWheelEvent(getMode: () => Mode, previewPane: HTMLElement, toolbar: HTMLElement) {
  toolbar.addEventListener('wheel', (event) => {
    const target = getMode() === 'preview' ? previewPane : document.querySelector<HTMLElement>('.cm-scroller');
    if (target === null) {
      return;
    }

    target.scrollTop += event.deltaY;
    target.scrollLeft += event.deltaX;
    event.preventDefault();
  }, { passive: false });
}

/**
 * Toggle a `scrolled` class on `toolbar` whenever the active pane is scrolled
 * away from the top. Returns a refresh callback to invoke on mode changes.
 */
export function trackToolbarSeparator(getMode: () => Mode, previewPane: HTMLElement, toolbar: HTMLElement) {
  const sourcePane = document.querySelector<HTMLElement>('.cm-scroller');
  const update = () => {
    const target = getMode() === 'preview' ? previewPane : sourcePane;
    const scrollTop = target?.scrollTop ?? 0;
    toolbar.classList.toggle('scrolled', scrollTop > 0);
    toolbar.classList.toggle('scrolled-far', scrollTop > 20);
  };

  previewPane.addEventListener('scroll', update, { passive: true });
  sourcePane?.addEventListener('scroll', update, { passive: true });
  return update;
}

/**
 * Make cmd-c copy the preview pane instead of the focused source editor.
 * Capture-phase `copy` beats CodeMirror's handler regardless of focus.
 */
export function interceptPreviewCopy(previewPane: HTMLElement) {
  document.addEventListener('copy', event => {
    if (!previewPane.classList.contains('overlay')) {
      return;
    }

    const selection = getSelection();
    const range = selection !== null && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const previewRange = range !== null && !range.collapsed && previewPane.contains(range.commonAncestorContainer) ? range : null;

    const fragment = previewRange ?? (() => {
      const fullRange = document.createRange();
      fullRange.selectNodeContents(previewPane);
      return fullRange;
    })();

    const container = document.createElement('div');
    container.appendChild(fragment.cloneContents());

    event.clipboardData?.setData('text/html', container.innerHTML);
    event.clipboardData?.setData('text/plain', previewRange !== null ? previewRange.toString() : previewPane.innerText);

    event.preventDefault();
    event.stopPropagation();
  }, true);
}

function convertToLocal(previewPane: HTMLElement, viewportY: number) {
  return viewportY - previewPane.getBoundingClientRect().top;
}
