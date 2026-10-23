// @vitest-environment jsdom
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import mermaid from 'mermaid';
import type * as Settings from '../src/support/settings';
import { loadMermaid } from '../src/features/mermaid';
import { renderMermaidSVG } from '../src/render';

const themes = vi.hoisted<{ light: typeof Settings.mermaidLightTheme; dark: typeof Settings.mermaidDarkTheme }>(() => ({
  light: 'default',
  dark: 'dark',
}));

vi.mock('../src/support/settings', async importOriginal => ({
  ...await importOriginal<typeof Settings>(),
  get mermaidLightTheme() { return themes.light; },
  get mermaidDarkTheme() { return themes.dark; },
}));

beforeAll(() => {
  // jsdom has no SVG text measurement; exercise the real renderer with fixed geometry
  Object.defineProperties(SVGElement.prototype, {
    getBBox: { configurable: true, value: () => ({ x: 0, y: 0, width: 100, height: 20 }) },
    getComputedTextLength: { configurable: true, value: () => 100 },
  });
});

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

afterAll(() => {
  Reflect.deleteProperty(SVGElement.prototype, 'getBBox');
  Reflect.deleteProperty(SVGElement.prototype, 'getComputedTextLength');
});

function diagramStyles(svg: string) {
  const container = document.createElement('div');
  container.innerHTML = svg;

  const styles = container.querySelector('svg style')?.textContent;
  if (!styles) {
    throw new Error('Expected rendered SVG styles');
  }

  return styles.replace(/markedit-mermaid-\d+/g, 'diagram');
}

describe('Mermaid 12 renderer', () => {
  test.each([
    ['flowchart', 'flowchart TD\nA[Start] --> B[End]'],
    ['class', 'classDiagram\nAnimal <|-- Duck'],
    ['state', 'stateDiagram-v2\n[*] --> Ready\nReady --> [*]'],
  ])('renders a %s diagram with the bundled default layout', async (_type, source) => {
    const svg = await renderMermaidSVG(source);
    const container = document.createElement('div');
    container.innerHTML = svg;
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelector('.error-icon')).toBeNull();
    expect(svg).not.toContain('Syntax error');
  });

  test('uses legacy themes and restores the light theme after dark mode', async () => {
    let darkMode = false;
    vi.stubGlobal('matchMedia', () => ({ matches: darkMode }));
    const initialize = vi.spyOn(mermaid, 'initialize');
    expect(await loadMermaid()).toBe(mermaid);

    const source = 'flowchart TD\nA --> B';
    const lightStyles = diagramStyles(await renderMermaidSVG(source));
    initialize.mockClear();

    darkMode = true;
    const darkStyles = diagramStyles(await renderMermaidSVG(source));
    expect(initialize).toHaveBeenLastCalledWith({ theme: 'dark' });
    expect(darkStyles).not.toBe(lightStyles);

    darkMode = false;
    expect(diagramStyles(await renderMermaidSVG(source))).toBe(lightStyles);
    expect(initialize).toHaveBeenLastCalledWith({ theme: 'default' });
    expect(initialize).toHaveBeenCalledTimes(2);
  });

  test('supports per-diagram opt-in to the previous layout and appearance', async () => {
    const svg = await renderMermaidSVG('---\nconfig:\n  layout: dagre\n  theme: default\n  look: classic\n---\nflowchart TD\nA --> B');
    expect(svg).toContain('<svg');
    expect(svg).not.toContain('Syntax error');
  });

  test('renders with opt-in Redux themes when switching color schemes', async () => {
    themes.light = 'redux-color';
    themes.dark = 'redux-dark-color';

    let darkMode = true;
    vi.stubGlobal('matchMedia', () => ({ matches: darkMode }));
    const initialize = vi.spyOn(mermaid, 'initialize');

    try {
      const styles = new Map<boolean, string>();
      for (const isDark of [true, false, true]) {
        darkMode = isDark;
        const svg = await renderMermaidSVG('flowchart TD\nA --> B');
        const theme = isDark ? themes.dark : themes.light;
        expect(initialize).toHaveBeenLastCalledWith({ theme });

        const expected = await renderMermaidSVG(`---\nconfig:\n  theme: ${theme}\n---\nflowchart TD\nA --> B`);
        expect(diagramStyles(svg)).toBe(diagramStyles(expected));
        styles.set(isDark, diagramStyles(svg));
      }

      expect(styles.get(true)).not.toBe(styles.get(false));
      const svg = await renderMermaidSVG('---\nconfig:\n  theme: neutral\n---\nflowchart TD\nA --> B');
      expect(diagramStyles(svg)).not.toBe(styles.get(true));
      expect(diagramStyles(await renderMermaidSVG('flowchart TD\nA --> B'))).toBe(styles.get(true));
    } finally {
      themes.light = 'default';
      themes.dark = 'dark';
      darkMode = false;
      await loadMermaid();
    }
  });
});
