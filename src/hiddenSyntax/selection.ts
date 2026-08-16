import type { EditorState } from '@codemirror/state';

export function selectionIntersects(state: EditorState, from: number, to: number) {
  return state.selection.ranges.some(range => range.empty
    ? range.from >= from && range.from <= to
    : range.from < to && range.to > from,
  );
}
