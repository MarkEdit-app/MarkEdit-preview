import { syntaxTree } from '@codemirror/language';
import { type EditorState, type Range, StateField } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView } from '@codemirror/view';
import type { SyntaxNodeRef } from '@lezer/common';
import { BlockMathWidget } from './components/math';
import { MermaidWidget } from './components/mermaid';
import { selectionIntersects } from './selection';

interface BlockDecorationState {
  all: DecorationSet;
  visible: DecorationSet;
}

export const renderedBlockDecorations = StateField.define<BlockDecorationState>({
  create: state => createBlockDecorationState(state),
  update(value, transaction) {
    if (transaction.docChanged) {
      return createBlockDecorationState(transaction.state);
    }

    if (transaction.selection !== undefined) {
      return {
        all: value.all,
        visible: hideSelectedBlocks(value.all, transaction.state),
      };
    }

    return value;
  },
  provide: field => EditorView.decorations.from(field, value => value.visible),
});

function createBlockDecorationState(state: EditorState): BlockDecorationState {
  const all = createBlockDecorations(state);
  return { all, visible: hideSelectedBlocks(all, state) };
}

function createBlockDecorations(state: EditorState) {
  const ranges: Range<Decoration>[] = [];
  syntaxTree(state).iterate({
    enter: node => {
      const decoration = node.name === 'BlockMath'
        ? blockMathDecoration(node, state)
        : mermaidDecoration(node, state);

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
    filter: (from, to) => !selectionIntersects(state, from, to),
  });
}
