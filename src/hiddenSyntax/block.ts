import { foldedRanges, syntaxTree } from '@codemirror/language';
import { type EditorState, type Range, StateField } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView } from '@codemirror/view';
import type { SyntaxNodeRef } from '@lezer/common';
import { BlockMathWidget } from './components/math';
import { MermaidWidget } from './components/mermaid';
import { TableWidget, tableRenderFailed } from './components/table';
import { selectionReveals } from './selection';
import { renderTableBlocks } from '../render';

interface BlockDecorationState {
  all: DecorationSet;
  visible: DecorationSet;
}

export const renderedBlockDecorations = StateField.define<BlockDecorationState>({
  create: state => createBlockDecorationState(state),
  update(value, transaction) {
    if (transaction.docChanged || transaction.reconfigured
      || syntaxTree(transaction.startState) !== syntaxTree(transaction.state)) {
      const previous: Range<Decoration>[] = [];
      for (const cursor = value.all.iter(); cursor.value !== null; cursor.next()) {
        if (cursor.value.spec.widget instanceof TableWidget) {
          const from = transaction.changes.mapPos(cursor.from, 1);
          const to = transaction.changes.mapPos(cursor.to, -1);
          if (from < to) {
            previous.push(cursor.value.range(from, to));
          }
        }
      }

      return createBlockDecorationState(transaction.state, Decoration.set(previous, true));
    }

    let all = value.all;
    for (const effect of transaction.effects) {
      if (effect.is(tableRenderFailed) && effect.value.doc === transaction.state.doc) {
        all = all.update({ filter: (from, to) => from !== effect.value.from || to !== effect.value.to });
      }
    }

    if (transaction.selection !== undefined || transaction.effects.length > 0) {
      return {
        all,
        visible: hideSelectedBlocks(all, transaction.state),
      };
    }

    return value;
  },
  provide: field => EditorView.decorations.from(field, value => value.visible),
});

function createBlockDecorationState(state: EditorState, previous = Decoration.none): BlockDecorationState {
  const all = createBlockDecorations(state, previous);
  return { all, visible: hideSelectedBlocks(all, state) };
}

function createBlockDecorations(state: EditorState, previous: DecorationSet) {
  const ranges: Range<Decoration>[] = [];
  const tree = syntaxTree(state);

  const context: string[] = [];
  tree.iterate({
    enter: node => {
      if (node.name === 'Document') {
        return;
      }

      const source = state.sliceDoc(state.doc.lineAt(node.from).from, state.doc.lineAt(node.to).to);
      if ((node.name !== 'Paragraph' && node.name !== 'Table') || source.includes('[')) {
        context.push(source);
      }

      return false;
    },
  });

  const slice = state.sliceDoc(tree.length);
  context.push(slice);

  let tables: ReturnType<typeof renderTableBlocks> | undefined;
  const renderTables = () => tables ??= renderTableBlocks(state.doc.toString());
  const referenceContext = JSON.stringify(context);

  tree.iterate({
    enter: node => {
      let decoration: Range<Decoration> | undefined;
      if (node.name === 'Table') {
        for (let parent = node.node.parent; parent !== null; parent = parent.parent) {
          if (parent.name !== 'Document') {
            return false;
          }
        }

        if (tree.length < state.doc.length && node.to >= tree.length) {
          return false;
        }

        const from = state.doc.lineAt(node.from).from;
        const to = state.doc.lineAt(node.to).to;

        let widget = new TableWidget(state.doc, from, to, renderTables, referenceContext);
        previous.between(from, to, (start, end, previousDecoration) => {
          const candidate = previousDecoration.spec.widget;
          if (start === from && end === to && candidate instanceof TableWidget && widget.eq(candidate)) {
            widget = candidate;
          }
        });

        decoration = Decoration.replace({
          block: true,
          widget,
        }).range(from, to);
      } else if (__FULL_BUILD__) {
        decoration = node.name === 'BlockMath'
          ? blockMathDecoration(node, state)
          : mermaidDecoration(node, state);
      }

      if (decoration !== undefined) {
        ranges.push(decoration);
        return false;
      }
    },
  });

  return Decoration.set(ranges, true);
}

function blockMathDecoration(node: SyntaxNodeRef, state: EditorState) {
  const source = state.sliceDoc(node.from, node.to);
  const content = source.slice(2, -2);
  if (!source.startsWith('$$') || !source.endsWith('$$') || content.trim() === '') {
    return undefined;
  }

  return Decoration.replace({
    block: true,
    widget: new BlockMathWidget(content),
  }).range(node.from, node.to);
}

function mermaidDecoration(node: SyntaxNodeRef, state: EditorState) {
  if (node.name !== 'FencedCode') {
    return undefined;
  }

  const info = node.node.getChild('CodeInfo');
  const boundary = node.node.lastChild;
  if (info === null
    || state.sliceDoc(info.from, info.to).trim() !== 'mermaid'
    || boundary?.name !== 'CodeMark') {
    return undefined;
  }

  const content = state.sliceDoc(info.to, boundary.from).trim();
  if (content === '') {
    return undefined;
  }

  return Decoration.replace({
    block: true,
    widget: new MermaidWidget(content),
  }).range(node.from, node.to);
}

function hideSelectedBlocks(decorations: DecorationSet, state: EditorState) {
  if (decorations.size === 0) {
    return decorations;
  }

  return decorations.update({
    filter: (from, to, decoration) => {
      if (selectionReveals(state, from, to)) {
        return false;
      }

      let folded = false;
      if (decoration.spec.widget instanceof TableWidget) {
        foldedRanges(state).between(from, to, () => { folded = true; });
      }

      return !folded;
    },
  });
}
