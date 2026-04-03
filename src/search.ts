import Mark from 'mark.js';
import { currentViewMode, getPreviewPane, ViewMode } from './view';
import { themeName } from './settings';

const MARK_MATCH_CLASS = 'markedit-preview-mark';
const MARK_HIGHLIGHTED_CLASS = 'markedit-preview-mark-highlighted';

let isApplying = false;
let currentOptions: SearchOptions | undefined;
let currentIndex = 0;
let markElements: HTMLElement[] = [];
let contentObserver: MutationObserver | null = null;
let markStyleSheet: HTMLStyleElement | null = null;

// Mirrors CoreEditor's EditorColors.searchMatch, keyed by the plugin's themeName setting.
const searchMatchColors: Record<string, { light: string; dark: string }> = {
  'github': { light: '#fae17d7f', dark: '#f2cc607f' },
  'cobalt': { light: '#cad40f66', dark: '#cad40f66' },
  'dracula': { light: '#ffffff40', dark: '#ffffff40' },
  'minimal': { light: '#fae17d7f', dark: '#f2cc607f' },
  'night-owl': { light: '#5f7e9779', dark: '#5f7e9779' },
  'rose-pine': { light: '#6e6a864c', dark: '#6e6a8666' },
  'solarized': { light: '#f4c09d', dark: '#584032' },
  'synthwave84': { light: '#d18616bb', dark: '#d18616bb' },
  'winter-is-coming': { light: '#cee1f0', dark: '#103362' },
  'xcode': { light: '#e4e4e4', dark: '#545558' },
};

export interface SearchOptions {
  search: string;
  caseSensitive: boolean;
  diacriticInsensitive: boolean;
  wholeWord: boolean;
  regexp: boolean;
}

export interface SearchCounterInfo {
  numberOfItems: number;
  currentIndex: number;
}

export function performSearch(options: SearchOptions) {
  currentOptions = options;
  currentIndex = 0;

  if (options.search.length === 0) {
    clearSearch();
    return;
  }

  const container = getPreviewPane();
  remarkWithNewOptions(container);
  observeContentChanges(container);
}

export function setSearchMatchIndex(index: number) {
  if (markElements.length === 0) {
    return;
  }

  // The editor may have more matches than the rendered preview (e.g. inside code fences);
  // use modulo to stay in range rather than clamping to the last element.
  currentIndex = index % markElements.length;
  highlightCurrent();
}

export function clearSearch() {
  contentObserver?.disconnect();
  contentObserver = null;
  currentOptions = undefined;
  currentIndex = 0;
  markElements = [];
  new Mark(getPreviewPane()).unmark();
}

// Returns undefined outside overlay mode so the editor's own counter is used instead.
export function searchCounterInfo(): SearchCounterInfo | undefined {
  if (currentViewMode() !== ViewMode.preview) {
    return undefined;
  }

  return { numberOfItems: markElements.length, currentIndex };
}

function remarkWithNewOptions(container: HTMLElement) {
  const options = currentOptions;
  if (options === undefined || options.search.length === 0) {
    return;
  }

  if (isApplying) {
    return;
  }

  updateStyles();
  isApplying = true;

  const { search, caseSensitive, wholeWord, diacriticInsensitive, regexp } = options;
  const marker = new Mark(container);

  const onComplete = () => {
    markElements = Array.from(container.querySelectorAll<HTMLElement>(`.${MARK_MATCH_CLASS}`));
    currentIndex = markElements.length > 0 ? Math.min(currentIndex, markElements.length - 1) : 0;
    highlightCurrent();
    isApplying = false;
  };

  marker.unmark({
    done: () => {
      if (regexp) {
        try {
          const flags = caseSensitive ? '' : 'i';
          marker.markRegExp(new RegExp(search, flags), {
            className: MARK_MATCH_CLASS,
            done: onComplete,
          });
        } catch {
          isApplying = false;
          currentIndex = 0;
          markElements = [];
        }
      } else {
        marker.mark(search, {
          className: MARK_MATCH_CLASS,
          caseSensitive,
          diacritics: diacriticInsensitive,
          separateWordSearch: false,
          accuracy: wholeWord ? 'exactly' : 'partially',
          done: onComplete,
        });
      }
    },
  });
}

// Show the current-match indicator only when not in side-by-side mode, where
// the editor's own highlight is already visible and indices may not correspond.
function highlightCurrent() {
  const shouldHighlight = currentViewMode() !== ViewMode.sideBySide;
  markElements.forEach((mark, index) => {
    mark.classList.toggle(MARK_HIGHLIGHTED_CLASS, shouldHighlight && index === currentIndex);
  });

  if (shouldHighlight && markElements.length > 0) {
    markElements[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function observeContentChanges(container: HTMLElement) {
  contentObserver?.disconnect();

  // Observe only direct children — fires on preview re-renders (innerHTML
  // replacement) but not on mark.js changes inside nested block elements.
  contentObserver = new MutationObserver(() => {
    if (!isApplying) {
      remarkWithNewOptions(container);
    }
  });

  contentObserver.observe(container, { childList: true });
}

// Mirrors .cm-searchMatch / .cm-searchMatch-selected from CoreEditor's builder.ts.
// Light/dark colors follow the preview's own themeName, not the editor's active theme.
function updateStyles() {
  if (markStyleSheet === null) {
    markStyleSheet = document.createElement('style');
    document.head.appendChild(markStyleSheet);
  }

  const { light, dark } = searchMatchColors[themeName] ?? searchMatchColors['github'];
  markStyleSheet.textContent = [
    `.${MARK_MATCH_CLASS} { background: ${light} !important; color: inherit !important; }`,
    `.${MARK_HIGHLIGHTED_CLASS} { background: #ffff00 !important; color: #000000 !important; box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2); }`,
    '@media (prefers-color-scheme: dark) {',
    `  .${MARK_MATCH_CLASS} { background: ${dark} !important; }`,
    '}',
  ].join('\n');
}
