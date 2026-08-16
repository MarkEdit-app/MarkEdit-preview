import type { EditorState } from '@codemirror/state';
import type { SyntaxNodeRef } from '@lezer/common';
import { selectionIntersects } from './selection';

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
