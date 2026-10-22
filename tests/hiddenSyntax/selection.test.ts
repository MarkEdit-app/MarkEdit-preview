// @vitest-environment happy-dom
import './support';
import { describe, expect, test, vi } from 'vitest';
import { cursorCharLeft, cursorLineBoundaryLeft } from '@codemirror/commands';
import { Compartment, EditorSelection, EditorState, Prec } from '@codemirror/state';
import { EditorView, keymap, runScopeHandlers, type ViewUpdate } from '@codemirror/view';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { cursorLineUp, selectLineUp, cursorLineEnd, selectLineEnd, revealedSyntax } from '../../src/hiddenSyntax/selection';
import * as editor from '../support/editor';

const inlineSyntaxCases = [
  '[text](https://example.com/long/path)', '<https://example.com/text>',
  '*text*', '**text**', '~~text~~', '`text`', '***text***',
  '**[text](https://example.com/)**',
];

describe('Syntax-aware line-end navigation', () => {
  test.each(['line start', 'previous character'])('releases retained syntax on moving to %s', movement => {
    const source = 'text [Known Issues](https://support.microsoft.com/en-us/support/known-issues/fixes-or-workarounds-for-recent-issues-in-outlook-for-mac)';
    editor.setUp(source, hiddenSyntaxExtension);
    const view = window.editor;
    const target = movement === 'line start' ? source.indexOf('/support/') : source.indexOf('[');
    vi.spyOn(view, 'coordsAtPos').mockReturnValue(null);
    vi.spyOn(view, 'moveToLineBoundary')
      .mockReturnValueOnce(EditorSelection.cursor(source.indexOf(']')))
      .mockReturnValueOnce(EditorSelection.cursor(target))
      .mockReturnValue(EditorSelection.cursor(0));

    expect(cursorLineEnd(view)).toBe(true);
    expect(view.state.field(revealedSyntax)).toHaveLength(1);

    vi.spyOn(view, 'moveByChar').mockReturnValue(EditorSelection.cursor(4));
    expect((movement === 'line start' ? cursorLineBoundaryLeft : cursorCharLeft)(view)).toBe(true);
    expect(view.state.selection.main.head).toBe(movement === 'line start' ? 0 : 4);
    expect(view.state.field(revealedSyntax)).toHaveLength(0);
    expect(view.dom.querySelector('.cm-md-syntaxHiddenSource')).not.toBeNull();
  });

  test.each(['select-all', 'reversed select-all', 'multiple carets'])('leaves %s to the standard keymap', kind => {
    const source = '**text** tail\n\n'.repeat(500) + 'End';
    editor.setUp(source, [hiddenSyntaxExtension, EditorState.allowMultipleSelections.of(true)]);
    const view = window.editor;
    view.dispatch({ selection: kind === 'multiple carets'
      ? EditorSelection.create([EditorSelection.cursor(0), EditorSelection.cursor(source.length)])
      : EditorSelection.single(kind === 'select-all' ? 0 : source.length, kind === 'select-all' ? source.length : 0) });

    const selection = view.state.selection;
    const boundary = vi.spyOn(view, 'moveToLineBoundary');

    expect(cursorLineEnd(view)).toBe(false);
    expect(view.state.selection).toBe(selection);
    expect(view.state.field(revealedSyntax)).toHaveLength(0);
    expect(boundary).not.toHaveBeenCalled();
  });

  test('falls back when a transaction filter rejects the reveal', () => {
    editor.setUp('Before **text**', [
      hiddenSyntaxExtension,
      EditorState.transactionFilter.of(transaction => transaction.effects.length > 0 ? [] : transaction),
    ]);

    const view = window.editor;
    view.dispatch({ selection: { anchor: 1 } });
    vi.spyOn(view, 'moveToLineBoundary').mockReturnValue(EditorSelection.cursor(13));
    expect(cursorLineEnd(view)).toBe(false);
    expect(view.state.selection.main.head).toBe(1);
  });

  const cases = inlineSyntaxCases.flatMap(syntax => [false, true].map(extend => ({ syntax, extend })));
  test.each(cases)('remeasures $syntax from the original caret (extend=$extend)', ({ syntax, extend }) => {
    const source = `Before ${syntax}`;
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: EditorSelection.range(1, 4) });

    const original = window.editor.state.selection;
    const expandedEnd = source.indexOf('text') + 2;
    const layout = vi.spyOn(window.editor, 'coordsAtPos').mockReturnValue(null);
    const boundary = vi.spyOn(window.editor, 'moveToLineBoundary')
      .mockReturnValueOnce(EditorSelection.cursor(source.indexOf('text') + 4, -1))
      .mockImplementation(() => {
        expect(layout).toHaveBeenCalledWith(original.main.head);
        expect(window.editor.state.selection).toBe(original);
        expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenSource')).toBeNull();
        return EditorSelection.cursor(expandedEnd, -1);
      });

    expect((extend ? selectLineEnd : cursorLineEnd)(window.editor)).toBe(true);
    expect(boundary).toHaveBeenNthCalledWith(2, original.main, true);
    expect(window.editor.state.selection.main).toEqual(extend
      ? EditorSelection.range(1, expandedEnd, undefined, undefined, -1)
      : EditorSelection.cursor(expandedEnd, -1));
  });

  test.each([false, true])('retains revealed syntax through styling updates (initially expanded=%s)', expanded => {
    const source = 'Before **text** after\nNext';
    const styling = new Compartment();
    editor.setUp(source, [hiddenSyntaxExtension, styling.of([]), EditorView.updateListener.of(update => {
      if (update.startState.selection.main.empty !== update.state.selection.main.empty) {
        update.view.dispatch({ effects: styling.reconfigure([]) });
        update.view.dispatch({ selection: update.view.state.selection, userEvent: 'select' });
      }
    })]);

    if (expanded) {
      window.editor.dispatch({ selection: EditorSelection.range(source.indexOf('text'), source.indexOf('text') + 1) });
    }

    const target = expanded ? source.indexOf('\n') : 6;
    vi.spyOn(window.editor, 'coordsAtPos').mockReturnValue(null);
    vi.spyOn(window.editor, 'moveToLineBoundary')
      .mockReturnValueOnce(EditorSelection.cursor(expanded ? target : source.indexOf('text') + 4, -1))
      .mockReturnValue(EditorSelection.cursor(target, -1));
    expect(cursorLineEnd(window.editor)).toBe(true);
    expect(window.editor.state.selection.main.head).toBe(target);
    window.editor.dispatch({ effects: styling.reconfigure([]) });
    window.editor.dispatch({ selection: window.editor.state.selection, userEvent: 'select' });
    expect(window.editor.state.field(revealedSyntax)).toHaveLength(1);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenSource')).toBeNull();

    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(window.editor.state.field(revealedSyntax)).toHaveLength(0);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenSource')).not.toBeNull();
  });

  test.each(['typing', 'navigation'])('finishes before immediate %s', action => {
    const source = 'Before [text](https://example.com/long/path) after';
    editor.setUp(source, hiddenSyntaxExtension);

    const target = source.indexOf('/long');
    vi.spyOn(window.editor, 'coordsAtPos').mockReturnValue(null);
    vi.spyOn(window.editor, 'moveToLineBoundary')
      .mockReturnValueOnce(EditorSelection.cursor(source.indexOf(']'), -1))
      .mockReturnValueOnce(EditorSelection.cursor(target, -1))
      .mockReturnValue(EditorSelection.cursor(source.length, -1));

    expect(cursorLineEnd(window.editor)).toBe(true);
    expect(window.editor.state.selection.main.head).toBe(target);
    if (action === 'typing') {
      window.editor.dispatch(window.editor.state.replaceSelection('!'));
      expect(window.editor.state.doc.toString()).toBe(source.slice(0, target) + '!' + source.slice(target));
      expect(window.editor.state.selection.main.head).toBe(target + 1);
      expect(window.editor.state.field(revealedSyntax)).toHaveLength(0);
    } else {
      expect(cursorLineEnd(window.editor)).toBe(true);
      expect(window.editor.state.selection.main.head).toBe(source.length);
      expect(window.editor.state.field(revealedSyntax)).toHaveLength(1);
      expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenSource')).toBeNull();
    }
  });

  test.each([false, true])('does not dispatch at a retained line boundary (extend: %s)', extend => {
    const source = 'Before **text**';
    editor.setUp(source, hiddenSyntaxExtension);
    vi.spyOn(window.editor, 'coordsAtPos').mockReturnValue(null);
    vi.spyOn(window.editor, 'moveToLineBoundary')
      .mockReturnValueOnce(EditorSelection.cursor(source.indexOf('text') + 1, -1))
      .mockReturnValue(EditorSelection.cursor(source.length, -1));

    const command = extend ? selectLineEnd : cursorLineEnd;
    expect(command(window.editor)).toBe(true);
    expect(window.editor.state.field(revealedSyntax)).toHaveLength(1);

    const state = window.editor.state;
    const dispatch = vi.spyOn(window.editor, 'dispatch');
    expect(command(window.editor)).toBe(false);
    expect(dispatch).not.toHaveBeenCalled();
    expect(window.editor.state).toBe(state);
  });

  test('reveals mixed inline syntax in one measurement pass', () => {
    const source = 'Before **one** [two](https://two.example/)';
    editor.setUp(source, hiddenSyntaxExtension);
    vi.spyOn(window.editor, 'coordsAtPos').mockReturnValue(null);

    const boundary = vi.spyOn(window.editor, 'moveToLineBoundary')
      .mockReturnValueOnce(EditorSelection.cursor(source.lastIndexOf(']'), -1))
      .mockReturnValue(EditorSelection.cursor(source.indexOf('one') + 2, -1));

    expect(cursorLineEnd(window.editor)).toBe(true);
    expect(boundary).toHaveBeenCalledTimes(2);
    expect(window.editor.state.field(revealedSyntax)).toHaveLength(1);
    expect(window.editor.state.selection.main.head).toBe(source.indexOf('one') + 2);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenSource')).toBeNull();
  });

  test.each(['plain text', 'expanded link'])('leaves %s to the standard keymap', kind => {
    const source = kind === 'plain text' ? 'Ordinary text' : '[link](https://example.com/)';
    editor.setUp(source, hiddenSyntaxExtension);
    vi.spyOn(window.editor, 'moveToLineBoundary').mockReturnValue(EditorSelection.cursor(source.length, -1));
    const selection = window.editor.state.selection;
    expect(cursorLineEnd(window.editor)).toBe(false);
    expect(window.editor.state.selection).toBe(selection);
  });
});

describe('Vertical motion', () => {
  test('corrects Arrow Up when CodeMirror skips an ATX heading', () => {
    const source = '\n## Heading\n';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    vi.spyOn(window.editor, 'moveVertically').mockReturnValue(EditorSelection.cursor(0, 0, undefined, 24));

    const hitTest = vi.spyOn(window.editor, 'posAndSideAtCoords').mockReturnValue({ pos: 4, assoc: 1 });
    expect(cursorLineUp(window.editor)).toBe(true);
    expect(window.editor.state.selection.main).toEqual(EditorSelection.cursor(4, 1, undefined, 24));
    expect(hitTest).toHaveBeenCalledOnce();
  });

  test('keeps CodeMirror movement when the skipped line is not a heading', () => {
    const source = '\nOrdinary\n';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    vi.spyOn(window.editor, 'moveVertically').mockReturnValue(EditorSelection.cursor(0, 0, undefined, 24));

    const hitTest = vi.spyOn(window.editor, 'posAndSideAtCoords');
    expect(cursorLineUp(window.editor)).toBe(true);
    expect(window.editor.state.selection.main.head).toBe(0);
    expect(hitTest).not.toHaveBeenCalled();
  });

  test('keeps CodeMirror movement when it reaches the previous line', () => {
    const source = '\n## Heading\n';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    vi.spyOn(window.editor, 'moveVertically').mockReturnValue(EditorSelection.cursor(4, 1, undefined, 24));

    const hitTest = vi.spyOn(window.editor, 'posAndSideAtCoords');
    expect(cursorLineUp(window.editor)).toBe(true);
    expect(window.editor.state.selection.main).toEqual(EditorSelection.cursor(4, 1, undefined, 24));
    expect(hitTest).not.toHaveBeenCalled();
  });

  test('extends Shift-ArrowUp to the corrected heading position', () => {
    const source = '\n## Heading\n';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    vi.spyOn(window.editor, 'moveVertically').mockReturnValue(EditorSelection.cursor(0, 0, undefined, 24));
    vi.spyOn(window.editor, 'posAndSideAtCoords').mockReturnValue({ pos: 4, assoc: 1 });

    expect(selectLineUp(window.editor)).toBe(true);
    expect(window.editor.state.selection.main).toEqual(EditorSelection.range(source.length, 4, 24, undefined, 1));
  });

  test('extends an existing selection from its active head', () => {
    const source = 'First\nSecond\nThird';
    editor.setUp(source, hiddenSyntaxExtension);
    const range = EditorSelection.range(source.length, 10);
    window.editor.dispatch({ selection: EditorSelection.create([range]) });
    const move = vi.spyOn(window.editor, 'moveVertically').mockReturnValue(EditorSelection.cursor(4));

    expect(selectLineUp(window.editor)).toBe(true);
    expect(move).toHaveBeenCalledWith(range, false);
    expect(window.editor.state.selection.main).toEqual(EditorSelection.range(source.length, 4));
  });

  test('preserves the anchor of a forward selection', () => {
    const source = 'First\nSecond\nThird';
    editor.setUp(source, hiddenSyntaxExtension);
    const range = EditorSelection.range(1, source.length);
    window.editor.dispatch({ selection: range });
    const move = vi.spyOn(window.editor, 'moveVertically').mockReturnValue(EditorSelection.cursor(0));

    expect(selectLineUp(window.editor)).toBe(true);
    expect(move).toHaveBeenCalledWith(range, false);
    expect(window.editor.state.selection.main).toEqual(EditorSelection.range(1, 0));
  });

  test('falls back to the line boundary for a stationary cursor while another moves', () => {
    editor.setUp('First\nSecond', [hiddenSyntaxExtension, EditorState.allowMultipleSelections.of(true)]);
    const stationary = EditorSelection.cursor(3);
    window.editor.dispatch({
      selection: EditorSelection.create([stationary, EditorSelection.cursor(9)], 1),
    });

    vi.spyOn(window.editor, 'moveVertically').mockImplementation(range =>
      EditorSelection.cursor(range.head === 3 ? 3 : 2, 0, undefined, 24));

    const boundary = vi.spyOn(window.editor, 'moveToLineBoundary').mockReturnValue(EditorSelection.cursor(0));
    expect(cursorLineUp(window.editor)).toBe(true);
    expect(boundary).toHaveBeenCalledExactlyOnceWith(stationary, false);
    expect(window.editor.state.selection).toEqual(EditorSelection.create([
      EditorSelection.cursor(0),
      EditorSelection.cursor(2, 0, undefined, 24),
    ], 1));
  });

  test('does not fall back to the line boundary for Shift-ArrowUp', () => {
    editor.setUp('First', hiddenSyntaxExtension);
    const range = EditorSelection.range(1, 3);
    window.editor.dispatch({ selection: range });
    vi.spyOn(window.editor, 'moveVertically').mockReturnValue(EditorSelection.cursor(3));
    const boundary = vi.spyOn(window.editor, 'moveToLineBoundary');

    expect(selectLineUp(window.editor)).toBe(false);
    expect(boundary).not.toHaveBeenCalled();
    expect(window.editor.state.selection.main).toEqual(range);
  });

  test('allows highest-priority Arrow Up bindings to take precedence', () => {
    const source = 'First\nSecond';
    const override = vi.fn(() => true);
    editor.setUp(source, [
      hiddenSyntaxExtension,
      Prec.highest(keymap.of([{ key: 'ArrowUp', run: override }])),
    ]);

    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(runScopeHandlers(window.editor, new KeyboardEvent('keydown', { key: 'ArrowUp' }), 'editor')).toBe(true);
    expect(override).toHaveBeenCalledOnce();
    expect(window.editor.state.selection.main.head).toBe(source.length);
  });
});

describe('Pointer selection', () => {
  test.each(inlineSyntaxCases)('places clicks beyond %s after its source', syntax => {
    const source = `Before ${syntax} after\nBody`;
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    vi.spyOn(window.editor, 'posAndSideAtCoords').mockReturnValue({ pos: source.indexOf('text') + 4, assoc: -1 });
    vi.spyOn(window.editor, 'coordsAtPos').mockReturnValue({ left: 100, right: 100, top: 0, bottom: 20 });

    const start = new MouseEvent('mousedown', { button: 0, detail: 1, clientX: 120, clientY: 10 });
    const style = window.editor.state.facet(EditorView.mouseSelectionStyle)[0](window.editor, start);
    expect(style?.get(start, false, false).main).toEqual(EditorSelection.cursor(source.indexOf(' after'), -1));
  });

  test.each([
    { name: 'outside the label', offset: 0, x: 120, y: 10, expanded: false, correct: true },
    { name: 'inside the hidden suffix', offset: 2, x: 120, y: 10, expanded: false, correct: true },
    { name: 'inside the label', offset: -1, x: 90, y: 10, expanded: false, correct: false },
    { name: 'at the label edge', offset: 0, x: 100, y: 10, expanded: false, correct: false },
    { name: 'on another visual line', offset: 0, x: 120, y: 30, expanded: false, correct: false },
    { name: 'in an expanded link', offset: 0, x: 120, y: 10, expanded: true, correct: false },
  ])('handles a click $name', ({ offset, x, y, expanded, correct }) => {
    const source = 'Before [link](https://example.com/) after\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: expanded ? source.indexOf('link') : source.length } });

    const pos = source.indexOf(']') + offset;
    vi.spyOn(window.editor, 'posAndSideAtCoords').mockReturnValue({ pos, assoc: -1 });
    vi.spyOn(window.editor, 'coordsAtPos').mockReturnValue({ left: 100, right: 100, top: 0, bottom: 20 });

    const start = new MouseEvent('mousedown', { button: 0, detail: 1, clientX: x, clientY: y });
    const style = window.editor.state.facet(EditorView.mouseSelectionStyle)[0](window.editor, start);

    expect(style?.get(start, false, false).main).toEqual(EditorSelection.cursor(
      correct ? source.indexOf(' after') : pos, -1,
    ));
  });

  test('keeps click jitter collapsed at its original position', () => {
    const source = '# Hello\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    const coords = vi.spyOn(window.editor, 'posAndSideAtCoords')
      .mockReturnValueOnce({ pos: 4, assoc: 1 })
      .mockReturnValue({ pos: 2, assoc: 1 });

    const start = new MouseEvent('mousedown', {
      bubbles: true, button: 0, buttons: 1, detail: 1, clientX: 40, clientY: 10,
    });

    const end = new MouseEvent('mouseup', {
      bubbles: true, button: 0, detail: 1, clientX: 40, clientY: 10,
    });

    window.editor.contentDOM.querySelector('.cm-line')?.dispatchEvent(start);
    document.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true, buttons: 1, clientX: 41, clientY: 10,
    }));

    document.dispatchEvent(end);
    expect(window.editor.state.selection.main).toEqual(EditorSelection.cursor(4, 1));
    expect(coords).toHaveBeenCalledTimes(1);
  });

  test('creates a range after actual pointer movement', () => {
    const source = '# Hello\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    vi.spyOn(window.editor, 'posAndSideAtCoords')
      .mockReturnValueOnce({ pos: 4, assoc: 1 })
      .mockReturnValue({ pos: 7, assoc: -1 });

    const start = new MouseEvent('mousedown', { button: 0, detail: 1, clientX: 40, clientY: 10 });
    const move = new MouseEvent('mousemove', { buttons: 1, clientX: 46, clientY: 10 });
    const style = window.editor.state.facet(EditorView.mouseSelectionStyle)[0](window.editor, start);
    expect(style?.get(move, false, false).main).toEqual(EditorSelection.range(4, 7, undefined, undefined, -1));
  });

  test('keeps the current selection for an invalid pointer position', () => {
    const source = '# Hello\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    vi.spyOn(window.editor, 'posAndSideAtCoords')
      .mockReturnValueOnce({ pos: 4, assoc: 1 })
      .mockReturnValue({ pos: Number.NaN, assoc: -1 });

    const start = new MouseEvent('mousedown', { button: 0, detail: 1, clientX: 40, clientY: 10 });
    const move = new MouseEvent('mousemove', { buttons: 1, clientX: 46, clientY: 10 });
    const style = window.editor.state.facet(EditorView.mouseSelectionStyle)[0](window.editor, start);
    expect(style?.get(move, false, false)).toBe(window.editor.state.selection);
  });

  test('keeps the current selection for an invalid initial pointer position', () => {
    const source = '# Hello\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    vi.spyOn(window.editor, 'posAndSideAtCoords').mockReturnValue({ pos: Number.NaN, assoc: 1 });

    const start = new MouseEvent('mousedown', { button: 0, detail: 1, clientX: 40, clientY: 10 });
    const move = new MouseEvent('mousemove', { buttons: 1, clientX: 46, clientY: 10 });
    const style = window.editor.state.facet(EditorView.mouseSelectionStyle)[0](window.editor, start);
    const mapPos = vi.fn();
    style?.update?.({ docChanged: true, changes: { mapPos } } as unknown as ViewUpdate);

    expect(mapPos).not.toHaveBeenCalled();
    expect(style?.get(move, false, false)).toBe(window.editor.state.selection);
  });

  test('leaves modified and multi-click gestures to other selection styles', () => {
    editor.setUp('# Hello', hiddenSyntaxExtension);
    const makeStyle = window.editor.state.facet(EditorView.mouseSelectionStyle)[0];

    const events = [
      new MouseEvent('mousedown', { button: 1, detail: 1 }),
      new MouseEvent('mousedown', { button: 0, detail: 2 }),
      new MouseEvent('mousedown', { button: 0, detail: 1, altKey: true }),
      new MouseEvent('mousedown', { button: 0, detail: 1, ctrlKey: true }),
      new MouseEvent('mousedown', { button: 0, detail: 1, metaKey: true }),
      new MouseEvent('mousedown', { button: 0, detail: 1, shiftKey: true }),
    ];

    expect(events.every(event => makeStyle(window.editor, event) === null)).toBe(true);
  });
});
