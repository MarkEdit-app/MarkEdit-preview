// @vitest-environment happy-dom
import { hiddenText, hiddenTexts, editorText } from './support';
import { describe, expect, test, vi } from 'vitest';
import { Decoration, EditorView, lineNumbers } from '@codemirror/view';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { blockquoteBarDescriptors, blockquoteBarMarkers } from '../../src/hiddenSyntax/components/bar';
import * as editor from '../support/editor';

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

  test('reveals an alert marker when the selection touches it', () => {
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
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenAlert')).toBeNull();
    expect(editorText()).toContain('[!TIP]');
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
    expect(getComputedStyle(alert as HTMLElement).height).toBe(getComputedStyle(icon as HTMLElement).height);
    expect(getComputedStyle(alert as HTMLElement).verticalAlign).toBe('middle');
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

  test('reveals at caret and selection boundaries', () => {
    const source = '>one\n\n> two';
    const secondQuote = source.indexOf('> two');
    editor.setUp(source, hiddenSyntaxExtension);

    window.editor.dispatch({ selection: { anchor: 1, head: secondQuote } });
    expect(hiddenTexts()).toEqual([]);
    expect(blockquoteBarDescriptors(window.editor)).toEqual([]);

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
