// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import mermaidPackage from 'mermaid/package.json';
import type * as Settings from '../src/support/settings';
import { applyStyles, renderMarkdown } from '../src/render';
import { generateStaticHtml, renderStaticHtml, saveStyledHtml } from '../src/view';

const mocks = vi.hoisted(() => ({
  getText: vi.fn(() => '# Hello'),
  getFileInfo: vi.fn(async () => ({ filePath: '/example.md' })),
  showSavePanel: vi.fn(),
  settings: { styledHtmlColorScheme: 'auto' },
}));

vi.mock('markedit-api', () => ({
  MarkEdit: {
    editorAPI: { getText: mocks.getText },
    getFileInfo: mocks.getFileInfo,
    showSavePanel: mocks.showSavePanel,
  },
}));

vi.mock('../src/support/settings', async importOriginal => ({
  ...await importOriginal<typeof Settings>(),
  get styledHtmlColorScheme() { return mocks.settings.styledHtmlColorScheme; },
}));

const mermaidMarkdown = '```mermaid\ngraph TD\n  A --> B\n```';
const mermaidURL = `https://cdn.jsdelivr.net/npm/mermaid@${mermaidPackage.version}/dist/mermaid.esm.min.mjs`;

function scripts(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.querySelectorAll('script');
}

beforeEach(() => {
  mocks.getText.mockReturnValue('# Hello');
  mocks.getFileInfo.mockResolvedValue({ filePath: '/example.md' });
  mocks.showSavePanel.mockClear();
  mocks.settings.styledHtmlColorScheme = 'auto';
});

describe('styled HTML remote scripts', () => {
  it.each([
    '# Hello',
    'The word mermaid is ordinary text.',
    '```html\n<div class="mermaid">graph TD</div>\n```',
    '<!-- <div class="mermaid">graph TD</div> -->',
    '<div class="not-mermaid">Plain content</div>',
    '$E = mc^2$',
  ])('does not add scripts when no Mermaid element is present: %s', async markdown => {
    const html = await applyStyles(await renderMarkdown(markdown));
    expect(scripts(html)).toHaveLength(0);
    expect(html).not.toContain(mermaidURL);
    expect(html).toContain('<style>');
  });

  it.each([
    mermaidMarkdown,
    "<div class='diagram mermaid'>graph TD\nA --> B</div>",
    `${mermaidMarkdown}\n\n${mermaidMarkdown}`,
  ])('adds one exact-version module import for Mermaid elements: %s', async markdown => {
    const html = await applyStyles(await renderMarkdown(markdown));
    const modules = scripts(html);
    expect(modules).toHaveLength(1);
    expect(modules[0].type).toBe('module');
    expect(modules[0].textContent).toContain(`import mermaid from "${mermaidURL}"`);
    expect(html).not.toContain('mermaid@11/');
  });

  it.each(['auto', 'light', 'dark'])('preserves %s color scheme initialization', async scheme => {
    mocks.settings.styledHtmlColorScheme = scheme;
    const html = await applyStyles(await renderMarkdown(mermaidMarkdown));
    const script = scripts(html)[0].textContent;
    expect(script).toContain(`if (${scheme === 'auto'})`);
    expect(script).toContain(`const isDark = ${scheme === 'dark'}`);
    expect(script).toContain('darkMode.addEventListener("change"');
    expect(script).toContain('mermaid.initialize');
  });
});

describe('HTML export entry points', () => {
  it('applies conditional loading to both HTML-generation APIs', async () => {
    expect(scripts(await generateStaticHtml(true))).toHaveLength(0);
    expect(scripts(await renderStaticHtml('# Hello', true))).toHaveLength(0);

    mocks.getText.mockReturnValue(mermaidMarkdown);
    expect(await generateStaticHtml(true)).toContain(mermaidURL);
    expect(await renderStaticHtml(mermaidMarkdown, true)).toContain(mermaidURL);
    expect(scripts(await generateStaticHtml(false))).toHaveLength(0);
    expect(scripts(await renderStaticHtml(mermaidMarkdown, false))).toHaveLength(0);
  });

  it.each(['mmd', 'mermaid'])('includes the loader for standalone .%s exports', async extension => {
    mocks.getText.mockReturnValue('graph TD\nA --> B');
    mocks.getFileInfo.mockResolvedValue({ filePath: `/example.${extension}` });
    expect(await generateStaticHtml(true)).toContain(mermaidURL);
  });

  it('does not add scripts to standalone math exports', async () => {
    mocks.getText.mockReturnValue('E = mc^2');
    mocks.getFileInfo.mockResolvedValue({ filePath: '/example.tex' });
    const html = await generateStaticHtml(true);
    expect(html).toContain('class="katex"');
    expect(scripts(html)).toHaveLength(0);
  });

  it('saves the same pinned loader in styled HTML', async () => {
    mocks.getText.mockReturnValue(mermaidMarkdown);
    saveStyledHtml();
    await vi.waitFor(() => expect(mocks.showSavePanel).toHaveBeenCalledWith({
      fileName: 'example.html',
      string: expect.stringContaining(mermaidURL),
    }));
  });
});
