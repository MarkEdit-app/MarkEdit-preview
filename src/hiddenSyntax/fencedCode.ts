import { foldedRanges } from '@codemirror/language';
import type { Range } from '@codemirror/state';
import { Decoration, type EditorView } from '@codemirror/view';
import type { SyntaxNodeRef } from '@lezer/common';
import { selectionReveals } from './selection';

const hiddenFence = Decoration.mark({
  class: 'cm-md-syntaxHiddenSource cm-md-syntaxHiddenFence',
});

export function fencedCodeDecorations(node: SyntaxNodeRef, view: EditorView) {
  const ranges: Range<Decoration>[] = [];
  if (node.name !== 'FencedCode') {
    return ranges;
  }

  const state = view.state;
  const opening = node.node.firstChild;
  const closing = node.node.lastChild;
  if (opening?.name !== 'CodeMark' || closing?.name !== 'CodeMark' || opening.from === closing.from || !state.sliceDoc(opening.from, opening.to).startsWith('```')) {
    return ranges;
  }

  const firstLine = state.doc.lineAt(opening.from);
  const lastLine = state.doc.lineAt(closing.from);
  const info = node.node.getChild('CodeInfo');
  if (__FULL_BUILD__ && info !== null && state.sliceDoc(info.from, info.to).trim() === 'mermaid') {
    return ranges;
  }

  let folded = false;
  foldedRanges(state).between(firstLine.to, lastLine.to, (from, to) => {
    if (from >= firstLine.to && to >= lastLine.to) {
      folded = true;
      return false;
    }
  });

  if (folded) {
    return ranges;
  }

  const revealed = selectionReveals(state, node.from, node.to);
  for (const { from, to } of view.visibleRanges) {
    const first = Math.max(firstLine.number, state.doc.lineAt(from).number);
    const last = Math.min(lastLine.number, state.doc.lineAt(to).number);
    for (let number = first; number <= last; number++) {
      const line = state.doc.line(number);
      const classes = ['cm-md-syntaxHiddenCodeBlock'];
      if (number === firstLine.number) {
        classes.push('cm-md-syntaxHiddenCodeStart');
      }

      if (number === lastLine.number) {
        classes.push('cm-md-syntaxHiddenCodeEnd');
      }

      const attributes = number === firstLine.number && !revealed && info !== null
        ? { 'data-code-language': state.sliceDoc(info.from, info.to).trim().split(/\s+/)[0] }
        : undefined;
      ranges.push(Decoration.line({ class: classes.join(' '), attributes }).range(line.from));
    }
  }

  if (!revealed) {
    ranges.push(hiddenFence.range(opening.from, firstLine.to));
    ranges.push(hiddenFence.range(closing.from, lastLine.to));
  }

  return ranges;
}
