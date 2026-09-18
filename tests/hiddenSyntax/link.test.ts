// @vitest-environment happy-dom
import { hiddenTexts, editorText } from './support';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { createHiddenSyntaxExtension, hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { followLinkAnchor } from '../../src/hiddenSyntax/navigation';
import * as editor from '../support/editor';

const markEditMock = vi.hoisted(() => ({ playSystemBeep: undefined as (() => void) | undefined }));
vi.mock('markedit-api', () => ({ MarkEdit: markEditMock }));
beforeEach(() => {
  markEditMock.playSystemBeep = undefined;
});

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
    editor.setUp(source, createHiddenSyntaxExtension([]));
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

    const beep = vi.fn();
    markEditMock.playSystemBeep = beep;

    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    window.editor.dom.querySelector<HTMLButtonElement>('.cm-md-syntaxHiddenLinkButton')?.click();
    expect(open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener');
    expect(beep).not.toHaveBeenCalled();
  });

  test('does not underline link and image labels', () => {
    editor.setUp('[link](url) and ![image](url) after', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 34 } });

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    expect(cssRules.some(rule => rule.cssText.includes('.cm-md-syntaxHiddenLinkLabel') && rule.cssText.includes('text-decoration'))).toBe(false);
    expect(cssRules.some(rule => rule.cssText.includes('.cm-md-syntaxHiddenImageLabel') && rule.cssText.includes('text-decoration'))).toBe(false);
  });

  test('leaves footnote labels containing an opening bracket unchanged', () => {
    const source = '[^a[b]\n\n[^a[b]:Note\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(editorText()).toBe(source);
    expect(hiddenTexts()).toEqual([]);
    expect(window.editor.dom.querySelector('[data-kind="footnote"], [data-kind="footnoteBack"]')).toBeNull();
  });

  test('renders bracketed footnote references and definitions and navigates between them', () => {
    const source = 'Citation.[^1] Another.[^my-source]\n\n[^1]: First note.\n[^my-source]: Second note.\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(hiddenTexts()).toEqual(['^', '^', '^', '^']);
    expect(editorText()).toBe('Citation.[1] Another.[my-source]\n\n[1]: First note.\n[my-source]: Second note.\n\nAfter');
    expect(window.editor.state.doc.toString()).toBe(source);

    const icons = window.editor.dom.querySelectorAll<HTMLButtonElement>('.cm-md-syntaxHiddenLinkButton');
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    expect(icons).toHaveLength(4);

    icons[0].click();
    expect(window.editor.state.selection.main.from).toBe(source.indexOf('[^1]:'));
    expect(editor.getText().slice(window.editor.state.selection.main.from, window.editor.state.selection.main.to)).toBe('[^1]');
    expect(editorText()).toContain('[^1]: First note.');

    icons[1].click();
    expect(window.editor.state.selection.main.from).toBe(source.indexOf('[^my-source]:'));
    expect(editor.getText().slice(window.editor.state.selection.main.from, window.editor.state.selection.main.to)).toBe('[^my-source]');
    expect(editorText()).toContain('[1]: First note.\n[^my-source]: Second note.');
    expect(open).not.toHaveBeenCalled();

    window.editor.dispatch({ selection: { anchor: source.indexOf('^1') } });
    expect(editorText()).toContain('Citation.[^1]');
  });

  test.each([true, false])('handles missing definitions with beep API available: %s', hasBeep => {
    const beep = vi.fn();
    markEditMock.playSystemBeep = hasBeep ? beep : undefined;

    const source = '[^missing] [text][missing]\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const selection = window.editor.state.selection;
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const icons = window.editor.dom.querySelectorAll<HTMLButtonElement>('.cm-md-syntaxHiddenLinkButton');

    expect(icons).toHaveLength(2);
    expect(icons[0].title).toBe('Go to definition [missing]');
    expect(icons[0].getAttribute('aria-label')).toBe(icons[0].title);

    icons.forEach(icon => icon.click());
    expect(window.editor.state.selection).toEqual(selection);
    expect(open).not.toHaveBeenCalled();
    expect(beep).toHaveBeenCalledTimes(hasBeep ? 2 : 0);
  });

  test('finds the first real footnote definition after document edits', () => {
    const source = '[^note]\n\n```\n[^note]: Code, not a definition.\n```\n\n  [^note]: First.\n\n[^note]: Duplicate.\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    window.editor.dispatch({ changes: { from: 0, insert: 'Before\n\n' } });

    const icon = window.editor.dom.querySelector<HTMLButtonElement>('.cm-md-syntaxHiddenLinkButton');
    expect(icon).not.toBeNull();
    icon?.click();
    const updatedSource = window.editor.state.doc.toString();
    expect(window.editor.state.selection.main.from).toBe(updatedSource.indexOf('[^note]: First.'));
    expect(updatedSource.slice(window.editor.state.selection.main.from, window.editor.state.selection.main.to)).toBe('[^note]');
    expect(editorText()).toContain('[^note]: First.');
  });

  test.each(['[^a][^b]', '[^a](unfinished'])('recognizes footnotes in %s', text => {
    const source = `${text}\n\n[^a]: Alpha\n\n[^b]: Beta\n\nAfter`;
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const references = window.editor.dom.querySelectorAll<HTMLButtonElement>('[data-kind="footnote"]');
    expect(references).toHaveLength(text === '[^a][^b]' ? 2 : 1);
    expect(editorText().split('\n')[0]).toBe(text.replace(/\[\^/g, '['));

    references.forEach((icon, index) => {
      icon.click();
      const marker = index === 0 ? '[^a]' : '[^b]';
      expect(window.editor.state.selection.main.from).toBe(source.indexOf(`${marker}:`));
      window.editor.dispatch({ selection: { anchor: source.length } });
      const back = window.editor.dom.querySelectorAll<HTMLButtonElement>('[data-kind="footnoteBack"]')[index];
      back.click();
      const selection = window.editor.state.selection.main;
      expect(selection.from).toBe(source.indexOf(marker));
      expect(source.slice(selection.from, selection.to)).toBe(marker);
    });
  });

  test('keeps empty labels visible', () => {
    const source = '[](url)\n![](image.png)\n[text]()\n[^]';
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

  test('reveals footnote definition syntax only when the marker is selected', () => {
    const source = '[^note]: Definition text.\n\n[label]: https://example.com\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.indexOf('text') } });
    expect(editorText()).toBe('[note]: Definition text.\n\n[label]: https://example.com\n\nAfter');
    expect(window.editor.dom.querySelector('[data-kind="footnoteBack"]')).not.toBeNull();

    window.editor.dispatch({ selection: { anchor: 2 } });
    expect(editorText()).toBe(source);
    expect(hiddenTexts()).toEqual([]);
    expect(window.editor.dom.querySelector('[data-kind="footnoteBack"]')).toBeNull();

    window.editor.dispatch({ selection: { anchor: source.indexOf(':') } });
    expect(editorText()).toBe(source);

    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts()).toEqual(['^']);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test.each(['', 'Text', ' Text', '  Text', '\tText'])('spaces footnote definition bodies: %j', body => {
    const source = `[^1]:${body}\n\nAfter`;
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const expectedBody = /^[ \t]/.test(body) ? body : ` ${body}`;
    expect(editorText()).toBe(`[1]:${expectedBody}\n\nAfter`);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test.each(['1', 'my-source'])('jumps back to the first real reference for %s after edits', label => {
    const marker = `[^${label}]`;
    const source = `\`${marker}\`\n\n${marker}(url)\n\nFirst ${marker}. Again ${marker}.\n\n${marker}: Note.\n\nAfter`;
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    window.editor.dispatch({ changes: { from: 0, insert: 'Before\n\n' } });

    const icon = window.editor.dom.querySelector<HTMLButtonElement>('[data-kind="footnoteBack"]');
    expect(icon?.title).toBe(`Back to reference [${label}]`);
    expect(icon?.getAttribute('aria-label')).toBe(icon?.title);
    icon?.click();

    const updatedSource = window.editor.state.doc.toString();
    const selection = window.editor.state.selection.main;
    expect(selection.from).toBe(updatedSource.indexOf(`First ${marker}`) + 'First '.length);
    expect(updatedSource.slice(selection.from, selection.to)).toBe(marker);
    expect(editorText()).toContain(`First ${marker}`);
    expect(editorText()).toContain(`[${label}]: Note.`);
    expect(updatedSource).toBe(`Before\n\n${source}`);
  });

  test.each([true, false])('handles unreferenced definitions with beep API available: %s', hasBeep => {
    const beep = vi.fn();
    markEditMock.playSystemBeep = hasBeep ? beep : undefined;

    const source = '[^missing]: Note.\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const selection = window.editor.state.selection;
    const icon = window.editor.dom.querySelector<HTMLButtonElement>('[data-kind="footnoteBack"]');
    expect(icon).not.toBeNull();
    icon?.click();
    expect(window.editor.state.selection).toEqual(selection);
    expect(beep).toHaveBeenCalledTimes(hasBeep ? 1 : 0);
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
