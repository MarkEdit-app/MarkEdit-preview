// @vitest-environment happy-dom
import { hiddenTexts, editorText } from './support';
import { describe, expect, test } from 'vitest';
import { EditorSelection, EditorState } from '@codemirror/state';
import { history, redo, undo } from '@codemirror/commands';
import { syntaxHighlighting } from '@codemirror/language';
import { Decoration, EditorView } from '@codemirror/view';
import { classHighlighter } from '@lezer/highlight';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import * as editor from '../support/editor';

describe('Inline code syntax', () => {
  test('rounds the CoreEditor background tile', () => {
    const source = '`code` after';
    const end = source.lastIndexOf('`');
    const base = 'cm-md-monospace cm-md-inlineCode';
    const backgroundColor = 'rgb(12, 34, 56)';
    const coreInlineCode = EditorView.decorations.of(Decoration.set([
      Decoration.mark({ class: `${base} cm-md-inlineCodeStart` }).range(0, 1),
      Decoration.mark({ class: base }).range(1, end),
      Decoration.mark({ class: `${base} cm-md-inlineCodeEnd` }).range(end, end + 1),
    ]));

    const theme = EditorView.theme({ '.cm-md-inlineCode': { backgroundColor } });
    editor.setUp(source, [coreInlineCode, theme, hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const start = window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeStart');
    const nested = start?.querySelector('.cm-md-inlineCode');
    expect(start?.classList.contains('cm-md-inlineCode')).toBe(false);
    expect(getComputedStyle(start as Element).backgroundColor).toBe('');
    expect(getComputedStyle(nested as Element).backgroundColor).toBe(backgroundColor);
    expect(getComputedStyle(nested as Element).borderTopLeftRadius).toBe('3px');
    expect(getComputedStyle(nested as Element).paddingInlineStart).toBe('0.25em');
  });

  test('rounds a CoreEditor tile containing the boundary marker', () => {
    const source = '`code` after';
    const end = source.lastIndexOf('`');
    const base = 'cm-md-monospace cm-md-inlineCode';
    const coreInlineCode = EditorView.decorations.of(Decoration.set([
      Decoration.mark({ class: `${base} cm-md-inlineCodeStart` }).range(0, 1),
      Decoration.mark({ class: base }).range(1, end),
      Decoration.mark({ class: `${base} cm-md-inlineCodeEnd` }).range(end, end + 1),
    ]));

    editor.setUp(source, [hiddenSyntaxExtension, coreInlineCode]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const marker = window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeStart');
    const tile = marker?.closest('.cm-md-inlineCode');
    const endMarker = window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeEnd');
    const endTile = endMarker?.closest('.cm-md-inlineCode');
    expect(tile).not.toBeNull();
    expect(getComputedStyle(tile as Element).borderTopLeftRadius).toBe('3px');
    expect(getComputedStyle(tile as Element).paddingInlineStart).toBe('0.25em');
    expect(getComputedStyle(endTile as Element).paddingInlineEnd).toBe('0.25em');
  });

  test('transfers corner classes to visible content', () => {
    const source = '`code with space` after';
    const space = source.indexOf(' ');
    const visibleSpace = EditorView.decorations.of(Decoration.set([
      Decoration.mark({ class: 'cm-visibleSpace' }).range(space, space + 1),
    ]));

    editor.setUp(source, [hiddenSyntaxExtension, visibleSpace]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeStart')?.textContent).toBe('c');
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeEnd')?.textContent).toBe('e');
    expect(window.editor.dom.querySelector('.cm-visibleSpace')?.textContent).toBe(' ');
    expect(window.editor.dom.querySelector('.cm-visibleSpace.cm-md-syntaxHiddenInlineCodeStart, .cm-visibleSpace.cm-md-syntaxHiddenInlineCodeEnd')).toBeNull();
  });

  test('transfers both corners to single-character content', () => {
    const source = '`x` after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeStart')?.textContent).toBe('x');
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeEnd')?.textContent).toBe('x');
  });

  test('does not transfer corner classes when syntax is revealed', () => {
    const source = '`code` after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 2 } });

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeStart')).toBeNull();
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeEnd')).toBeNull();
  });

  test('hides both marks and reveals them when selected', () => {
    const source = 'Before `code` after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe('Before code after');
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: 10 } });
    expect(editorText()).toBe(source);
  });

  test('hides multi-backtick marks', () => {
    editor.setUp('Before ``a ` b`` after', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 22 } });

    expect(editorText()).toBe('Before a ` b after');
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeStart')?.textContent).toBe('a');
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenInlineCodeEnd')?.textContent).toBe('b');
  });

  test('keeps fenced code marks visible', () => {
    const source = '```ts\nconst value = `code`;\n```\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts()).toEqual([]);
  });
});

describe('Strong emphasis syntax', () => {
  test('hides both marks and reveals them when selected', () => {
    const source = 'Before **bold** after';
    editor.setUp(source, [syntaxHighlighting(classHighlighter), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe('Before bold after');
    expect(window.editor.contentDOM.textContent).toContain(source);
    expect(hiddenTexts()).toEqual(['**', '**']);
    expect([...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenSource')]
      .every(mark => mark.firstElementChild?.classList.contains('tok-meta'))).toBe(true);
    expect(window.editor.state.doc.toString()).toBe(source);

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    const sourceRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenSource *')) as CSSStyleRule;
    expect(sourceRule.style.getPropertyValue('font-size')).toBe('0px');
    expect(sourceRule.style.getPropertyPriority('font-size')).toBe('important');
    expect(sourceRule.style.getPropertyValue('font-variant-ligatures')).toBe('none');
    expect(sourceRule.style.getPropertyPriority('font-variant-ligatures')).toBe('important');

    const wrapperRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenSource:has(> *)')) as CSSStyleRule;
    expect(wrapperRule.style.getPropertyValue('font-size')).toBe('inherit');
    expect(wrapperRule.style.getPropertyPriority('font-size')).toBe('important');
    expect(wrapperRule.style.getPropertyValue('line-height')).toBe('inherit');
    expect(wrapperRule.style.getPropertyPriority('line-height')).toBe('important');

    window.editor.dispatch({ selection: { anchor: 10 } });
    expect(editorText()).toBe(source);
  });

  test('reveals only the selected strong node', () => {
    editor.setUp('**One** and **Two**', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 3 } });
    expect(editorText()).toBe('**One** and Two');
  });

  test('reveals the next node at a selection boundary', () => {
    editor.setUp('**One** **Two**', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 2, head: 8 } });
    expect(editorText()).toBe('**One** **Two**');
  });

  test('hides nested strong and italic marks', () => {
    editor.setUp('***bold*** after', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 16 } });
    expect(editorText()).toBe('bold after');

    window.editor.dispatch({ selection: { anchor: 5 } });
    expect(editorText()).toBe('***bold*** after');
  });

  test('reveals every node containing a selection', () => {
    const source = '**One** **Two** **Three**';
    editor.setUp(source, [EditorState.allowMultipleSelections.of(true), hiddenSyntaxExtension]);
    window.editor.dispatch({
      selection: EditorSelection.create([
        EditorSelection.cursor(source.indexOf('One') + 1),
        EditorSelection.cursor(source.indexOf('Two') + 1),
      ]),
    });

    expect(editorText()).toBe('**One** **Two** Three');
  });

  test('reveals syntax for a backward selection', () => {
    const source = 'Before **bold** after';
    const anchor = source.indexOf('after');
    const head = source.indexOf('bold');
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: EditorSelection.single(anchor, head) });

    expect(window.editor.state.selection.main.anchor).toBe(anchor);
    expect(window.editor.state.selection.main.head).toBe(head);
    expect(hiddenTexts()).toEqual([]);
  });

  test('updates decorations immediately for programmatic selections', () => {
    const source = 'MarkEdit is **open-source** Markdown editor';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(editorText()).toBe('MarkEdit is open-source Markdown editor');

    window.editor.dispatch({
      selection: { anchor: source.indexOf('open-source') },
    });

    expect(editorText()).toBe(source);
  });
});

describe('Inline syntax editing', () => {
  test('updates after delete, undo, and redo', () => {
    const source = '**bold** after';
    const closingMark = source.indexOf('**', 2);
    editor.setUp(source, [history(), hiddenSyntaxExtension]);
    window.editor.dispatch({
      changes: { from: closingMark, to: closingMark + 2 },
      selection: { anchor: source.length - 2 },
      userEvent: 'delete.forward',
    });

    expect(hiddenTexts()).toEqual([]);
    expect(undo(window.editor)).toBe(true);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(editorText()).toBe('bold after');

    expect(redo(window.editor)).toBe(true);
    window.editor.dispatch({ selection: { anchor: source.length - 2 } });
    expect(hiddenTexts()).toEqual([]);
  });

  test('recognizes complete syntax pasted at once', () => {
    const source = '**pasted** after';
    editor.setUp('', hiddenSyntaxExtension);
    window.editor.dispatch({
      changes: { from: 0, insert: source },
      selection: { anchor: source.length },
      userEvent: 'input.paste',
    });

    expect(editorText()).toBe('pasted after');
  });

  test('keeps incomplete composition visible until it becomes valid', () => {
    editor.setUp('', hiddenSyntaxExtension);
    window.editor.dispatch({
      changes: { from: 0, insert: '**bold' },
      selection: { anchor: 6 },
      userEvent: 'input.type.compose',
    });

    expect(hiddenTexts()).toEqual([]);

    const suffix = '** after';
    window.editor.dispatch({
      changes: { from: 6, insert: suffix },
      selection: { anchor: 6 + suffix.length },
      userEvent: 'input.type.compose',
    });

    expect(editorText()).toBe('bold after');
  });
});

describe('Italic syntax', () => {
  test('hides both marks and reveals them when selected', () => {
    const source = 'Before *italic* after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe('Before italic after');
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: 10 } });
    expect(editorText()).toBe(source);
  });
});

describe('Strikethrough syntax', () => {
  test('hides both marks and reveals them when selected', () => {
    const source = 'Before ~~deleted~~ after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe('Before deleted after');
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: 11 } });
    expect(editorText()).toBe(source);
  });
});
