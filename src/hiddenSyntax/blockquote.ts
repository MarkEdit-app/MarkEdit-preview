import type { EditorState } from '@codemirror/state';
import type { SyntaxNodeRef } from '@lezer/common';
import { selectionIntersects } from './selection';

const alertTitles = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
} as const;

export type BlockquoteAlertType = keyof typeof alertTitles;

export function blockquoteAlert(node: SyntaxNodeRef, state: EditorState) {
  if (node.name !== 'Blockquote') {
    return;
  }

  const paragraph = node.node.getChild('Paragraph');
  if (paragraph === null) {
    return;
  }

  let child = node.node.firstChild;
  while (child !== null && (child.from !== paragraph.from || child.to !== paragraph.to)) {
    if (child.name !== 'QuoteMark') {
      return;
    }

    child = child.nextSibling;
  }

  if (child === null) {
    return;
  }

  const line = state.doc.lineAt(paragraph.from);
  const source = state.sliceDoc(paragraph.from, line.to);
  const match = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=[ \t]*$)/i.exec(source);
  if (match === null) {
    return;
  }

  const type = match[1].toLowerCase() as BlockquoteAlertType;
  const from = paragraph.from;
  const to = from + match[0].length;
  if (selectionIntersects(state, from, to)) {
    return;
  }

  return { from, to, type, title: alertTitles[type] };
}

export function blockquoteSyntaxRange(node: SyntaxNodeRef, state: EditorState) {
  if (node.name !== 'QuoteMark') {
    return;
  }

  if (selectionIntersects(state, node.from, node.to)) {
    return;
  }

  return { from: node.from, to: node.to };
}

export function blockquoteStyleRange(node: SyntaxNodeRef) {
  if (node.name !== 'Blockquote') {
    return;
  }

  let depth = 1;
  let owner = node.node.parent;
  while (owner !== null) {
    if (owner.name === 'Blockquote') {
      depth += 1;
    }

    owner = owner.parent;
  }

  return { from: node.from, to: node.to, depth };
}
