// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { EditorSelection, EditorState } from '@codemirror/state';
import { history, redo, undo } from '@codemirror/commands';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Decoration, EditorView, lineNumbers } from '@codemirror/view';
import { classHighlighter, tags } from '@lezer/highlight';
import { createHiddenSyntaxExtension, hiddenSyntaxExtension } from '../src/hiddenSyntax';
import { blockquoteBarDescriptors, blockquoteBarMarkers } from '../src/hiddenSyntax/components/bar';
import { unorderedListBulletDescriptors, unorderedListBulletMarkers } from '../src/hiddenSyntax/components/bullet';
import { taskCheckboxDescriptors } from '../src/hiddenSyntax/components/task';
import { BlockMathWidget } from '../src/hiddenSyntax/components/math';
import { MermaidWidget } from '../src/hiddenSyntax/components/mermaid';
import { renderMermaidSVG } from '../src/render';
import { hiddenSyntaxModeExtension, setHiddenSyntaxMode } from '../src/hiddenSyntax/mode';
import { followLinkAnchor } from '../src/hiddenSyntax/navigation';
import * as editor from './support/editor';

const mermaidMocks = vi.hoisted(() => ({
  initialize: vi.fn(),
  render: vi.fn(async (_id: string, source: string) => ({ svg: `<svg><text>${source}</text></svg>` })),
}));

vi.mock('mermaid', () => ({ default: mermaidMocks }));

beforeEach(() => {
  mermaidMocks.initialize.mockClear();
  mermaidMocks.render.mockReset();
  mermaidMocks.render.mockImplementation(async (_id, source) => ({ svg: `<svg><text>${source}</text></svg>` }));
});

afterEach(() => {
  vi.restoreAllMocks();
  window.editor.destroy();
  document.body.innerHTML = '';
});

function hiddenText() {
  return window.editor.dom.querySelector('.cm-md-syntaxHiddenSource')?.textContent;
}

function hiddenTexts() {
  return [...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenSource')].map(node => node.textContent);
}

function editorText() {
  return [...window.editor.contentDOM.querySelectorAll('.cm-line')]
    .map(line => {
      const renderedLine = line.cloneNode(true) as HTMLElement;
      renderedLine.querySelectorAll('.cm-md-syntaxHiddenSource').forEach(source => source.remove());
      return renderedLine.textContent;
    })
    .join('\n');
}

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

  test('reveals links at caret boundaries but not adjacent selection boundaries', () => {
    editor.setUp('[one](a) [two](b)', hiddenSyntaxExtension);

    window.editor.dispatch({ selection: { anchor: 8 } });
    expect(editorText()).toBe('[one](a) two');

    window.editor.dispatch({ selection: { anchor: 1, head: 9 } });
    expect(editorText()).toBe('[one](a) two');
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

describe('Inline images', () => {
  test('renders remote images in place of their Markdown source', () => {
    const source = 'Before ![Alt](https://example.com/image.png) after';
    editor.setUp(source, createHiddenSyntaxExtension(true));
    window.editor.dispatch({ selection: { anchor: source.length } });

    const image = window.editor.dom.querySelector<HTMLImageElement>('.cm-md-syntaxHiddenImage');
    expect(image?.getAttribute('src')).toBe('https://example.com/image.png');
    expect(image?.alt).toBe('Alt');
    expect(image?.title).toBe('https://example.com/image.png');
    expect(window.editor.state.doc.toString()).toBe(source);
    expect(hiddenTexts()).toEqual([]);
  });

  test('loads local images through the image loader', () => {
    const source = '![Local](images/photo.png) after';
    editor.setUp(source, createHiddenSyntaxExtension(true));
    window.editor.dispatch({ selection: { anchor: source.length } });

    const image = window.editor.dom.querySelector<HTMLImageElement>('.cm-md-syntaxHiddenImage');
    expect(image?.getAttribute('src')).toBe('image-loader://images/photo.png');
  });

  test('renders reference images with their resolved destination', () => {
    const source = '![Photo][image]\n\n[image]: assets/photo.jpg';
    editor.setUp(source, createHiddenSyntaxExtension(true));
    window.editor.dispatch({ selection: { anchor: source.length } });

    const image = window.editor.dom.querySelector<HTMLImageElement>('.cm-md-syntaxHiddenImage');
    expect(image?.getAttribute('src')).toBe('image-loader://assets/photo.jpg');
    expect(image?.alt).toBe('Photo');
  });

  test('reveals image source when selected', () => {
    const source = 'Before ![Alt](image.png) after';
    editor.setUp(source, createHiddenSyntaxExtension(true));
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenImage')).not.toBeNull();

    window.editor.dispatch({ selection: { anchor: source.indexOf('Alt') } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenImage')).toBeNull();
    expect(window.editor.dom.textContent).toContain('![Alt](image.png)');
  });

  test('keeps image source visible when inline images are disabled', () => {
    const source = '![Alt](image.png) after';
    editor.setUp(source, createHiddenSyntaxExtension(false));
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenImage')).toBeNull();
    expect(editorText()).toBe('Alt after');
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenLinkButton[data-kind="image"]')).not.toBeNull();
  });
});

describe('Block math', () => {
  test('allows editor mouse handling throughout the rendered widget', () => {
    expect(new BlockMathWidget('y=x').ignoreEvent()).toBe(false);
  });

  test('renders inactive math and reveals its source when selected', async () => {
    const source = '$$y=x$$\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    await vi.waitFor(() => expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath .katex-display')).not.toBeNull());
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: source.indexOf('y') } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath')).toBeNull();
    expect(window.editor.dom.textContent).toContain('$$y=x$$');
  });

  test('renders multiline math', async () => {
    const source = '$$\ny = x + 1\n$$\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    await vi.waitFor(() => expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath .katex-display')).not.toBeNull());
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath')?.textContent).toContain('y=x+1');
  });

  test('closes multiline math only on a standalone delimiter line', async () => {
    const source = '$$\nx = 1\nx $$y=x$$\ny = 3\n$$\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    await vi.waitFor(() => expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath')).not.toBeNull());
    window.editor.dispatch({ selection: { anchor: source.indexOf('y = 3') } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath')).toBeNull();
  });

  test('keeps empty, incomplete, and inline-positioned math as source', () => {
    const source = '$$$$\n\n$$\n\nIncomplete\n\nx $$y=x$$';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath')).toBeNull();
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('renders invalid math as a safe KaTeX error', async () => {
    const source = '$$\\frac{$$\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    await vi.waitFor(() => expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath .katex-error')).not.toBeNull());
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath')?.textContent).toContain('\\frac{');
  });
});

describe('Mermaid blocks', () => {
  test('reinitializes Mermaid when the color scheme changes', async () => {
    let darkMode = false;
    vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
      get matches() { return darkMode; },
    }) as MediaQueryList);

    await renderMermaidSVG('graph TD');
    mermaidMocks.initialize.mockClear();

    darkMode = true;
    await renderMermaidSVG('graph TD');
    expect(mermaidMocks.initialize).toHaveBeenLastCalledWith({ theme: 'dark' });

    darkMode = false;
    await renderMermaidSVG('graph TD');
    expect(mermaidMocks.initialize).toHaveBeenLastCalledWith({ theme: undefined });
  });

  test('rerenders mounted diagrams when the color scheme changes', async () => {
    let darkMode = false;
    let listener: EventListener | undefined;
    const removeEventListener = vi.fn();
    vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
      get matches() { return darkMode; },
      addEventListener: (_type: string, callback: EventListenerOrEventListenerObject) => {
        listener = callback as EventListener;
      },
      removeEventListener,
    }) as unknown as MediaQueryList);

    const widget = new MermaidWidget('graph TD');
    const view = { requestMeasure: vi.fn() } as unknown as EditorView;
    const container = widget.toDOM(view);
    document.body.appendChild(container);
    await vi.waitFor(() => expect(mermaidMocks.render).toHaveBeenCalledTimes(1));
    mermaidMocks.render.mockClear();

    darkMode = true;
    listener?.(new Event('change'));
    await vi.waitFor(() => expect(mermaidMocks.render).toHaveBeenCalledTimes(1));
    expect(mermaidMocks.initialize).toHaveBeenLastCalledWith({ theme: 'dark' });

    widget.destroy(container);
    expect(removeEventListener).toHaveBeenCalledOnce();
  });

  test('allows editor mouse handling throughout the rendered widget', () => {
    expect(new MermaidWidget('graph TD').ignoreEvent()).toBe(false);
  });

  test('renders inactive diagrams and reveals their source when selected', async () => {
    const source = '```mermaid\ngraph TD\n  A --> B\n```\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    await vi.waitFor(() => expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenMermaid svg')).not.toBeNull());
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenMermaid')?.textContent).toContain('graph TD');
    expect(mermaidMocks.render).toHaveBeenCalledWith(expect.stringMatching(/^markedit-mermaid-/), 'graph TD\n  A --> B');
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: source.indexOf('graph TD') } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenMermaid')).toBeNull();
    expect(window.editor.dom.textContent).toContain('```mermaid');
  });

  test.each([
    ['empty', '```mermaid\n```'],
    ['incomplete', '```mermaid\ngraph TD'],
    ['other language', '```javascript\ngraph TD\n```'],
    ['extended info', '```mermaid example\ngraph TD\n```'],
  ])('keeps %s fences as source', (_name, source) => {
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenMermaid')).toBeNull();
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('falls back to safe source text when rendering fails', async () => {
    const content = 'not a diagram';
    const source = `\`\`\`mermaid\n${content}\n\`\`\`\n\nAfter`;
    mermaidMocks.render.mockRejectedValueOnce(new Error('Parse error'));
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    await vi.waitFor(() => expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenMermaidError')).not.toBeNull());
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenMermaidError')?.textContent).toBe(content);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenMermaid svg')).toBeNull();
  });
});

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

describe('Horizontal rule syntax', () => {
  test('replaces a standalone rule with a semantic divider', () => {
    const source = 'Before\n\n----\n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const divider = window.editor.dom.querySelector('.cm-md-syntaxHiddenHorizontalRule');
    expect(divider?.getAttribute('role')).toBe('separator');
    expect(divider?.getAttribute('aria-orientation')).toBe('horizontal');
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('supports standard rule markers and reveals the selected line', () => {
    const source = 'Before\n\n---\n\n***\n\n* * *\n\n  _ _ _  \n\nAfter';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenHorizontalRule')).toHaveLength(4);

    window.editor.dispatch({ selection: { anchor: source.indexOf('  _ _ _') } });
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenHorizontalRule')).toHaveLength(3);
  });

  test('does not replace Setext heading underlines', () => {
    editor.setUp('Heading\n----', hiddenSyntaxExtension);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenHorizontalRule')).toBeNull();
  });

  test('does not replace front matter delimiters', () => {
    editor.setUp('---\ntitle: MarkEdit\n---\n\nBody', hiddenSyntaxExtension);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenHorizontalRule')).toBeNull();
  });

  test('does not replace nested horizontal rules', () => {
    editor.setUp('> ----\n\nAfter', hiddenSyntaxExtension);
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenHorizontalRule')).toBeNull();
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
    expect(sourceRule.style.getPropertyValue('font-size')).toBe('0.01px');
    expect(sourceRule.style.getPropertyPriority('font-size')).toBe('important');

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

  test('does not reveal the next node at a selection boundary', () => {
    editor.setUp('**One** **Two**', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 2, head: 8 } });

    expect(editorText()).toBe('**One** Two');
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

test('keeps HTML source visible', () => {
  const source = '<b>inline</b>\n\n<div>block</div>';
  editor.setUp(source, hiddenSyntaxExtension);
  window.editor.dispatch({ selection: { anchor: source.length } });

  expect(hiddenTexts()).toEqual([]);
  expect(window.editor.state.doc.toString()).toBe(source);
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

describe('Unordered list syntax', () => {
  function hiddenMarkerPositions() {
    return [...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenListMark')]
      .map(marker => window.editor.posAtDOM(marker));
  }

  test('normalizes bullet markers and reveals only an active prefix', () => {
    const source = '- one\n* two\n+ three\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const hiddenMarkers = () => [...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenBulletMark')]
      .map(marker => marker.textContent);
    const bulletPositions = () => unorderedListBulletDescriptors(window.editor)
      .map(descriptor => descriptor.from);
    expect(hiddenMarkers()).toEqual(['-', '*', '+']);
    expect(bulletPositions()).toEqual([0, source.indexOf('*'), source.indexOf('+')]);
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: source.indexOf('two') } });
    expect(hiddenMarkers()).toEqual(['-', '*', '+']);
    expect(bulletPositions()).toEqual([0, source.indexOf('*'), source.indexOf('+')]);

    window.editor.dispatch({ selection: { anchor: source.indexOf('*') + 1 } });
    expect(hiddenMarkers()).toEqual(['-', '+']);
    expect(bulletPositions()).toEqual([0, source.indexOf('+')]);
  });

  test('hides a complete marker while typing item content', () => {
    editor.setUp('', hiddenSyntaxExtension);

    window.editor.dispatch({ changes: { from: 0, insert: '-' }, selection: { anchor: 1 } });
    expect(hiddenMarkerPositions()).toEqual([]);

    window.editor.dispatch({ changes: { from: 1, insert: ' ' }, selection: { anchor: 2 } });
    expect(hiddenMarkerPositions()).toEqual([0]);

    window.editor.dispatch({ changes: { from: 2, insert: 'item' }, selection: { anchor: 6 } });
    expect(hiddenMarkerPositions()).toEqual([0]);
  });

  test('keeps the bullet until a task marker is complete', () => {
    editor.setUp('', hiddenSyntaxExtension);

    const type = (text: string) => {
      const from = window.editor.state.doc.length;
      window.editor.dispatch({ changes: { from, insert: text }, selection: { anchor: from + text.length } });
    };

    type('- ');
    expect(unorderedListBulletDescriptors(window.editor)).toHaveLength(1);
    expect(taskCheckboxDescriptors(window.editor)).toHaveLength(0);

    for (const character of ['[', ' ', ']']) {
      type(character);
      expect(unorderedListBulletDescriptors(window.editor)).toHaveLength(1);
      expect(taskCheckboxDescriptors(window.editor)).toHaveLength(0);
    }

    type(' ');
    expect(unorderedListBulletDescriptors(window.editor)).toHaveLength(0);
    expect(taskCheckboxDescriptors(window.editor)).toHaveLength(1);
  });

  test('paints source color and line opacity without marker classes', () => {
    const source = '- item\n\nBody';
    const listColor = 'rgb(12, 34, 56)';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const marker = window.editor.dom.querySelector<HTMLElement>('.cm-md-syntaxHiddenBulletMark');
    if (marker === null) {
      throw new Error('Expected hidden bullet syntax');
    }

    const line = marker.closest<HTMLElement>('.cm-line');
    if (line === null) {
      throw new Error('Expected hidden bullet line');
    }

    window.editor.dom.querySelectorAll('.cm-md-listMark').forEach(element => {
      element.classList.remove('cm-md-listMark');
    });

    marker.style.color = listColor;
    marker.style.opacity = '0.5';
    line.style.opacity = '0.5';

    vi.spyOn(window.editor, 'coordsForChar').mockReturnValue({
      left: 10,
      right: 20,
      top: 30,
      bottom: 50,
    });

    const initial = unorderedListBulletMarkers(window.editor)[0];
    const painted = initial.draw();
    expect(painted.className).toBe('cm-md-syntaxHiddenListBullet');
    expect(painted.style.color).toBe(listColor);
    expect(painted.style.opacity).toBe('0.25');
    expect(painted.style.left).toBe('10px');
    expect(painted.style.width).toBe('10px');

    line.style.opacity = '0.4';
    const updated = unorderedListBulletMarkers(window.editor)[0];
    expect(updated.eq(initial)).toBe(false);
    expect(updated.update(painted, initial)).toBe(true);
    expect(painted.style.opacity).toBe('0.2');
  });

  test('reveals nested prefixes independently', () => {
    const source = '- parent\n  - child\n\nBody';
    const childMarker = source.indexOf('- child');
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenMarkerPositions()).toEqual([0, childMarker]);

    window.editor.dispatch({ selection: { anchor: source.indexOf('child') } });
    expect(hiddenMarkerPositions()).toEqual([0, childMarker]);

    window.editor.dispatch({ selection: { anchor: childMarker + 1 } });
    expect(hiddenMarkerPositions()).toEqual([0]);

    window.editor.dispatch({ selection: { anchor: 1 } });
    expect(hiddenMarkerPositions()).toEqual([childMarker]);
  });

  test('keeps prefixes hidden from continuation text', () => {
    const source = '- first\n  continuation\n- second\n\nBody';
    const secondMarker = source.indexOf('- second');
    editor.setUp(source, hiddenSyntaxExtension);

    window.editor.dispatch({ selection: { anchor: source.indexOf('continuation') } });
    expect(hiddenMarkerPositions()).toEqual([0, secondMarker]);
  });

  test('replaces inactive task prefixes without drawing bullets', () => {
    const source = '- [ ] todo\n- [x] done\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(unorderedListBulletDescriptors(window.editor)).toEqual([]);
    expect(taskCheckboxDescriptors(window.editor).map(task => task.checked)).toEqual([false, true]);
    const inputs = window.editor.dom.querySelectorAll<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    expect(inputs).toHaveLength(2);
    expect(inputs[0].type).toBe('checkbox');
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenTaskCheckboxControl')).toHaveLength(2);
    expect([...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenTaskCheckboxMarker')]
      .map(marker => marker.textContent)).toEqual(['- ', '- ']);

    window.editor.dispatch({ selection: { anchor: source.indexOf('todo') } });
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenTaskCheckbox')).toHaveLength(2);

    window.editor.dispatch({ selection: { anchor: source.indexOf('[ ]') + 1 } });
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenTaskCheckbox')).toHaveLength(1);
  });

  test('finds task prefixes and reveals only an active prefix', () => {
    const source = '- [ ] todo\n- [X] done\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(taskCheckboxDescriptors(window.editor)).toEqual([
      { from: 0, to: 6, markerFrom: 2, listPrefix: '- ', checked: false, label: 'todo' },
      { from: 11, to: 17, markerFrom: 13, listPrefix: '- ', checked: true, label: 'done' },
    ]);

    window.editor.dispatch({ selection: { anchor: source.indexOf('todo') } });
    expect(taskCheckboxDescriptors(window.editor)).toHaveLength(2);

    window.editor.dispatch({ selection: { anchor: source.indexOf('[ ]') + 1 } });
    expect(taskCheckboxDescriptors(window.editor)).toEqual([
      { from: 11, to: 17, markerFrom: 13, listPrefix: '- ', checked: true, label: 'done' },
    ]);
  });

  test('reveals nested task items independently', () => {
    const source = '- [ ] parent\n  - [ ] child\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.indexOf('child') } });
    expect(taskCheckboxDescriptors(window.editor).map(task => task.label)).toEqual(['parent', 'child']);

    window.editor.dispatch({ selection: { anchor: source.lastIndexOf('[ ]') + 1 } });
    expect(taskCheckboxDescriptors(window.editor).map(task => task.label)).toEqual(['parent']);
  });

  test('changes only the task state and supports undo', () => {
    const source = '- [ ] todo\n\nBody';
    editor.setUp(source, [history(), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const input = window.editor.dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    if (input === null) {
      throw new Error('Expected task checkbox');
    }

    const scrollSnapshot = vi.spyOn(window.editor, 'scrollSnapshot');
    expect(input.getAttribute('aria-label')).toBe('todo');
    input.click();
    expect(window.editor.state.doc.toString()).toBe('- [x] todo\n\nBody');
    expect(window.editor.state.selection.main.head).toBe(source.length);
    expect(scrollSnapshot).toHaveBeenCalledTimes(1);

    expect(undo(window.editor)).toBe(true);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('preserves checkbox focus after toggling', () => {
    editor.setUp('- [ ] todo\n\nBody', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });

    const input = window.editor.dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    if (input === null) {
      throw new Error('Expected task checkbox');
    }

    input.focus();
    input.click();

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenTaskCheckbox')).toBe(input);
    expect(document.activeElement).toBe(input);
    expect(input.checked).toBe(true);
  });

  test('disables rendered task checkboxes in read-only state', () => {
    const source = '- [ ] todo\n\nBody';
    editor.setUp(source, [EditorState.readOnly.of(true), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const input = window.editor.dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    expect(input?.disabled).toBe(true);
    input?.dispatchEvent(new Event('change'));
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('disables rendered task checkboxes in a non-editable view', () => {
    const source = '- [ ] todo\n\nBody';
    editor.setUp(source, [EditorView.editable.of(false), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const input = window.editor.dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    expect(input?.disabled).toBe(true);
    input?.click();
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('keeps incomplete item markers visible', () => {
    const source = '-\n\n- item\n\nBody';
    const completeMarker = source.indexOf('- item');
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(hiddenMarkerPositions()).toEqual([completeMarker]);
  });

  test('leaves ordered list markers unchanged', () => {
    const source = '1. one\n2. two\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenListMark')).toBeNull();
  });

  test('combines with line numbers', () => {
    const source = '- item\n\nBody';
    editor.setUp(source, [
      lineNumbers(),
      hiddenSyntaxExtension,
    ]);

    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBulletMark')).not.toBeNull();
    expect(window.editor.dom.querySelector('.cm-lineNumbers')).not.toBeNull();

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    const listRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenListMark')) as CSSStyleRule;
    expect(listRule.style.getPropertyValue('font-size')).toBe('inherit');
    expect(listRule.style.getPropertyPriority('font-size')).toBe('important');
    expect(listRule.style.getPropertyValue('visibility')).toBe('hidden');

    const bulletRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenListBullet')) as CSSStyleRule;
    expect(bulletRule.style.getPropertyValue('display')).toBe('flex');
    expect(bulletRule.style.getPropertyValue('align-items')).toBe('center');
    expect(bulletRule.style.getPropertyValue('justify-content')).toBe('center');
    const layerRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenListBulletLayer')) as CSSStyleRule;
    expect(layerRule.style.getPropertyValue('z-index')).toBe('0');
    expect(layerRule.style.getPropertyPriority('z-index')).toBe('important');
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenListBulletLayer')?.getAttribute('aria-hidden')).toBe('true');
  });

  test('centers task checkboxes in a fixed control slot', () => {
    const hangingIndent = EditorView.decorations.of(Decoration.set([
      Decoration.line({ attributes: { style: 'text-indent: -2em; margin-inline-start: 2em' } }).range(0),
    ]));

    editor.setUp('- [ ] task\n\nBody', [EditorView.lineWrapping, hangingIndent, hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    const frameRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenTaskCheckboxFrame')) as CSSStyleRule;
    const controlRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenTaskCheckboxControl')) as CSSStyleRule;
    expect(frameRule.style.getPropertyValue('text-indent')).toBe('0px');
    expect(controlRule.style.getPropertyValue('display')).toBe('grid');
    expect(controlRule.style.getPropertyValue('place-items')).toBe('center');
    expect(controlRule.style.getPropertyValue('width')).toBe('1em');
    expect(controlRule.style.getPropertyValue('inset-inline-start')).toBe('-0.15em');
  });

  test('plans bullets and tasks only for visible ranges', () => {
    const lineCount = 500;
    const source = Array.from({ length: lineCount }, (_, index) => index % 2 === 0
      ? `- item ${index}`
      : `- [ ] task ${index}`,
    ).join('\n');

    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const bullets = unorderedListBulletDescriptors(window.editor);
    const tasks = taskCheckboxDescriptors(window.editor);
    const isVisible = (position: number) => window.editor.visibleRanges.some(range => position >= range.from && position <= range.to);

    expect(bullets.length + tasks.length).toBeLessThan(lineCount);
    expect(bullets.every(descriptor => isVisible(descriptor.from))).toBe(true);
    expect(tasks.every(descriptor => isVisible(descriptor.from))).toBe(true);
  });
});

describe('Blockquote syntax', () => {
  test('replaces GitHub alert markers with icons and normalized titles', () => {
    const source = [
      '> [!NOTE]',
      '> note',
      '',
      '> [!tip]',
      '> tip',
      '',
      '> [!IMPORTANT]',
      '> important',
      '',
      '> [!warning]',
      '> warning',
      '',
      '> [!CAUTION]',
      '> caution',
      '',
      'Body',
    ].join('\n');

    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const alerts = [...window.editor.dom.querySelectorAll<HTMLElement>('.cm-md-syntaxHiddenAlert')];
    expect(alerts.map(alert => alert.dataset.type)).toEqual(['note', 'tip', 'important', 'warning', 'caution']);
    expect(alerts.map(alert => alert.textContent)).toEqual(['Note', 'Tip', 'Important', 'Warning', 'Caution']);
    expect(alerts.every(alert => alert.querySelector('svg')?.getAttribute('viewBox') === '0 0 16 16')).toBe(true);
    expect(alerts.every(alert => alert.querySelector('svg')?.classList.contains('octicon'))).toBe(true);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('recognizes only the first standalone marker in each parsed blockquote', () => {
    const source = [
      '[!NOTE]',
      '',
      '> intro',
      '>',
      '> [!WARNING]',
      '> later',
      '',
      '> [!CUSTOM]',
      '',
      '> [!TIP] custom title',
      '',
      '> [!CAUTION',
      '',
      '> - preceding list',
      '>',
      '> [!NOTE]',
      '> later paragraph',
      '',
      '> outer',
      '>> [!IMPORTANT]',
      '>> nested',
      '',
      'Body',
    ].join('\n');

    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const alerts = [...window.editor.dom.querySelectorAll<HTMLElement>('.cm-md-syntaxHiddenAlert')];
    expect(alerts.map(alert => alert.dataset.type)).toEqual(['important']);
  });

  test('reveals an alert marker only when the selection intersects it', () => {
    const source = '> [!TIP]\n> Discover more.\n\nBody';
    const markerFrom = source.indexOf('[!TIP]');
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenAlert')?.textContent).toBe('Tip');

    window.editor.dispatch({ selection: { anchor: source.indexOf('Discover') } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenAlert')?.textContent).toBe('Tip');

    window.editor.dispatch({ selection: { anchor: markerFrom + 2 } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenAlert')).toBeNull();
    expect(editorText()).toContain('[!TIP]');

    window.editor.dispatch({ selection: { anchor: markerFrom + '[!TIP]'.length, head: source.indexOf('Discover') } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenAlert')?.textContent).toBe('Tip');
  });

  test('handles alert line wrapping and uses type colors', () => {
    const source = '> [!TIP]\n> Discover more.\n\nBody';
    const hangingIndent = EditorView.decorations.of(Decoration.set([
      Decoration.line({
        class: 'cm-md-contentIndent',
        attributes: { style: 'text-indent: -20px; margin-inline-start: 20px;' },
      }).range(0),
    ]));

    const darkTheme = EditorView.theme({}, { dark: true });
    editor.setUp(source, [EditorView.lineWrapping, hangingIndent, darkTheme, hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const alert = window.editor.dom.querySelector<HTMLElement>('.cm-md-syntaxHiddenAlert');
    const icon = alert?.querySelector<HTMLElement>('.cm-md-syntaxHiddenAlertIcon');
    expect(alert).not.toBeNull();
    expect(getComputedStyle(alert as HTMLElement).textIndent).toBe('0px');
    expect(getComputedStyle(alert as HTMLElement).gap).toBe('0.4em');
    expect(getComputedStyle(alert as HTMLElement).fontFamily).toContain('system-ui');
    expect(getComputedStyle(alert as HTMLElement).fontWeight).toBe('500');
    expect(getComputedStyle(alert as HTMLElement).color).toBe('#3fb950');
    expect(getComputedStyle(icon as HTMLElement).color).toBe('#3fb950');
    expect(getComputedStyle(icon as HTMLElement).width).toBe('16px');
    expect(getComputedStyle(icon?.querySelector('svg') as SVGElement).fill).toBe('currentColor');
  });

  test('paints source opacity', () => {
    const source = '> quote\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const marker = window.editor.dom.querySelector<HTMLElement>('.cm-md-syntaxHiddenQuoteMark');
    if (marker === null) {
      throw new Error('Expected hidden quote syntax');
    }

    const line = marker.closest<HTMLElement>('.cm-line');
    if (line === null) {
      throw new Error('Expected hidden quote line');
    }

    line.style.opacity = '0.25';
    vi.spyOn(line, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 20, 100, 30));
    vi.spyOn(window.editor, 'coordsAtPos').mockReturnValue({
      left: 10,
      right: 20,
      top: 20,
      bottom: 50,
    });

    const bar = blockquoteBarMarkers(window.editor)[0].draw();
    expect(bar.style.width).toBe('3px');
    expect(bar.style.opacity).toBe('0.25');
  });

  test('keeps multiline bars while editing text and reveals an active prefix', () => {
    const source = '> one\n> two\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(hiddenTexts()).toEqual(['>', '>']);
    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(2);
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: 8 } });
    expect(hiddenTexts()).toEqual(['>', '>']);
    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(2);

    window.editor.dispatch({ selection: { anchor: 6 } });
    expect(hiddenTexts()).toEqual(['>']);
    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(1);
  });

  test('reveals nested prefixes independently', () => {
    const source = '> outer\n>> nested\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts().join('')).toBe('>>>');
    const nestedLine = source.indexOf('>> nested');
    expect(blockquoteBarDescriptors(window.editor)
      .filter(bar => bar.line === nestedLine)
      .map(bar => bar.depth)).toEqual([1, 2]);

    window.editor.dispatch({ selection: { anchor: source.indexOf('outer') } });
    expect(hiddenTexts().join('')).toBe('>>>');
    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(3);

    window.editor.dispatch({
      selection: {
        anchor: source.indexOf('nested'),
        head: source.indexOf('nested') + 'nested'.length,
      },
    });

    expect(hiddenTexts().join('')).toBe('>>>');
    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(3);

    window.editor.dispatch({ selection: { anchor: nestedLine } });
    expect(blockquoteBarDescriptors(window.editor)
      .filter(bar => bar.line === nestedLine)
      .map(bar => bar.depth)).toEqual([2]);

    window.editor.dispatch({ selection: { anchor: nestedLine + 2 } });
    expect(blockquoteBarDescriptors(window.editor)
      .filter(bar => bar.line === nestedLine)
      .map(bar => bar.depth)).toEqual([1]);
  });

  test('replaces a complete prefix while typing', () => {
    editor.setUp('', hiddenSyntaxExtension);

    window.editor.dispatch({ changes: { from: 0, insert: '>' }, selection: { anchor: 1 } });
    expect(hiddenText()).toBeUndefined();
    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(0);

    window.editor.dispatch({ changes: { from: 1, insert: ' ' }, selection: { anchor: 2 } });
    expect(hiddenText()).toBe('>');
    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(1);

    window.editor.dispatch({ changes: { from: 2, insert: 'quote' }, selection: { anchor: 7 } });
    expect(hiddenText()).toBe('>');
    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(1);
  });

  test('anchors the bar after a containing list marker', () => {
    const source = '- > quoted\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(hiddenTexts()).toEqual(['-', '>']);
    expect(blockquoteBarDescriptors(window.editor)).toEqual([{
      line: 0,
      ownerFrom: 2,
      anchor: 2,
      depth: 1,
    }]);
  });

  test('replaces marker-only lines with bars', () => {
    const source = '> quote\n>\n> continuation\nlazy continuation\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(hiddenTexts()).toEqual(['>', '>', '>']);
    const blankQuote = [...window.editor.dom.querySelectorAll('.cm-line')]
      .find(line => line.textContent === '>');
    expect(blankQuote?.querySelector('.cm-md-syntaxHiddenSource')).not.toBeNull();

    const bars = blockquoteBarDescriptors(window.editor);
    expect(bars.some(bar => bar.line === source.indexOf('>\n') && bar.anchor === source.indexOf('>\n'))).toBe(true);
    expect(bars.some(bar => bar.line === source.indexOf('lazy continuation') && bar.anchor === undefined)).toBe(true);
  });

  test('draws the bar when an inactive quote ends the document', () => {
    editor.setUp('Body\n\n> quote', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 0 } });

    expect(blockquoteBarDescriptors(window.editor)).toHaveLength(1);
  });

  test('plans bars only for viewport lines', () => {
    const lineCount = 500;
    const source = Array.from({ length: lineCount }, (_, index) => `> quote ${index}`).join('\n');
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const visibleLines = new Set(window.editor.viewportLineBlocks
      .map(block => window.editor.state.doc.lineAt(block.from).from));
    const bars = blockquoteBarDescriptors(window.editor);

    expect(new Set(bars.map(bar => bar.line))).toEqual(visibleLines);
    expect(bars.length).toBeLessThan(lineCount);
  });

  test('plans lazy-line bars when the viewport starts inside a quote', () => {
    const source = '> first\nlazy second\nlazy third\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const state = window.editor.state;
    const visibleLines = [state.doc.line(2), state.doc.line(3)];
    const view = {
      state,
      visibleRanges: [{ from: visibleLines[0].from, to: visibleLines[1].to }],
      viewportLineBlocks: visibleLines.map(line => ({ from: line.from })),
    } as unknown as EditorView;

    expect(blockquoteBarDescriptors(view)).toEqual(visibleLines.map(line => ({
      line: line.from,
      ownerFrom: 0,
      anchor: undefined,
      depth: 1,
    })));
  });

  test('keeps separator spaces in the text flow', () => {
    const source = '>   indented\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts()).toEqual(['>']);
  });

  test('reveals at a caret boundary but not an adjacent selection boundary', () => {
    const source = '>one\n\n> two';
    const secondQuote = source.indexOf('> two');
    editor.setUp(source, hiddenSyntaxExtension);

    window.editor.dispatch({ selection: { anchor: 1, head: secondQuote } });
    expect(hiddenTexts()).toEqual(['>', '>']);
    expect(blockquoteBarDescriptors(window.editor).map(bar => bar.ownerFrom)).toEqual([0, secondQuote]);

    window.editor.dispatch({ selection: { anchor: secondQuote } });
    expect(hiddenTexts()).toEqual(['>']);
    expect(blockquoteBarDescriptors(window.editor).map(bar => bar.ownerFrom)).toEqual([0]);
  });

  test('combines with line numbers', () => {
    const source = '> quote\n\nBody';
    editor.setUp(source, [
      lineNumbers(),
      hiddenSyntaxExtension,
    ]);

    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenTexts()).toEqual(['>']);
    expect(window.editor.dom.querySelector('.cm-lineNumbers')).not.toBeNull();

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    expect(cssRules.some(rule => rule.cssText.includes('.cm-md-syntaxHiddenQuoteMark + *::before')
      && rule.cssText.includes('display: none'))).toBe(true);

    window.editor.dispatch({ selection: { anchor: 3 } });
    expect(hiddenTexts()).toEqual(['>']);

    window.editor.dispatch({ selection: { anchor: 1 } });
    expect(hiddenTexts()).toEqual([]);
  });

  test('aligns the bar with line padding under wrapped quote indentation', () => {
    const source = '> quote\n\nBody';
    const hangingIndent = EditorView.decorations.of(Decoration.set([
      Decoration.line({
        class: 'cm-md-contentIndent',
        attributes: { style: 'text-indent: -20px; margin-inline-start: 20px;' },
      }).range(0),
    ]));

    editor.setUp(source, [hangingIndent, hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const quoteLine = window.editor.dom.querySelector('.cm-line.cm-md-contentIndent');
    expect(quoteLine?.getAttribute('style')).toContain('text-indent: -');
    expect(quoteLine?.querySelector('.cm-md-syntaxHiddenQuoteMark')).not.toBeNull();

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    const blockquoteRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenBlockquoteBar')) as CSSStyleRule;
    expect(blockquoteRule.style.getPropertyValue('pointer-events')).toBe('none');
    const layerRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenBlockquoteLayer')) as CSSStyleRule;
    expect(layerRule.style.getPropertyValue('z-index')).toBe('0');
    expect(layerRule.style.getPropertyPriority('z-index')).toBe('important');

    const hiddenQuoteRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenQuoteMark')) as CSSStyleRule;
    expect(hiddenQuoteRule.style.getPropertyValue('font-size')).toBe('inherit');
    expect(hiddenQuoteRule.style.getPropertyPriority('font-size')).toBe('important');
    expect(hiddenQuoteRule.style.getPropertyValue('visibility')).toBe('hidden');
  });
});

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

  test('does not reveal the next heading at a selection boundary', () => {
    editor.setUp('# One\n# Two', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: 2, head: 6 } });
    expect(editorText()).toBe('# One\nTwo');
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

  test('reveals at a caret boundary but not an adjacent selection boundary', () => {
    const source = 'Heading\n=======\nBody';
    const boundary = source.indexOf('\nBody');
    editor.setUp(source, hiddenSyntaxExtension);
    const underline = () => [...window.editor.dom.querySelectorAll('.cm-line')]
      .find(line => line.textContent === '=======');

    window.editor.dispatch({ selection: { anchor: boundary } });
    expect(underline()?.classList.contains('cm-md-syntaxHiddenSetextUnderline')).toBe(false);

    window.editor.dispatch({ selection: { anchor: boundary, head: source.length } });
    expect(underline()?.classList.contains('cm-md-syntaxHiddenSetextUnderline')).toBe(true);
  });

  test('suppresses pseudo-elements inside the collapsed underline line', () => {
    const source = 'Heading\n=======\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    expect(cssRules.some(rule => rule.cssText.includes('.cm-md-syntaxHiddenSetextUnderline *::before') && rule.cssText.includes('display: none'))).toBe(true);
  });
});

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
