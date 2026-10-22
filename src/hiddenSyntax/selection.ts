import { syntaxTree } from '@codemirror/language';
import { EditorSelection, Prec, StateEffect, StateField, type EditorState, type SelectionRange } from '@codemirror/state';
import { type Command, Direction, EditorView, keymap } from '@codemirror/view';
import type { SyntaxNode, SyntaxNodeRef } from '@lezer/common';
import { linkSyntax, referenceDestinationResolver } from './link';
import { inlineSyntax } from './inline';
import { renderedBlockDecorations } from './block';

type SyntaxRange = { from: number; to: number };
const revealSyntax = StateEffect.define<readonly SyntaxRange[]>();

export const revealedSyntax = StateField.define<readonly SyntaxRange[]>({
  create: () => [],
  update(ranges, transaction) {
    if (transaction.docChanged) {
      return [];
    }

    for (const effect of transaction.effects) {
      if (effect.is(revealSyntax)) {
        return effect.value;
      }
    }

    return transaction.newSelection.eq(transaction.startState.selection, true) ? ranges : [];
  },
});

export const cursorLineUp = moveLineUp(false);
export const selectLineUp = moveLineUp(true);
export const cursorLineEnd = moveLineEnd(false);
export const selectLineEnd = moveLineEnd(true);

export const correctedLineEnd = Prec.high(keymap.of([
  { mac: 'Cmd-ArrowRight', run: cursorLineEnd, shift: selectLineEnd },
]));

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

  if (Number.isFinite(startPos.pos)) {
    const suffix = collapsedSyntaxSuffix(view, startPos.pos);
    const edge = suffix === undefined ? null : view.coordsAtPos(suffix.from, -1);
    if (suffix !== undefined && edge !== null && startCoords.x > edge.right
      && startCoords.y >= edge.top && startCoords.y <= edge.bottom) {
      startPos = { pos: suffix.to, assoc: -1 };
    }
  }

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

export function inlineSyntaxRevealed(state: EditorState, from: number, to: number) {
  return selectionReveals(state, from, to)
    || state.field(revealedSyntax, false)?.some(range => range.from <= from && range.to >= to) === true;
}

function collapsedSyntaxSuffix(view: EditorView, pos: number) {
  if (view.textDirectionAt(pos) !== Direction.LTR) {
    return;
  }

  const resolveDestination = referenceDestinationResolver(view.state);
  let suffix: { from: number; to: number } | undefined;
  for (let node: SyntaxNode | null = syntaxTree(view.state).resolveInner(pos, -1); node !== null; node = node.parent) {
    if (node.name === 'Image') {
      return;
    }

    if (inlineSyntaxRevealed(view.state, node.from, node.to)) {
      continue;
    }

    const syntax = revealableSyntax(node, view.state, resolveDestination);
    if (syntax !== undefined && insideReplacement(view, node)) {
      return;
    }

    const trailing = syntax?.hidden.find(mark => mark.to === node.to);
    const end = suffix?.to ?? pos;
    if (trailing !== undefined && end >= trailing.from && end < node.to) {
      suffix = { from: suffix?.from ?? trailing.from, to: node.to };
    }
  }

  return suffix;
}

function moveLineEnd(extend: boolean): Command {
  return view => {
    const originalState = view.state;
    const original = originalState.selection;
    let revealed = originalState.field(revealedSyntax, false);
    if (revealed === undefined || original.ranges.length !== 1) {
      return false;
    }

    const line = originalState.doc.lineAt(original.main.head);
    const block = view.lineBlockAt(original.main.head);
    if (original.main.from < line.from || original.main.to > line.to
      || block.from !== line.from || block.to !== line.to
      || view.textDirectionAt(original.main.head) !== Direction.LTR) {
      return false;
    }

    const unchanged = () => view.state.doc === originalState.doc && view.state.selection.eq(original, true)
      && view.state.field(revealedSyntax, false) !== undefined;
    let selection = lineEndSelection(view, original, extend);
    if (!unchanged()) {
      return true;
    }

    if (revealed.length === 0) {
      if (!lineEndChangesSyntax(view, line, selection.main)) {
        return false;
      }

      revealed = [{ from: line.from, to: line.to }];
      view.dispatch({ effects: revealSyntax.of(revealed) });
      if (!unchanged()) {
        return true;
      }

      if (view.state.field(revealedSyntax) !== revealed) {
        return false;
      }

      view.coordsAtPos(original.main.head);
      if (!unchanged()) {
        return true;
      }

      selection = lineEndSelection(view, original, extend);
    }

    if (!unchanged()) {
      return true;
    }

    if (selection.eq(original, true)) {
      return false;
    }

    view.dispatch({
      selection,
      effects: revealSyntax.of(revealed),
      scrollIntoView: true,
      userEvent: 'select',
    });

    return true;
  };
}

function lineEndChangesSyntax(view: EditorView, line: SyntaxRange, selection: SelectionRange) {
  let changed = false;
  const resolveDestination = referenceDestinationResolver(view.state);

  syntaxTree(view.state).iterate({
    from: line.from,
    to: line.to,
    enter: node => {
      if (changed || node.name === 'Image') {
        return false;
      }

      if (node.from >= line.from && node.to <= line.to
        && revealableSyntax(node, view.state, resolveDestination) !== undefined
        && !insideReplacement(view, node)) {
        const selected = selection.from <= node.to && selection.to >= node.from;
        changed = selected !== selectionReveals(view.state, node.from, node.to);
      }
    },
  });

  return changed;
}

function insideReplacement(view: EditorView, node: SyntaxNodeRef) {
  let inside = false;
  view.state.field(renderedBlockDecorations, false)?.visible.between(node.from, node.to, (from, to) => {
    inside ||= from <= node.from && to >= node.to;
  });

  return inside;
}

function revealableSyntax(node: SyntaxNodeRef, state: EditorState, resolveDestination: ReturnType<typeof referenceDestinationResolver>) {
  return node.name === 'Link' || node.name === 'Autolink'
    ? linkSyntax(node, state, resolveDestination)
    : inlineSyntax(node);
}

function lineEndSelection(view: EditorView, selection: EditorSelection, extend: boolean) {
  return EditorSelection.create(selection.ranges.map(original => {
    const range = extend && original.undirectional && original.head < original.anchor
      ? EditorSelection.range(original.head, original.anchor) : original;
    let moved = view.moveToLineBoundary(range, true);
    if (moved.head === range.head && moved.head !== view.lineBlockAt(range.head).to) {
      moved = view.moveToLineBoundary(range, true, false);
    }

    return extend
      ? EditorSelection.range(range.anchor, moved.head, moved.goalColumn, moved.bidiLevel ?? undefined, moved.assoc)
      : moved;
  }), selection.mainIndex);
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
