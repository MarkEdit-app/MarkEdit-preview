import type { EditorState, Range } from '@codemirror/state';
import { Decoration } from '@codemirror/view';
import type { SyntaxNodeRef } from '@lezer/common';
import { selectionIntersects } from './selection';

const marks = new Map([
  ['Emphasis', 'EmphasisMark'],
  ['StrongEmphasis', 'EmphasisMark'],
  ['Strikethrough', 'StrikethroughMark'],
  ['InlineCode', 'CodeMark'],
]);

const hiddenSyntax = Decoration.mark({ class: 'cm-md-syntaxHiddenSource' });
const inlineCodeBoundary = 'cm-md-syntaxHiddenInlineCodeBoundary';
const inlineCodeStart = Decoration.mark({ class: `${inlineCodeBoundary} cm-md-syntaxHiddenInlineCodeStart` });
const inlineCodeEnd = Decoration.mark({ class: `${inlineCodeBoundary} cm-md-syntaxHiddenInlineCodeEnd` });
const inlineCodeBoth = Decoration.mark({ class: `${inlineCodeBoundary} cm-md-syntaxHiddenInlineCodeStart cm-md-syntaxHiddenInlineCodeEnd` });

export function inlineSyntaxDecorations(node: SyntaxNodeRef, state: EditorState): Range<Decoration>[] {
  const parent = node.node.parent;
  if (parent === null || marks.get(parent.name) !== node.name || selectionIntersects(state, parent.from, parent.to)) {
    return [];
  }

  const decorations = [hiddenSyntax.range(node.from, node.to)];
  if (parent.name !== 'InlineCode' || node.from !== parent.from) {
    return decorations;
  }

  const contentFrom = parent.firstChild?.to;
  const contentTo = parent.lastChild?.from;
  if (contentFrom === undefined || contentTo === undefined || contentFrom >= contentTo) {
    return decorations;
  }

  if (contentTo - contentFrom === 1) {
    decorations.push(inlineCodeBoth.range(contentFrom, contentTo));
  } else {
    decorations.push(inlineCodeStart.range(contentFrom, contentFrom + 1));
    decorations.push(inlineCodeEnd.range(contentTo - 1, contentTo));
  }

  return decorations;
}
