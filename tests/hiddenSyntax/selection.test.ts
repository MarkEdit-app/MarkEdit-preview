// @vitest-environment happy-dom
import './support';
import { describe, expect, test, vi } from 'vitest';
import { EditorSelection, EditorState, Prec } from '@codemirror/state';
import { EditorView, keymap, runScopeHandlers, type ViewUpdate } from '@codemirror/view';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { cursorLineUp, selectLineUp } from '../../src/hiddenSyntax/selection';
import * as editor from '../support/editor';

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
