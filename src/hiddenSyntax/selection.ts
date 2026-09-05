import { syntaxTree } from '@codemirror/language';
import { EditorSelection, Prec, type EditorState, type SelectionRange } from '@codemirror/state';
import { type Command, EditorView, keymap } from '@codemirror/view';
import type { SyntaxNode } from '@lezer/common';

export const cursorLineUp = moveLineUp(false);
export const selectLineUp = moveLineUp(true);

export const correctedLineUp = Prec.high(keymap.of([
  {
    key: 'ArrowUp',
    run: cursorLineUp,
    shift: selectLineUp,
  },
]));

export const stablePointerSelection = EditorView.mouseSelectionStyle.of((view, startEvent) => {
  if (startEvent.button !== 0
    || startEvent.detail !== 1
    || startEvent.altKey
    || startEvent.ctrlKey
    || startEvent.metaKey
    || startEvent.shiftKey) {
    return null;
  }

  const startCoords = { x: startEvent.clientX, y: startEvent.clientY };
  let startPos = view.posAndSideAtCoords(startCoords, false);

  return {
    get(event) {
      if (!Number.isFinite(startPos.pos)) {
        return view.state.selection;
      }

      const movement = Math.max(
        Math.abs(event.clientX - startCoords.x),
        Math.abs(event.clientY - startCoords.y),
      );

      // Requires a movement of at least a few pixels to start a selection
      if (movement <= 5) {
        return EditorSelection.create([EditorSelection.cursor(startPos.pos, startPos.assoc)]);
      }

      const current = view.posAndSideAtCoords({ x: event.clientX, y: event.clientY }, false);
      if (!Number.isFinite(current.pos)) {
        return view.state.selection;
      }

      if (current.pos === startPos.pos) {
        return EditorSelection.create([EditorSelection.cursor(current.pos, current.assoc)]);
      }

      return EditorSelection.create([
        EditorSelection.range(startPos.pos, current.pos, undefined, undefined, current.assoc),
      ]);
    },
    update(update) {
      if (update.docChanged && Number.isFinite(startPos.pos)) {
        startPos = { ...startPos, pos: update.changes.mapPos(startPos.pos) };
      }
    },
  };
});

export function selectionReveals(state: EditorState, from: number, to: number) {
  return state.selection.ranges.some(range => range.from <= to && range.to >= from);
}

function moveLineUp(extend: boolean): Command {
  return view => {
    const selection = EditorSelection.create(view.state.selection.ranges.map(originalRange => {
      let range = originalRange;
      if (extend && range.undirectional && range.head >= range.anchor) {
        range = EditorSelection.range(range.head, range.anchor);
      }

      let moved = extend || range.empty
        ? moveToPreviousHeading(view, range)
        : EditorSelection.cursor(range.from);
      if (!extend && range.empty && moved.head === range.head) {
        moved = view.moveToLineBoundary(range, false);
      }

      return extend
        ? EditorSelection.range(range.anchor, moved.head, moved.goalColumn, moved.bidiLevel ?? undefined, moved.assoc)
        : moved;
    }), view.state.selection.mainIndex);

    if (selection.eq(view.state.selection, true)) {
      return false;
    }

    view.dispatch({ selection, scrollIntoView: true, userEvent: 'select' });
    return true;
  };
}

function moveToPreviousHeading(view: Parameters<Command>[0], range: SelectionRange) {
  const moved = view.moveVertically(range, false);
  const startLine = view.state.doc.lineAt(range.head);
  const movedLine = view.state.doc.lineAt(moved.head);
  if (startLine.number - movedLine.number <= 1) {
    return moved;
  }

  const targetLine = view.state.doc.line(startLine.number - 1);
  if (!isAtxHeading(view, targetLine.from)) {
    return moved;
  }

  const block = view.lineBlockAt(targetLine.from);
  const goal = moved.goalColumn;
  const startCoords = view.coordsAtPos(range.head, range.assoc || 1);
  const left = goal === undefined
    ? startCoords?.left
    : view.contentDOM.getBoundingClientRect().left + goal;
  if (left === undefined) {
    return moved;
  }

  const hit = view.posAndSideAtCoords({
    x: left,
    y: view.documentTop + block.top + block.height / 2,
  });

  if (hit === null || hit.pos < targetLine.from || hit.pos > targetLine.to) {
    return moved;
  }

  return EditorSelection.cursor(hit.pos, hit.assoc, undefined, goal);
}

function isAtxHeading(view: Parameters<Command>[0], pos: number) {
  for (let node: SyntaxNode | null = syntaxTree(view.state).resolve(pos, 1); node !== null; node = node.parent) {
    if (node.name.startsWith('ATXHeading')) {
      return true;
    }
  }

  return false;
}
