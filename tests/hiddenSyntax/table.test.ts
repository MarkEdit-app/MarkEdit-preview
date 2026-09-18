// @vitest-environment jsdom
import './support';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { EditorSelection, EditorState } from '@codemirror/state';
import { EditorView, keymap, runScopeHandlers } from '@codemirror/view';
import { standardKeymap } from '@codemirror/commands';
import { codeFolding, foldEffect, unfoldEffect } from '@codemirror/language';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { TableWidget } from '../../src/hiddenSyntax/components/table';
import * as renderer from '../../src/render';
import * as editor from '../support/editor';

const editorConfig = vi.hoisted(() => ({ theme: 'github-light' }));
vi.mock('markedit-api', () => ({ MarkEdit: { editorConfig } }));
beforeEach(() => { editorConfig.theme = 'github-light'; });

const table = '| Name | Value |\n| :--- | ---: |\n| **bold** | [link][target] |';
const source = `${table}\n\nAfter\n\n[target]: https://example.com`;
const widget = () => window.editor.dom.querySelector('.cm-md-syntaxHiddenTable');
const renderedTable = () => widget()?.shadowRoot?.querySelector('table');

function setUp(text = source) {
  editor.setUp(text, [hiddenSyntaxExtension, codeFolding(), EditorState.allowMultipleSelections.of(true)]);
  window.editor.dispatch({ selection: { anchor: text.length } });
}

describe('Hidden tables', () => {
  test('does not leave an empty source line before a rendered table', async () => {
    setUp();
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    const lines = [...window.editor.contentDOM.querySelectorAll('.cm-line')];
    expect(lines.some(line => window.editor.posAtDOM(line) === 0)).toBe(false);
  });

  test.each([
    ['rose-pine-dawn', false, '#faf4ed', '#575279'],
    ['cobalt', true, '#193549', '#e1efff'],
    ['github-light', false, '#ffffff', '#1f2328'],
  ] as const)('uses the %s editor palette', (name, isDark, background, foreground) => {
    editorConfig.theme = name;
    editor.setUp(source, [hiddenSyntaxExtension, EditorView.darkTheme.of(isDark)]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const css = widget()?.shadowRoot?.querySelector('style')?.textContent;
    expect(css).toContain(`--bgColor-default: ${background}`);
    expect(css).toContain(`--fgColor-default: ${foreground}`);
  });

  test('updates the palette in place and stops observing after destruction', () => {
    editorConfig.theme = 'cobalt';
    editor.setUp(source, [hiddenSyntaxExtension, EditorView.darkTheme.of(true)]);
    window.editor.dispatch({ selection: { anchor: source.length } });
    const container = widget();
    const theme = container?.shadowRoot?.querySelector('style');

    editorConfig.theme = 'dracula';
    window.dispatchEvent(new Event('editor-colors-changed'));
    expect(widget()).toBe(container);
    expect(theme?.textContent).toContain('--bgColor-default: #282a36');

    window.editor.dispatch({ selection: { anchor: 0 } });
    editorConfig.theme = 'cobalt';
    window.dispatchEvent(new Event('editor-colors-changed'));
    expect(widget()).toBeNull();
    expect(theme?.textContent).toContain('--bgColor-default: #282a36');
  });

  test('renders preview formatting and references without changing source', async () => {
    setUp();
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());

    expect(renderedTable()?.querySelector('strong')?.textContent).toBe('bold');
    expect(renderedTable()?.querySelector('a')?.getAttribute('href')).toBe('https://example.com');
    expect(renderedTable()?.querySelectorAll('th')[1].style.textAlign).toBe('right');
    expect(widget()?.shadowRoot?.querySelector('style')?.textContent).toContain('.markdown-body table');
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test.each([
    ['![photo](images/photo.png)', 'image-loader://images/photo.png'],
    ['<img src="/tmp/photo.png">', 'image-loader:///tmp/photo.png'],
    ['![photo](https://example.com/photo.png)', 'https://example.com/photo.png'],
    ['<img src="data:image/png;base64,AA==">', 'data:image/png;base64,AA=='],
  ])('resolves table image URLs: %s', async (image, expected) => {
    setUp(`| Image |\n| --- |\n| ${image} |\n\nAfter`);
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    expect(renderedTable()?.querySelector('img')?.getAttribute('src')).toBe(expected);
  });

  test('preserves rendered tables and avoids parsing for unrelated edits', async () => {
    const render = vi.spyOn(renderer, 'renderTableBlocks');
    setUp();
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    const container = widget();
    const rendered = renderedTable();
    render.mockClear();

    window.editor.dispatch({ changes: { from: source.indexOf('After'), insert: 'More ' } });
    expect(widget()).toBe(container);
    expect(renderedTable()).toBe(rendered);

    window.editor.dispatch({ changes: { from: 0, insert: 'Before\n\n' } });
    await vi.waitFor(() => expect(renderedTable()?.querySelector('strong')?.textContent).toBe('bold'));
    expect(render).not.toHaveBeenCalled();

    renderedTable()?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true, cancelable: true }));
    expect(widget()).toBeNull();
    expect(window.editor.state.selection.main.head).toBe('Before\n\n'.length);
  });

  test('refreshes changed table content', async () => {
    setUp();
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    const from = source.indexOf('bold');
    window.editor.dispatch({ changes: { from, to: from + 4, insert: 'updated' } });
    await vi.waitFor(() => expect(renderedTable()?.querySelector('strong')?.textContent).toBe('updated'));
  });

  test('finishes a pending render after the table moves', async () => {
    let finish: (tables: Awaited<ReturnType<typeof renderer.renderTableBlocks>>) => void = () => {};
    const pending = new Promise<Awaited<ReturnType<typeof renderer.renderTableBlocks>>>(resolve => { finish = resolve; });
    const render = vi.spyOn(renderer, 'renderTableBlocks').mockReturnValue(pending);
    setUp();

    window.editor.dispatch({ changes: { from: 0, insert: 'Before\n\n' } });
    finish([{ fromLine: 1, toLine: 3, html: '<table><tr><td>Ready</td></tr></table>' }]);

    await vi.waitFor(() => expect(renderedTable()?.textContent).toBe('Ready'));
    expect(render).toHaveBeenCalledTimes(1);
  });

  test('reveals source for a secondary selection and restores the table outside', async () => {
    setUp();
    window.editor.dispatch({ selection: EditorSelection.create([
      EditorSelection.cursor(3), EditorSelection.cursor(source.length),
    ], 1) });

    expect(widget()).toBeNull();
    window.editor.dispatch({ selection: { anchor: source.length } });
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test.each(['ArrowRight', 'ArrowLeft'])('%s reveals source at the table boundary', async key => {
    const prefix = 'Before\n\n';
    const text = `${prefix}${source}`;
    editor.setUp(text, [hiddenSyntaxExtension, keymap.of(standardKeymap)]);

    const boundary = key === 'ArrowRight' ? prefix.length : prefix.length + table.length;
    const start = boundary + (key === 'ArrowRight' ? -1 : 1);
    window.editor.dispatch({ selection: { anchor: start } });
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());

    expect(runScopeHandlers(window.editor, new KeyboardEvent('keydown', { key }), 'editor')).toBe(true);
    expect(window.editor.state.selection.main.head).toBe(boundary);
    expect(widget()).toBeNull();
    expect(window.editor.state.doc.toString()).toBe(text);
  });

  test.each([
    ['ArrowUp', false], ['ArrowDown', false],
    ['ArrowUp', true], ['ArrowDown', true],
  ] as const)('preserves CodeMirror table-skipping movement for %s, shift: %s', async (key, shiftKey) => {
    const prefix = 'Before\n\n';
    const text = `${prefix}${source}`;
    editor.setUp(text, [hiddenSyntaxExtension, keymap.of(standardKeymap)]);

    const before = prefix.length - 1;
    const after = prefix.length + table.length + 1;
    const forward = key === 'ArrowDown';
    const start = forward ? before : after;
    const target = forward ? after : before;
    window.editor.dispatch({ selection: { anchor: start } });
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());

    const rendered = renderedTable();
    const range = window.editor.state.selection.main;
    const moved = EditorSelection.cursor(target, forward ? 1 : -1, undefined, 24);
    const move = vi.spyOn(window.editor, 'moveVertically').mockReturnValue(moved);

    expect(runScopeHandlers(window.editor, new KeyboardEvent('keydown', { key, shiftKey }), 'editor')).toBe(true);
    expect(move).toHaveBeenCalledExactlyOnceWith(range, forward);
    expect(window.editor.state.selection.main).toEqual(shiftKey
      ? EditorSelection.range(start, target, moved.goalColumn, undefined, moved.assoc)
      : moved);

    if (shiftKey) {
      expect(widget()).toBeNull();
    } else {
      expect(renderedTable()).toBe(rendered);
    }

    expect(window.editor.state.doc.toString()).toBe(text);
  });

  test('reuses rendered content across repeated source reveal and restore cycles', async () => {
    const render = vi.spyOn(renderer, 'renderTableBlocks');
    setUp();
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    const html = renderedTable()?.outerHTML;

    for (const anchor of [0, source.indexOf('bold'), table.length]) {
      window.editor.dispatch({ selection: { anchor } });
      expect(widget()).toBeNull();
      window.editor.dispatch({ selection: { anchor: source.length } });
      await vi.waitFor(() => expect(renderedTable()?.outerHTML).toBe(html));
    }

    expect(render).toHaveBeenCalledTimes(1);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('reuses a pending render when source is revealed and restored', async () => {
    let finish: (tables: Awaited<ReturnType<typeof renderer.renderTableBlocks>>) => void = () => {};
    const pending = new Promise<Awaited<ReturnType<typeof renderer.renderTableBlocks>>>(resolve => { finish = resolve; });
    const render = vi.spyOn(renderer, 'renderTableBlocks').mockReturnValue(pending);
    setUp();

    const original = widget();
    expect(original).not.toBeNull();

    window.editor.dispatch({ selection: { anchor: 0 } });
    expect(widget()).toBeNull();
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(widget()).not.toBeNull();
    expect(widget()).not.toBe(original);
    finish([{ fromLine: 1, toLine: 3, html: '<table><tr><td>Ready</td></tr></table>' }]);

    await vi.waitFor(() => expect(renderedTable()?.textContent).toBe('Ready'));
    expect(original?.shadowRoot?.querySelector('table')).toBeNull();
    expect(render).toHaveBeenCalledTimes(1);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('invalidates cached references changed while table source is revealed', async () => {
    const render = vi.spyOn(renderer, 'renderTableBlocks');
    setUp();
    await vi.waitFor(() => expect(renderedTable()?.querySelector('a')?.getAttribute('href')).toBe('https://example.com'));
    window.editor.dispatch({ selection: { anchor: 0 } });
    expect(widget()).toBeNull();

    const from = source.indexOf('https://example.com');
    window.editor.dispatch({ changes: { from, to: source.length, insert: 'https://markedit.app' } });
    expect(widget()).toBeNull();
    expect(render).toHaveBeenCalledTimes(1);

    window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });
    await vi.waitFor(() => expect(renderedTable()?.querySelector('a')?.getAttribute('href')).toBe('https://markedit.app'));
    expect(render).toHaveBeenCalledTimes(2);
    expect(window.editor.state.doc.toString()).toBe(source.slice(0, from) + 'https://markedit.app');
  });

  test('clicking a cell reveals the original source without following links', async () => {
    setUp();
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    const event = new MouseEvent('mousedown', { bubbles: true, composed: true, cancelable: true });
    renderedTable()?.querySelector('a')?.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(widget()).toBeNull();
    expect(window.editor.state.selection.main.head).toBe(0);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('reveals a table covered by a selection', () => {
    setUp(`Before\n\n${source}`);
    window.editor.dispatch({ selection: { anchor: 0, head: window.editor.state.doc.length } });
    expect(widget()).toBeNull();
  });

  test('ignores rendering that finishes after source is revealed', async () => {
    setUp();
    let finish: (tables: { fromLine: number; toLine: number; html: string }[]) => void = () => {};
    const pending = new Promise<{ fromLine: number; toLine: number; html: string }[]>(resolve => { finish = resolve; });
    const view = window.editor;
    const delayed = new TableWidget(view.state.doc, 0, table.length, () => pending);
    const dom = delayed.toDOM(view);
    document.body.append(dom);
    dom.remove();
    delayed.destroy(dom);
    view.dispatch({ selection: { anchor: 0 } });
    finish([{ fromLine: 1, toLine: 3, html: '<table><tr><td>Old</td></tr></table>' }]);

    await pending;
    await Promise.resolve();
    expect(dom.shadowRoot?.querySelector('table')).toBeNull();
    expect(widget()).toBeNull();
  });

  test('refreshes references when their definitions change', async () => {
    setUp();
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    const from = source.indexOf('https://example.com');
    window.editor.dispatch({ changes: { from, to: source.length, insert: 'https://markedit.app' } });
    await vi.waitFor(() => expect(renderedTable()?.querySelector('a')?.getAttribute('href')).toBe('https://markedit.app'));
  });

  test('sanitizes HTML and removes interactive controls', async () => {
    setUp('| Content |\n| --- |\n| <img src="invalid" onerror="alert(1)"><script>alert(1)</script><input autofocus><a href="javascript:alert(1)">bad</a> |\n\nAfter');
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
    expect(renderedTable()?.querySelector('script, input, [onerror], [autofocus]')).toBeNull();
    expect(renderedTable()?.querySelector('a')?.hasAttribute('href')).toBe(false);
    expect(renderedTable()?.querySelector('a')?.tabIndex).toBe(-1);
  });

  test.each([
    '> | Name |\n> | --- |\n> | Value |',
    '- | Name |\n  | --- |\n  | Value |',
    '| Name |\n| Value |',
    '```\n| Name |\n| --- |\n| Value |\n```',
  ])('keeps unsupported table source: %s', text => {
    setUp(`${text}\n\nAfter`);
    expect(widget()).toBeNull();
  });

  test('renders tables after front matter', async () => {
    setUp(`---\ntitle: Example\n---\n\n${source}`);
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
  });

  test('keeps folded source until unfolded', async () => {
    setUp();
    const range = { from: window.editor.state.doc.line(1).to, to: table.length };
    window.editor.dispatch({ effects: foldEffect.of(range) });
    expect(widget()).toBeNull();
    window.editor.dispatch({ effects: unfoldEffect.of(range) });
    await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
  });

  test.each([false, true])('falls back at the current position after a pending render fails, rejected: %s', async rejected => {
    let finish: () => void = () => {};
    const pending = new Promise<Awaited<ReturnType<typeof renderer.renderTableBlocks>>>((resolve, reject) => {
      finish = () => rejected ? reject(new Error('Unavailable')) : resolve([]);
    });

    vi.spyOn(renderer, 'renderTableBlocks').mockReturnValue(pending);
    setUp();

    expect(widget()).not.toBeNull();
    window.editor.dispatch({ changes: { from: 0, insert: 'Before\n\n' } });
    finish();
    await vi.waitFor(() => expect(widget()).toBeNull());
  });

  test('supports lite mode without rendering math or Mermaid blocks', async () => {
    vi.stubGlobal('__FULL_BUILD__', false);
    try {
      setUp(`${source}\n\n$$x$$\n\n\`\`\`mermaid\ngraph TD\n\`\`\`\n\nEnd`);
      await vi.waitFor(() => expect(renderedTable()).toBeTruthy());
      expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBlockMath, .cm-md-syntaxHiddenMermaid')).toBeNull();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
