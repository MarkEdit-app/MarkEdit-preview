// @vitest-environment happy-dom
import './support';
import { expect, test, vi } from 'vitest';
import * as language from '@codemirror/language';
import { followFootnote } from '../../src/hiddenSyntax/navigation';
import * as editor from '../support/editor';

const beep = vi.hoisted(() => vi.fn());
vi.mock('markedit-api', () => ({ MarkEdit: { playSystemBeep: beep } }));
vi.mock('@codemirror/language', async importOriginal => ({
  ...await importOriginal<typeof language>(),
}));

test.each(['definition', 'reference'] as const)('finds a %s with one parse attempt', async direction => {
  editor.setUp('[^note]\n\n[^note]: Note.\n\nAfter');
  window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });
  const state = window.editor.state;
  beep.mockClear();

  const parse = vi.spyOn(language, 'ensureSyntaxTree');
  expect(await followFootnote(window.editor, '^note', direction)).toBe(true);
  expect(parse).toHaveBeenCalledTimes(1);
  expect(parse).toHaveBeenCalledWith(state, state.doc.length, 5000);
  expect(window.editor.state.selection.main.from).toBe(direction === 'definition' ? 9 : 0);
  expect(window.editor.state.selection.main.to).toBe(direction === 'definition' ? 16 : 7);
  expect(beep).not.toHaveBeenCalled();
});

test.each(['definition', 'reference'] as const)('silently leaves selection unchanged when parsing a %s times out', async direction => {
  editor.setUp('[^note]\n\n[^note]: Note.\n\nAfter');
  const state = window.editor.state;
  const selection = window.editor.state.selection;
  beep.mockClear();

  const parse = vi.spyOn(language, 'ensureSyntaxTree').mockReturnValue(null);
  expect(await followFootnote(window.editor, '^note', direction)).toBe(false);
  expect(parse).toHaveBeenCalledTimes(1);
  expect(parse).toHaveBeenCalledWith(state, state.doc.length, 5000);
  expect(window.editor.state.selection).toEqual(selection);
  expect(beep).not.toHaveBeenCalled();
});

test.each(['definition', 'reference'] as const)('beeps when a completed parse has no matching %s', async direction => {
  editor.setUp(direction === 'definition' ? '[^missing]\n\nAfter' : '[^missing]: Note.\n\nAfter');
  const selection = window.editor.state.selection;
  beep.mockClear();

  const parse = vi.spyOn(language, 'ensureSyntaxTree');
  expect(await followFootnote(window.editor, '^missing', direction)).toBe(false);
  expect(parse).toHaveBeenCalledTimes(1);
  expect(beep).toHaveBeenCalledTimes(1);
  expect(window.editor.state.selection).toEqual(selection);
});
