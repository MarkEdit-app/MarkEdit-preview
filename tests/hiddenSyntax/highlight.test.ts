// @vitest-environment happy-dom
import { editorText, hiddenTexts } from './support';
import { describe, expect, test } from 'vitest';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { syntaxTree } from '@codemirror/language';
import type { Range } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin } from '@codemirror/view';
import type { MarkdownConfig } from '@lezer/markdown';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { hiddenSyntaxModeExtension, setHiddenSyntaxMode } from '../../src/hiddenSyntax/mode';
import * as editor from '../support/editor';

// Match MarkEdit-highlight's parser
const highlightDelimiter = { resolve: 'TextHighlight', mark: 'TextHighlightMark' };
const highlightConfig: MarkdownConfig = {
  defineNodes: ['TextHighlight', 'TextHighlightMark'],
  parseInline: [{
    name: 'TextHighlight',
    parse(ctx, next, pos) {
      return next === 61 && ctx.char(pos + 1) === 61
        ? ctx.addDelimiter(highlightDelimiter, pos, pos + 2, true, true)
        : -1;
    },
    after: 'Emphasis',
  }],
};

const highlightLanguage = markdown({ base: markdownLanguage, extensions: highlightConfig });
const highlightExtension = ViewPlugin.fromClass(class {}, {
  provide: () => EditorView.decorations.of(view => {
    const ranges: Range<Decoration>[] = [];
    for (const { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        from, to,
        enter(node) {
          if (node.name === 'TextHighlight') {
            ranges.push(Decoration.mark({ class: 'cm-md-textHighlight' }).range(node.from, node.to));
          }
        },
      });
    }

    return Decoration.set(ranges, true);
  }),
});

describe('Text Highlight extension syntax', () => {
  test('hides delimiters outside the selection and reveals them while editing', () => {
    const source = '==highlighted text==\n\nOther paragraph';
    editor.setUp(source, [highlightLanguage, highlightExtension, hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(hiddenTexts()).toEqual(['==', '==']);
    expect(editorText()).toBe('highlighted text\n\nOther paragraph');
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: 5 } });
    expect(hiddenTexts()).toEqual([]);
    expect(editorText()).toBe(source);

    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts()).toEqual(['==', '==']);
  });

  test('reveals only the selected highlight', () => {
    editor.setUp('==one== and ==two==', [highlightLanguage, hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: 3 } });
    expect(editorText()).toBe('==one== and two');
  });

  test.each([
    ['==**bold** and *italic*==', 'bold and italic'],
    ['**==highlight==**', 'highlight'],
    ['==outer ==inner== text==', 'outer inner text'],
  ])('preserves nested content in %s', (source, visible) => {
    editor.setUp(`${source}\n\nAfter`, [highlightLanguage, highlightExtension, hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });
    expect(editorText()).toBe(`${visible}\n\nAfter`);
    expect(hiddenTexts().every(text => ['==', '**', '*'].includes(text ?? ''))).toBe(true);
  });

  test('does not interpret highlights without the external parser', () => {
    editor.setUp('==plain text== after', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });
    expect(hiddenTexts()).toEqual([]);
    expect(editorText()).toBe('==plain text== after');
  });

  test.each([
    ['==unclosed', '==unclosed'],
    ['\\=\\=escaped\\=\\=', '\\=\\=escaped\\=\\='],
    ['`==inline code==`', '==inline code=='],
    ['```\n==fenced code==\n```', '==fenced code=='],
  ])(
    'does not hide literal equals in %s',
    (source, visible) => {
      editor.setUp(`${source}\n\nAfter`, [highlightLanguage, hiddenSyntaxExtension]);
      window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });
      expect(hiddenTexts()).not.toContain('==');
      expect(editorText()).toContain(visible);
    },
  );

  test('preserves custom colors and restores delimiters in Source mode', async () => {
    const source = '==highlight== after';
    const backgroundColor = 'rgb(12, 34, 56)';
    editor.setUp(source, [
      highlightLanguage,
      highlightExtension,
      EditorView.theme({ '.cm-md-textHighlight': { backgroundColor } }),
      hiddenSyntaxModeExtension,
    ]);

    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(editorText()).toBe(source);

    await setHiddenSyntaxMode(window.editor, true);
    expect(editorText()).toBe('highlight after');
    const highlights = [...window.editor.dom.querySelectorAll('.cm-md-textHighlight')];
    expect(highlights.length).toBeGreaterThan(0);
    expect(highlights.every(node => getComputedStyle(node).backgroundColor === backgroundColor)).toBe(true);

    await setHiddenSyntaxMode(window.editor, false);
    expect(hiddenTexts()).toEqual([]);
    expect(editorText()).toBe(source);
    expect(window.editor.dom.querySelector('.cm-md-textHighlight')).not.toBeNull();
    expect(window.editor.state.doc.toString()).toBe(source);
  });
});
