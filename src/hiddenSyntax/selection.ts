import { EditorSelection, type EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

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
      const movement = Math.max(
        Math.abs(event.clientX - startCoords.x),
        Math.abs(event.clientY - startCoords.y),
      );

      // Requires a movement of at least a few pixels to start a selection
      if (movement <= 5) {
        return EditorSelection.create([EditorSelection.cursor(startPos.pos, startPos.assoc)]);
      }

      const current = view.posAndSideAtCoords({ x: event.clientX, y: event.clientY }, false);
      if (current.pos === startPos.pos) {
        return EditorSelection.create([EditorSelection.cursor(current.pos, current.assoc)]);
      }

      return EditorSelection.create([
        EditorSelection.range(startPos.pos, current.pos, undefined, undefined, current.assoc),
      ]);
    },
    update(update) {
      if (update.docChanged) {
        startPos = { ...startPos, pos: update.changes.mapPos(startPos.pos) };
      }
    },
  };
});

export function selectionIntersects(state: EditorState, from: number, to: number) {
  return state.selection.ranges.some(range => range.empty
    ? range.from >= from && range.from <= to
    : range.from < to && range.to > from,
  );
}
