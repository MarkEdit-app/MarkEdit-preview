// @vitest-environment happy-dom
import { editorText } from './support';
import { describe, expect, test } from 'vitest';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import * as editor from '../support/editor';

describe('ATX heading syntax', () => {
  test('keeps syntax visible while typing and hides it after leaving', () => {
    editor.setUp('', hiddenSyntaxExtension);

    window.editor.dispatch({ changes: { from: 0, insert: '#' }, selection: { anchor: 1 } });
    expect(editorText()).toBe('#');

    window.editor.dispatch({ changes: { from: 1, insert: ' ' }, selection: { anchor: 2 } });
    expect(editorText()).toBe('# ');

    window.editor.dispatch({ changes: { from: 2, insert: 'H' }, selection: { anchor: 3 } });
    expect(editorText()).toBe('# H');

    window.editor.dispatch({ changes: { from: 3, insert: '\nBody' }, selection: { anchor: 8 } });
    expect(editorText()).toBe('H\nBody');
  });

  test('reveals heading syntax when the caret enters it', () => {
    const source = '## Heading\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(editorText()).toBe('Heading\nBody');

    window.editor.dispatch({ selection: { anchor: 3 } });
    expect(editorText()).toBe(source);

    window.editor.dispatch({ selection: { anchor: 7 } });
    expect(editorText()).toBe(source);

    window.editor.dispatch({ selection: { anchor: 10 } });
    expect(editorText()).toBe(source);
  });

  test('reveals heading syntax when a selection overlaps it', () => {
    editor.setUp('## Heading', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 3, head: 10 } });
    expect(editorText()).toBe('## Heading');
  });

  test('reveals the next heading at a selection boundary', () => {
    editor.setUp('# One\n# Two', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 2, head: 6 } });
    expect(editorText()).toBe('# One\n# Two');
  });

  test('hides all spaces after the opening marker', () => {
    const source = '#       Heading\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(editorText()).toBe('Heading\nBody');

    window.editor.dispatch({ selection: { anchor: 5 } });
    expect(editorText()).toBe(source);
  });

  test('supports every level and leaves closing markers visible', () => {
    const headings = Array.from({ length: 6 }, (_, index) => `${'#'.repeat(index + 1)} Level ${index + 1}`);
    const source = [...headings, '# Closing #', 'Body'].join('\n');
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe([
      'Level 1',
      'Level 2',
      'Level 3',
      'Level 4',
      'Level 5',
      'Level 6',
      'Closing #',
      'Body',
    ].join('\n'));
  });
});

describe('Setext heading syntax', () => {
  test('collapses the underline line and preserves its source', () => {
    const source = 'Heading\n=======\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const underline = [...window.editor.dom.querySelectorAll('.cm-line')]
      .find(line => line.textContent === '=======');
    expect(underline?.classList.contains('cm-md-syntaxHiddenSetextUnderline')).toBe(true);
    expect(window.editor.state.doc.toString()).toBe(source);

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    expect(cssRules.some(rule => rule.cssText.includes('.cm-lineNumbers .cm-gutterElement') && rule.cssText.includes('overflow: hidden'))).toBe(true);

    window.editor.dispatch({ selection: { anchor: 2 } });
    expect(underline?.classList.contains('cm-md-syntaxHiddenSetextUnderline')).toBe(false);
  });

  test('reveals at caret and selection boundaries', () => {
    const source = 'Heading\n=======\nBody';
    const boundary = source.indexOf('\nBody');
    editor.setUp(source, hiddenSyntaxExtension);
    const underline = () => [...window.editor.dom.querySelectorAll('.cm-line')]
      .find(line => line.textContent === '=======');

    window.editor.dispatch({ selection: { anchor: boundary } });
    expect(underline()?.classList.contains('cm-md-syntaxHiddenSetextUnderline')).toBe(false);

    window.editor.dispatch({ selection: { anchor: boundary, head: source.length } });
    expect(underline()?.classList.contains('cm-md-syntaxHiddenSetextUnderline')).toBe(false);
  });

  test('suppresses pseudo-elements inside the collapsed underline line', () => {
    const source = 'Heading\n=======\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    expect(cssRules.some(rule => rule.cssText.includes('.cm-md-syntaxHiddenSetextUnderline *::before') && rule.cssText.includes('display: none'))).toBe(true);
  });
});
