import type { EditorState } from '@codemirror/state';
import type { SyntaxNodeRef } from '@lezer/common';
import { selectionIntersects } from './selection';

export function atxHeadingSyntaxRange(node: SyntaxNodeRef, state: EditorState) {
  const parent = node.node.parent;
  if (node.name !== 'HeaderMark' || parent?.name.startsWith('ATXHeading') !== true) {
    return;
  }

  const firstChild = parent.firstChild;
  if (firstChild?.from !== node.from) {
    return;
  }

  const hiddenTo = takeFollowingSpaces(state, node.to, parent.to);
  if (!hasHeadingContent(state, hiddenTo, parent.to) || selectionIntersects(state, parent.from, parent.to)) {
    return;
  }

  return { from: node.from, to: hiddenTo };
}

export function setextHeadingSyntaxLine(node: SyntaxNodeRef, state: EditorState) {
  const parent = node.node.parent;
  if (node.name !== 'HeaderMark' || parent?.name.startsWith('SetextHeading') !== true) {
    return;
  }

  const line = state.doc.lineAt(node.from);
  if (selectionIntersects(state, parent.from, parent.to)) {
    return;
  }

  return line.from;
}

function takeFollowingSpaces(state: EditorState, pos: number, to: number) {
  return pos + (/^ */.exec(state.sliceDoc(pos, to))?.[0].length ?? 0);
}

function hasHeadingContent(state: EditorState, from: number, to: number) {
  return /\S/.test(state.sliceDoc(from, to));
}
