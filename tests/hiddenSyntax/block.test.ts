// @vitest-environment happy-dom
import { mermaidMocks, hiddenTexts, editorText } from './support';
import { describe, expect, test, vi } from 'vitest';
import type { EditorView } from '@codemirror/view';
import { createHiddenSyntaxExtension, hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { BlockMathWidget } from '../../src/hiddenSyntax/components/math';
import { MermaidWidget } from '../../src/hiddenSyntax/components/mermaid';
import { renderMermaidSVG } from '../../src/render';
import * as editor from '../support/editor';

test('keeps HTML source visible', () => {
  const source = '<b>inline</b>\n\n<div>block</div>\n\nAfter';
  editor.setUp(source, hiddenSyntaxExtension);
  window.editor.dispatch({ selection: { anchor: source.length } });

  expect(hiddenTexts()).toEqual([]);
  expect(editorText()).toBe(source);
  expect(window.editor.state.doc.toString()).toBe(source);
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
