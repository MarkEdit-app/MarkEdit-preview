import type { EditorState, Range } from '@codemirror/state';
import { Decoration } from '@codemirror/view';
import type { SyntaxNodeRef } from '@lezer/common';
import { inlineSyntaxRevealed } from './selection';

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
  const syntax = inlineSyntax(node);
  if (syntax === undefined || inlineSyntaxRevealed(state, node.from, node.to)) {
    return [];
  }

  const decorations = syntax.hidden.map(mark => hiddenSyntax.range(mark.from, mark.to));
  if (node.name !== 'InlineCode') {
    return decorations;
  }

  const contentFrom = node.node.firstChild?.to;
  const contentTo = node.node.lastChild?.from;
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

export function inlineSyntax(node: SyntaxNodeRef) {
  const markName = marks.get(node.name);
  const hidden = markName === undefined ? [] : node.node.getChildren(markName);
  if (hidden.length > 0) {
    return { hidden };
  }
}
