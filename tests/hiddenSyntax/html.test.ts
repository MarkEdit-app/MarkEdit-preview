// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from 'vitest';
import { EditorSelection, EditorState } from '@codemirror/state';
import { codeFolding, foldEffect, unfoldEffect } from '@codemirror/language';
import { createHiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { HtmlWidget, isCompleteHtml } from '../../src/hiddenSyntax/components/html';
import * as editor from '../support/editor';

vi.mock('markedit-api', () => ({ MarkEdit: {} }));

describe('HTML completeness', () => {
  test.each([
    '<div><strong>Hello</strong></div>',
    '<div>\nHello\n</div>',
    '<hr>',
    '<img src="image.png"/>',
    '<div>One</div>\n<div>Two</div>',
    '<DIV>Hello</div>',
  ])('accepts self-contained HTML: %s', source => {
    expect(isCompleteHtml(source)).toBe(true);
  });

  test.each([
    '<div>Unfinished',
    '</div>',
    '<div/>',
    '<div><p>Hello</div>',
    '<div></span>',
    '<div>Hello</div>\nFollowing text',
    '<!-- comment -->',
    '<!DOCTYPE html>',
    '<div title="unfinished></div>',
    '',
  ])('rejects incomplete or ambiguous HTML: %s', source => {
    expect(isCompleteHtml(source)).toBe(false);
  });

  test.each(['<script>alert(1)</script>', '<style>body { color: red; }</style>'])('keeps stripped-only blocks as source: %s', source => {
    expect(HtmlWidget.create(source)).toBeUndefined();
  });
});

describe('Hidden HTML', () => {
  const html = '<div>\n<strong>Hello</strong>\n</div>';
  const widget = () => window.editor.dom.querySelector('.cm-md-syntaxHiddenHtml');
  const body = () => widget()?.shadowRoot?.querySelector('.markdown-body');

  function setUp(block = html, enabled = true) {
    const source = `${block}\n\nAfter`;
    editor.setUp(source, [createHiddenSyntaxExtension(enabled ? ['html'] : undefined), codeFolding(), EditorState.allowMultipleSelections.of(true)]);
    window.editor.dispatch({ selection: { anchor: source.length } });
    return source;
  }

  afterEach(() => {
    window.editor.destroy();
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  test('is off by default', () => {
    setUp(html, false);
    expect(widget()).toBeNull();
  });

  test('renders complete HTML without changing source', () => {
    const source = setUp();
    expect(body()?.querySelector('strong')?.textContent).toBe('Hello');
    expect((body() as HTMLElement).inert).toBe(true);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test.each([
    '<b>Bold</b>',
    '<a>Link</a>',
    'Hello <b>world</b>!',
    '<img src="image.png"/>',
    '<div>\n\nHello\n\n</div>',
    '> <b>Bold</b>',
    '- <b>Bold</b>',
    '> <div>Hello</div>',
    '- <div>Hello</div>',
    '<div>Hello</div>\nFollowing text',
    '<b>\n\nBold\n\n</b>',
  ])('renders complete fragments: %s', source => {
    const documentSource = setUp(source);
    expect(widget()).not.toBeNull();
    expect(window.editor.state.doc.toString()).toBe(documentSource);
  });

  test.each([
    '```html\n<div>Hello</div>\n```',
    '`<b>Hello</b>`',
    '    <b>Hello</b>',
    '\\<b>Hello</b>',
    '> <b>Hello\n\nOutside</b>',
    '<b>Missing close',
    '<b><i>Mismatched</b>',
    '<div>Unfinished',
    '<!-- comment -->',
  ])('keeps unsupported HTML as source: %s', source => {
    setUp(source);
    expect(widget()).toBeNull();
  });

  test.each([
    '<b>unfinished\n\n<b>valid</b>',
    '> <b>unfinished\n\n<b>valid</b>',
  ])('renders complete fragments after unfinished HTML: %s', source => {
    const documentSource = setUp(source);
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenHtml')).toHaveLength(1);
    expect(body()?.textContent).toBe('valid');
    expect(window.editor.state.doc.toString()).toBe(documentSource);
  });

  test.each([
    '<div>\n`code`\n</div>',
    '<div>\n\n`code`\n\n</div>',
    '<div>\n    text\n</div>',
    '<div>\n\n    text\n\n</div>',
    '<div>\n\n    <b>text</b>\n\n</div>',
  ])('renders complete HTML containing Markdown-like text: %s', source => {
    const documentSource = setUp(source);
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenHtml')).toHaveLength(1);
    expect(body()?.firstElementChild?.tagName).toBe('DIV');
    expect(body()?.textContent?.trim()).toBe(source.includes('`code`') ? '`code`' : 'text');
    expect(window.editor.state.doc.toString()).toBe(documentSource);
  });

  test('renders after front matter', () => {
    setUp(`---\ntitle: Example\n---\n\n${html}`);
    expect(body()?.querySelector('strong')?.textContent).toBe('Hello');
  });

  test('keeps inline fragments in their surrounding line', () => {
    setUp('Hello <b>world</b> and <i>everyone</i>!');
    const widgets = [...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenHtml')];
    expect(widgets).toHaveLength(2);
    expect(widgets.every(element => element.tagName === 'SPAN')).toBe(true);
    expect(widgets[0].closest('.cm-line')).toBe(widgets[1].closest('.cm-line'));
    expect(widgets[0].closest('.cm-line')?.textContent).toBe('Hello  and !');
    expect(widgets.map(element => element.shadowRoot?.querySelector('.markdown-body')?.textContent))
      .toEqual(['world', 'everyone']);
  });

  test.each([
    ['<b>text</b>', true],
    ['<div>text</div>', false],
  ])('disables the theme clearfix only for inline HTML: %s', (source, inline) => {
    setUp(source);
    const styles = widget()!.shadowRoot!.querySelectorAll('style');
    expect(styles[styles.length - 1].textContent.includes('.markdown-body::before, .markdown-body::after { content: none; }'))
      .toBe(inline);
  });

  test('keeps Markdown link syntax hidden around HTML', () => {
    setUp('[<b>Link</b>](https://example.com)');
    expect(body()?.querySelector('b')?.textContent).toBe('Link');
    const hidden = [...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenSource')];
    expect(hidden.map(element => element.textContent).join('')).toBe('[](https://example.com)');
  });

  test('reveals only the selected inline fragment', () => {
    setUp('Hello <b>world</b> and <i>everyone</i>!');
    window.editor.dispatch({ selection: { anchor: 10 } });
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenHtml')).toHaveLength(1);
    expect(body()?.querySelector('i')?.textContent).toBe('everyone');
  });

  test('does not render HTML in front matter or code alongside real HTML', () => {
    setUp('---\ntitle: <b>Metadata</b>\n---\n\n`<b>Code</b>`\n\n<b>Real</b>');
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenHtml')).toHaveLength(1);
    expect(body()?.textContent).toBe('Real');
  });

  test('renders quoted HTML without quote markers', () => {
    setUp('> <div>\n> Hello\n> </div>');
    expect(body()?.textContent?.trim()).toBe('Hello');
  });

  test('reveals source on click at its current position', () => {
    setUp();
    window.editor.dispatch({ changes: { from: 0, insert: 'Before\n\n' } });
    widget()!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    expect(window.editor.state.selection.main.head).toBe('Before\n\n'.length);
    expect(widget()).toBeNull();
  });

  test('reveals source for secondary selections', () => {
    const source = setUp();
    window.editor.dispatch({ selection: EditorSelection.create([
      EditorSelection.cursor(8), EditorSelection.cursor(source.length),
    ], 1) });
    expect(widget()).toBeNull();
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(widget()).not.toBeNull();
  });

  test('respects explicit source folds', () => {
    setUp();
    const range = { from: 5, to: html.length };
    window.editor.dispatch({ effects: foldEffect.of(range) });
    expect(widget()).toBeNull();
    expect(window.editor.dom.querySelector('.cm-foldPlaceholder')).not.toBeNull();
    window.editor.dispatch({ effects: unfoldEffect.of(range) });
    expect(widget()).not.toBeNull();
  });

  test('reuses unchanged HTML without reparsing and refreshes changed content in place', () => {
    setUp();
    const container = widget();
    const content = body()?.firstElementChild;
    const create = vi.spyOn(HtmlWidget, 'create');
    window.editor.dispatch(window.editor.state.replaceSelection('!'));
    expect(widget()).toBe(container);
    expect(body()?.firstElementChild).toBe(content);
    expect(create).not.toHaveBeenCalled();

    const from = html.indexOf('Hello');
    window.editor.dispatch({ changes: { from, to: from + 5, insert: 'World' } });
    expect(widget()).toBe(container);
    expect(body()?.querySelector('strong')?.textContent).toBe('World');
  });

  test('preserves inline text formatting without changing source', () => {
    const source = setUp('<div style="text-align: center; color: red; background-color: yellow; font-family: Georgia, serif; font-weight: bold; font-style: italic; text-decoration-line: underline">Some centered text</div>');
    const style = (body()?.firstElementChild as HTMLElement).style;
    expect(style.textAlign).toBe('center');
    expect(style.color).toBe('red');
    expect(style.backgroundColor).toBe('yellow');
    expect(style.fontFamily).toBe('Georgia, serif');
    expect(style.fontWeight).toBe('bold');
    expect(style.fontStyle).toBe('italic');
    expect(style.textDecorationLine).toBe('underline');
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('filters inline styles on nested elements and drops priority', () => {
    setUp('<div style="text-align: center !important; position: fixed; inset: 0; z-index: 999"><b style="color: red; display: none; transform: scale(100); --custom: blue; background-image: url(https://example.com/image.png)">Hello</b></div>');
    const outer = body()?.firstElementChild as HTMLElement;
    const inner = outer.querySelector('b')!;
    expect(outer.getAttribute('style')).toBe('text-align: center;');
    expect(inner.getAttribute('style')).toBe('color: red;');
  });

  test('does not carry inline styles between elements', () => {
    setUp('<div><b style="color: red">One</b><i style="position: fixed">Two</i></div>');
    expect(body()?.querySelector('b')?.style.color).toBe('red');
    expect(body()?.querySelector('i')?.hasAttribute('style')).toBe(false);
  });

  test('removes unsafe HTML, disruptive CSS, and interactive controls', () => {
    setUp('<div style="position:fixed" onclick="alert(1)"><script>alert(1)</script><style>body{display:none}</style><iframe src="https://example.com"></iframe><input autofocus><a href="javascript:alert(1)">Link</a><strong>Safe</strong></div>');
    expect(body()?.querySelector('script, style, iframe, input, [style], [onclick], [autofocus]')).toBeNull();
    expect(body()?.querySelector('a')?.hasAttribute('href')).toBe(false);
    expect(body()?.querySelector('a')?.tabIndex).toBe(-1);
    expect(body()?.querySelector('strong')?.textContent).toBe('Safe');
  });
});
