import { syntaxTree } from '@codemirror/language';
import { type EditorState, type Range, StateField } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView } from '@codemirror/view';
import { BlockMathWidget } from './components/math';
import { selectionIntersects } from './selection';

interface BlockMathDecorationState {
  all: DecorationSet;
  visible: DecorationSet;
}

export const blockMathDecorations = StateField.define<BlockMathDecorationState>({
  create: state => createBlockMathDecorationState(state),
  update(value, transaction) {
    if (transaction.docChanged) {
      return createBlockMathDecorationState(transaction.state);
    }

    if (transaction.selection !== undefined) {
      return { all: value.all, visible: hideSelectedMath(value.all, transaction.state) };
    }

    return value;
  },
  provide: field => EditorView.decorations.from(field, value => value.visible),
});

function createBlockMathDecorationState(state: EditorState): BlockMathDecorationState {
  const all = createBlockMathDecorations(state);
  return { all, visible: hideSelectedMath(all, state) };
}

function createBlockMathDecorations(state: EditorState) {
  const ranges: Range<Decoration>[] = [];
  syntaxTree(state).iterate({
    enter: node => {
      if (node.name !== 'BlockMath') {
        return;
      }

      const source = state.sliceDoc(node.from, node.to);
      const content = source.slice(2, -2);
      if (source.startsWith('$$') && source.endsWith('$$') && content.trim() !== '') {
        ranges.push(Decoration.replace({
          block: true,
          widget: new BlockMathWidget(content),
        }).range(node.from, node.to));

        return false;
      }
    },
  });

  return Decoration.set(ranges, true);
}

function hideSelectedMath(decorations: DecorationSet, state: EditorState) {
  if (decorations.size === 0) {
    return decorations;
  }

  return decorations.update({
    filter: (from, to) => !selectionIntersects(state, from, to),
  });
}
