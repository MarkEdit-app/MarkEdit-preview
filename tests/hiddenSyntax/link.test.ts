// @vitest-environment happy-dom
import { hiddenTexts, editorText } from './support';
import { describe, expect, test, vi } from 'vitest';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { createHiddenSyntaxExtension, hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { followLinkAnchor } from '../../src/hiddenSyntax/navigation';
import * as editor from '../support/editor';

describe('Link syntax', () => {
  test('opens links from their icons without revealing syntax', () => {
    const source = '[title](https://example.com) after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const icon = window.editor.dom.querySelector<HTMLButtonElement>('.cm-md-syntaxHiddenLinkButton');
    const selection = window.editor.state.selection;
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    icon?.click();

    expect(window.editor.state.selection).toEqual(selection);
    expect(editorText()).toBe('title after');
    expect(icon?.type).toBe('button');
    expect(icon?.getAttribute('aria-label')).toBe('https://example.com');
    expect(icon?.getAttribute('title')).toBe('https://example.com');
    expect(open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener');
  });

  test('rejects unsafe link destinations', () => {
    const source = '[unsafe](javascript:alert(1)) after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const icon = window.editor.dom.querySelector<HTMLButtonElement>('.cm-md-syntaxHiddenLinkButton');
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    icon?.click();
    expect(open).not.toHaveBeenCalled();
  });

  test('navigates internal links to Markdown headings', async () => {
    const source = '[ATX](#atx-heading) [Setext](#setext-heading) [Missing](#missing)\n\n## ATX Heading\n\nSetext Heading\n--------------';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const icons = window.editor.dom.querySelectorAll<HTMLButtonElement>('.cm-md-syntaxHiddenLinkButton');
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);

    icons[0].click();
    await vi.waitFor(() => expect(window.editor.state.selection.main.head).toBe(source.indexOf('## ATX Heading')));

    window.editor.dispatch({ selection: { anchor: source.length } });
    icons[1].click();
    await vi.waitFor(() => expect(window.editor.state.selection.main.head).toBe(source.indexOf('Setext Heading\n')));

    window.editor.dispatch({ selection: { anchor: source.length } });
    icons[2].click();
    expect(window.editor.state.selection.main.head).toBe(source.length);
    expect(open).not.toHaveBeenCalled();
  });

  test('matches the renderer IDs for duplicate and formatted headings', async () => {
    const source = '# Heading\n# Heading\n# Heading-1\n# Héllo, World! _One_\n# Closing #';
    editor.setUp(source, hiddenSyntaxExtension);

    expect(await followLinkAnchor(window.editor, '#heading-1')).toBe(true);
    expect(window.editor.state.selection.main.head).toBe(source.indexOf('# Heading', 1));
    expect(await followLinkAnchor(window.editor, '#heading-1-1')).toBe(true);
    expect(window.editor.state.selection.main.head).toBe(source.indexOf('# Heading-1'));
    expect(await followLinkAnchor(window.editor, '#h%C3%A9llo%2C-world!-one')).toBe(true);
    expect(window.editor.state.selection.main.head).toBe(source.indexOf('# Héllo'));
    expect(await followLinkAnchor(window.editor, '#closing')).toBe(true);
    expect(window.editor.state.selection.main.head).toBe(source.indexOf('# Closing'));
  });

  test('retries unchanged internal navigation with centered positioning', async () => {
    vi.useFakeTimers();
    editor.setUp('[heading](#heading)\n\n# Heading', hiddenSyntaxExtension);
    const dispatch = vi.spyOn(window.editor, 'dispatch');

    expect(await followLinkAnchor(window.editor, '#heading')).toBe(true);
    expect(dispatch).toHaveBeenCalledTimes(2);
    vi.advanceTimersByTime(50);
    expect(dispatch).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  });

  test('colors replacement icons as links', () => {
    const source = '[title](url) after';
    const linkColor = 'rgb(12, 34, 56)';
    const highlight = HighlightStyle.define([{ tag: tags.link, color: linkColor }]);
    editor.setUp(source, [syntaxHighlighting(highlight), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const icon = window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkButton');
    expect(icon).not.toBeNull();
    expect(getComputedStyle(icon as Element).color).toBe(linkColor);
  });

  test('uses blockquote color precedence for replacement icons', () => {
    const source = '> [title](url)\n\nBody';
    const linkColor = 'rgb(12, 34, 56)';
    const quoteColor = 'rgb(34, 120, 72)';
    const highlight = HighlightStyle.define([
      { tag: tags.link, color: linkColor },
      { tag: tags.quote, color: quoteColor },
    ]);

    editor.setUp(source, [syntaxHighlighting(highlight), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const icon = window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkButton');
    expect(getComputedStyle(icon as Element).color).toBe(quoteColor);
  });

  test('uses heading color precedence for replacement icons', () => {
    const source = '# [title](url)\n\nBody';
    const linkColor = 'rgb(12, 34, 56)';
    const headingColor = 'rgb(120, 62, 24)';
    const highlight = HighlightStyle.define([
      { tag: tags.link, color: linkColor },
      { tag: tags.heading1, color: headingColor },
    ]);

    editor.setUp(source, [syntaxHighlighting(highlight), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const icon = window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkButton');
    expect(getComputedStyle(icon as Element).color).toBe(headingColor);
  });

  test('uses enclosing strong color precedence for replacement icons', () => {
    const source = '**[title](url)** after';
    const linkColor = 'rgb(12, 34, 56)';
    const strongColor = 'rgb(98, 48, 132)';
    const highlight = HighlightStyle.define([
      { tag: tags.link, color: linkColor },
      { tag: tags.strong, color: strongColor },
    ]);

    editor.setUp(source, [syntaxHighlighting(highlight), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const icon = window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkButton');
    expect(getComputedStyle(icon as Element).color).toBe(strongColor);
  });

  test('hides inline link syntax and preserves clickability', () => {
    const source = 'Before [title](url "Title") after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe('Before title after');
    expect(window.editor.contentDOM.textContent).toContain(source);
    expect(hiddenTexts()).toEqual(['[', '](url "Title")']);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkLabel')?.textContent).toBe('title');
    const icon = window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkButton[data-kind="link"]');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('title')).toBe('url');
    expect(window.editor.posAtDOM(icon as Node)).toBe(source.indexOf('](url'));
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: 10 } });
    expect(editorText()).toBe(source);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkLabel')).toBeNull();
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkButton')).toBeNull();
  });

  test('reveals links when a selection touches their boundaries', () => {
    editor.setUp('[one](a) [two](b)', hiddenSyntaxExtension);

    window.editor.dispatch({ selection: { anchor: 8 } });
    expect(editorText()).toBe('[one](a) two');

    window.editor.dispatch({ selection: { anchor: 1, head: 9 } });
    expect(editorText()).toBe('[one](a) [two](b)');
  });

  test('hides image syntax when inline images are disabled', () => {
    const source = 'Before ![alt](image.png) after';
    editor.setUp(source, createHiddenSyntaxExtension(false));
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe('Before alt after');
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenImageLabel')?.textContent).toBe('alt');
    const icon = window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkButton[data-kind="image"]');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('title')).toBe('image.png');
    expect(window.editor.posAtDOM(icon as Node)).toBe(source.indexOf('](image.png'));
  });

  test('hides full reference and autolink syntax', () => {
    const source = '[text][label]\n[collapsed][]\n[shortcut]\n<https://example.com> after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe('text\n[collapsed][]\n[shortcut]\nhttps://example.com after');
    expect([...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenLinkLabel')].map(node => node.textContent).join('')).toBe('texthttps://example.com');
    expect([...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenLinkButton')].map(icon => icon.getAttribute('title')))
      .toEqual(['', 'https://example.com']);
  });

  test('uses resolved reference destinations as icon tooltips', () => {
    const source = '[one][Ref] [two][ ref ]\n\n[ref]: https://example.com "Title"\n[REF]: https://ignored.example.com\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect([...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenLinkButton')].map(icon => icon.getAttribute('title')))
      .toEqual(['https://example.com', 'https://example.com']);
  });

  test('does not underline link and image labels', () => {
    editor.setUp('[link](url) and ![image](url) after', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 34 } });

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    expect(cssRules.some(rule => rule.cssText.includes('.cm-md-syntaxHiddenLinkLabel') && rule.cssText.includes('text-decoration'))).toBe(false);
    expect(cssRules.some(rule => rule.cssText.includes('.cm-md-syntaxHiddenImageLabel') && rule.cssText.includes('text-decoration'))).toBe(false);
  });

  test('keeps footnotes and empty labels visible', () => {
    const source = '[^note]\n[](url)\n![](image.png)\n[text]()';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts()).toEqual([]);
  });

  test('keeps unsupported image references and email autolinks visible', () => {
    const source = '![alt][image]\n<user@example.com>';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(hiddenTexts()).toEqual([]);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkLabel, .cm-md-syntaxHiddenImageLabel')).toBeNull();
  });

  test('keeps reference definitions visible', () => {
    const source = '[label]: https://example.com';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts()).toEqual([]);
  });

  test('hides a caret-prefixed inline link', () => {
    const source = '[^label](url) after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(editorText()).toBe('^label after');
  });

  test('keeps incomplete links and images visible', () => {
    const source = '[text](\n[text](url\n[text][\n![alt](';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts()).toEqual([]);
  });

  test('combines with syntax inside the label', () => {
    const source = '[**bold**](url) after';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(editorText()).toBe('bold after');

    window.editor.dispatch({ selection: { anchor: 5 } });
    expect(editorText()).toBe(source);
  });
});
