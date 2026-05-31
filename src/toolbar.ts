import { MarkEdit } from 'markedit-api';

interface ToolbarButton {
  label: string;
  title: string;
  action: () => void;
  isSep?: boolean;
}

let toolbarEl: HTMLElement | null = null;

/** Build and return the toolbar element (idempotent). */
export function createToolbar(): HTMLElement {
  if (toolbarEl !== null) {return toolbarEl;}

  toolbarEl = document.createElement('div');
  toolbarEl.className = 'wysiwyg-toolbar';
  toolbarEl.setAttribute('role', 'toolbar');
  toolbarEl.setAttribute('aria-label', 'Formatting toolbar');

  const buttons: ToolbarButton[] = [
    { label: 'H1', title: 'Heading 1', action: () => fmt('h1') },
    { label: 'H2', title: 'Heading 2', action: () => fmt('h2') },
    { label: 'H3', title: 'Heading 3', action: () => fmt('h3') },
    { label: '', title: '', action: () => {}, isSep: true },
    { label: '<b>B</b>', title: 'Bold', action: () => exec('bold') },
    { label: '<i>I</i>', title: 'Italic', action: () => exec('italic') },
    { label: '<s>S</s>', title: 'Strikethrough', action: () => exec('strikeThrough') },
    { label: '&#x60;&#x60;', title: 'Inline code', action: insertInlineCode },
    { label: '&#x60;&#x60;&#x60;', title: 'Code block', action: insertCodeBlock },
    { label: '', title: '', action: () => {}, isSep: true },
    { label: '&#8220;', title: 'Blockquote', action: () => fmt('blockquote') },
    { label: '&bull;', title: 'Unordered list',action: () => exec('insertUnorderedList') },
    { label: '1.', title: 'Ordered list', action: () => exec('insertOrderedList') },
    { label: '', title: '', action: () => {}, isSep: true },
    { label: '&#128279;', title: 'Insert link', action: insertLink },
    { label: '&#8212;', title: 'Horizontal rule',action: () => exec('insertHorizontalRule') },
  ];

  for (const btn of buttons) {
    if (btn.isSep === true) {
      const sep = document.createElement('span');
      sep.className = 'wysiwyg-sep';
      sep.setAttribute('aria-hidden', 'true');
      toolbarEl.appendChild(sep);
      continue;
    }
    const el = document.createElement('button');
    el.className = 'wysiwyg-btn';
    el.title = btn.title;
    el.innerHTML = btn.label;
    el.type = 'button';
    // mousedown fires before blur, preserving focus on the preview pane
    el.addEventListener('mousedown', e => {
      e.preventDefault();
      btn.action();
    });
    toolbarEl.appendChild(el);
  }

  return toolbarEl;
}

/** Remove the toolbar from its parent and reset the reference. */
export function removeToolbar(preview: HTMLElement): void {
  preview.querySelector('.wysiwyg-toolbar')?.remove();
  toolbarEl = null;
}

// ── Formatting helpers ────────────────────────────────────────────────────────

function exec(command: string, value?: string): void {
  document.execCommand(command, false, value);
  fireInput();
}

function fmt(tag: string): void {
  document.execCommand('formatBlock', false, tag);
  fireInput();
}

/** Dispatch an input event on the preview pane so wysiwyg.ts syncs the source. */
function fireInput(): void {
  document.querySelector('.markdown-body')?.dispatchEvent(
    new Event('input', { bubbles: true }),
  );
}

function insertInlineCode(): void {
  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const range = sel.getRangeAt(0);
  const code = document.createElement('code');
  code.textContent = range.toString() || 'code';
  range.deleteContents();
  range.insertNode(code);
  range.setStartAfter(code);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  fireInput();
}

function insertCodeBlock(): void {
  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const range = sel.getRangeAt(0);
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = range.toString() || 'code block';
  pre.appendChild(code);
  range.deleteContents();
  range.insertNode(pre);
  range.setStartAfter(pre);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  fireInput();
}

async function insertLink(): Promise<void> {
  const url = await MarkEdit.showTextBox({
    title: 'Insert Link',
    placeholder: 'https://example.com',
  });
  if (url === undefined || url.trim() === '') {return;}
  exec('createLink', url.trim());
}
