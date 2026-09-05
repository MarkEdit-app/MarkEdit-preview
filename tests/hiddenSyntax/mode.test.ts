// @vitest-environment happy-dom
import { editorText } from './support';
import { describe, expect, test } from 'vitest';
import { lineNumbers } from '@codemirror/view';
import { hiddenSyntaxModeExtension, setHiddenSyntaxMode } from '../../src/hiddenSyntax/mode';
import * as editor from '../support/editor';

describe('Syntax-hidden mode', () => {
  test('keeps a later disable while the extension loads', async () => {
    editor.setUp('# Heading', hiddenSyntaxModeExtension);

    const enabling = setHiddenSyntaxMode(window.editor, true);
    await setHiddenSyntaxMode(window.editor, false);
    await enabling;

    expect(window.editor.dom.classList.contains('cm-md-syntaxHiddenMode')).toBe(false);
  });

  test('toggles without changing the document or selection', async () => {
    const source = '# Heading\nBody';
    editor.setUp(source, [lineNumbers(), hiddenSyntaxModeExtension]);
    await setHiddenSyntaxMode(window.editor, true);
    window.editor.dispatch({ selection: { anchor: source.length } });
    const gutter = window.editor.dom.querySelector('.cm-lineNumbers .cm-gutterElement') as HTMLElement;
    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);

    expect(editorText()).toBe('Heading\nBody');
    expect(window.editor.dom.classList.contains('cm-md-syntaxHiddenMode')).toBe(true);
    expect(getComputedStyle(gutter).overflow).toBe('hidden');
    expect(cssRules.some(rule => rule.cssText.includes('.cm-md-syntaxHiddenMode .cm-lineNumbers .cm-gutterElement')
      && rule.cssText.includes('overflow: hidden'))).toBe(true);
    expect(cssRules.filter(rule => rule.cssText.includes('cm-md-syntaxHidden'))
      .every(rule => rule.cssText.includes('.cm-md-syntaxHiddenMode'))).toBe(true);
    await setHiddenSyntaxMode(window.editor, false);
    expect(editorText()).toBe(source);
    expect(window.editor.dom.classList.contains('cm-md-syntaxHiddenMode')).toBe(false);

    await setHiddenSyntaxMode(window.editor, true);
    expect(editorText()).toBe('Heading\nBody');
    expect(window.editor.dom.classList.contains('cm-md-syntaxHiddenMode')).toBe(true);
    expect(window.editor.state.doc.toString()).toBe(source);
    expect(window.editor.state.selection.main.anchor).toBe(source.length);
  });
});
