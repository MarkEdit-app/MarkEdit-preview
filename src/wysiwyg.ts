/**
 * WYSIWYG editing mode for MarkEdit-preview.
 *
 * When active, the preview pane becomes contentEditable. User edits are
 * converted from HTML back to Markdown via Turndown and pushed to the
 * CodeMirror source editor through MarkEdit.editorAPI.setText().
 *
 * Anti-loop: the WYSIWYG lock suppresses renderHtmlPreview() for 600ms
 * after each edit so the source-editor update listener does not immediately
 * re-render the preview and destroy the user cursor position.
 */

import TurndownService from 'turndown';
// @ts-expect-error no bundled types; @types/turndown covers TurndownService only
import { gfm } from 'turndown-plugin-gfm';
import { MarkEdit } from 'markedit-api';
import { getPreviewPane, setWysiwygEditLock, renderHtmlPreview } from './view';
import { invalidateBlockCache } from './scroll';
import { createToolbar, removeToolbar } from './toolbar';

// Turndown instance configured for GFM-compliant markdown output
const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
});
turndown.use(gfm);

let isWysiwygActive = false;
let editLockTimer: ReturnType<typeof setTimeout> | undefined;

export function isWysiwyg(): boolean {
  return isWysiwygActive;
}

export function enableWysiwyg(): void {
  if (isWysiwygActive) {return;}
  isWysiwygActive = true;
  const preview = getPreviewPane();
  preview.contentEditable = 'true';
  preview.spellcheck = true;
  preview.classList.add('wysiwyg-active');
  preview.addEventListener('input', onPreviewInput);
  injectToolbar(preview);
  invalidateBlockCache(); // toolbar shifts block offsetTops
  preview.focus();
}

export function disableWysiwyg(): void {
  if (!isWysiwygActive) {return;}
  isWysiwygActive = false;
  if (editLockTimer !== undefined) {
    clearTimeout(editLockTimer);
    editLockTimer = undefined;
  }
  setWysiwygEditLock(false);
  const preview = getPreviewPane();
  preview.contentEditable = 'false';
  preview.classList.remove('wysiwyg-active');
  preview.removeEventListener('input', onPreviewInput);
  removeToolbar(preview);
  invalidateBlockCache(); // toolbar removal restores block offsetTops
  renderHtmlPreview();
}

/** Re-inject toolbar after renderHtmlPreview() replaces innerHTML. */
export function injectToolbar(preview: HTMLElement): void {
  if (preview.querySelector('.wysiwyg-toolbar') !== null) {return;}
  const toolbar = createToolbar();
  preview.insertBefore(toolbar, preview.firstChild);
}

function onPreviewInput(): void {
  if (editLockTimer !== undefined) {clearTimeout(editLockTimer);}
  setWysiwygEditLock(true);
  editLockTimer = setTimeout(() => {
    setWysiwygEditLock(false);
    editLockTimer = undefined;
  }, 600);
  MarkEdit.editorAPI.setText(htmlToMarkdown());
}

function htmlToMarkdown(): string {
  const preview = getPreviewPane();
  const clone = preview.cloneNode(true) as HTMLElement;
  clone.querySelector('.wysiwyg-toolbar')?.remove();
  clone.querySelectorAll('[data-line-from],[data-line-to]').forEach(el => {
    el.removeAttribute('data-line-from');
    el.removeAttribute('data-line-to');
  });
  return turndown.turndown(clone.innerHTML);
}
