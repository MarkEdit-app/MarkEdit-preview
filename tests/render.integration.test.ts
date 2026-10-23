// @vitest-environment happy-dom
import { Script } from 'node:vm';
import { build, loadConfigFromFile } from 'vite';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import type * as rendererModule from '../src/render';

type Renderer = typeof rendererModule;

const markdown = [
  '---',
  'title: Plugin integration',
  '---',
  '',
  '# **Shared** `heading`',
  '',
  '# **Shared** `heading`',
  '',
  '[Internal](#shared-heading-1) and example.com',
  '',
  '> [!NOTE]',
  '> Alert with **bold text**, $x^2$, and a footnote[^note].',
  '',
  '- [ ] Pending **task**',
  '- [x] Completed [task](https://example.com)',
  '',
  '| Math | Reference |',
  '| --- | --- |',
  '| $x^2$ | [External][target] |',
  '',
  '```javascript',
  'const answer = 42;',
  '```',
  '',
  '```',
  '<b>plain code</b>',
  '```',
  '',
  '$$',
  'x^2 + y^2 = z^2',
  '$$',
  '',
  '```mermaid',
  'graph TD',
  '  A --> B',
  '```',
  '',
  '[^note]: Footnote with [external link](https://example.org) and $y^2$.',
  '',
  '[target]: https://example.net',
].join('\n');

function parseHTML(html: string) {
  const root = document.createElement('div');
  root.innerHTML = html;
  return root;
}

describe.each([false, true])('bundled renderer integration (lite: %s)', lite => {
  let script: Script;

  beforeAll(async () => {
    vi.stubEnv('LITE_BUILD', String(lite));
    try {
      const loaded = await loadConfigFromFile({ command: 'build', mode: 'production' });
      if (loaded === null) {
        throw new Error('Vite configuration was not found');
      }

      const result = await build({
        ...loaded.config,
        configFile: false,
        logLevel: 'warn',
        plugins: loaded.config.plugins?.filter(plugin =>
          !plugin || !('name' in plugin) || plugin.name !== 'markedit-copy-dist-file',
        ),
        build: {
          ...loaded.config.build,
          write: false,
          lib: {
            entry: 'src/render.ts',
            formats: ['cjs'],
          },
        },
      });

      if ('on' in result) {
        throw new Error('Expected a non-watching build');
      }

      const outputs = Array.isArray(result) ? result : [result];
      const files = outputs.flatMap(output => output.output);
      expect(files).toHaveLength(1);

      const chunk = files[0];
      if (chunk.type !== 'chunk') {
        throw new Error('Expected a JavaScript bundle');
      }

      script = new Script(chunk.code);
    } finally {
      vi.unstubAllEnvs();
    }
  }, 120_000);

  function createRenderer(fullHost: boolean, settings: Record<string, unknown> = {}): Renderer {
    const module = { exports: {} };
    script.runInNewContext({
      module,
      exports: module.exports,
      navigator: { language: 'en' },
      console,
      require: (id: string) => {
        if (id !== 'markedit-api') {
          throw new Error(`Unexpected renderer external: ${id}`);
        }

        return {
          MarkEdit: {
            ...(fullHost ? { addExtension: () => {} } : {}),
            userSettings: { 'extension.markeditPreview': settings },
          },
        };
      },
    });

    return module.exports as Renderer;
  }

  test.each([false, true])('renders interacting plugins (full host: %s)', async fullHost => {
    const renderer = createRenderer(fullHost);
    const root = parseHTML(await renderer.renderMarkdown(markdown));

    expect(root.querySelector('.markdown-frontMatter')?.textContent).toContain('Plugin integration');
    expect([...root.querySelectorAll('h1')].map(node => node.id)).toEqual(['shared-heading', 'shared-heading-1']);
    expect(await renderer.headingLineForAnchor(markdown, '#shared-heading-1')).toBe(6);

    const internal = root.querySelector('a[href="#shared-heading-1"]');
    expect(internal).not.toBeNull();
    expect(internal?.hasAttribute('target')).toBe(false);
    expect(root.querySelector('a[href="http://example.com"]')?.getAttribute('target')).toBe('_blank');
    expect(root.querySelector('td a')?.getAttribute('href')).toBe('https://example.net');

    root.querySelectorAll('a[href^="http"]').forEach(link => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener');
    });

    const alert = root.querySelector('.markdown-alert-note');
    expect(alert?.querySelector('strong')?.textContent).toBe('bold text');

    const footnoteLink = alert?.querySelector('a[href="#fn1"]');
    expect(footnoteLink?.id).toBe('fnref1');
    expect(root.querySelector('#fn1')?.textContent).toContain('Footnote with');
    expect(root.querySelector('#fn1 a[href="#fnref1"]')).not.toBeNull();

    const tasks = [...root.querySelectorAll<HTMLInputElement>('input.task-list-item-checkbox')];
    expect(tasks.map(task => task.checked)).toEqual([false, true]);
    expect(tasks.map(task => task.disabled)).toEqual([!fullHost, !fullHost]);
    expect(tasks.every(task => task.closest('label') !== null)).toBe(true);
    expect(root.querySelector('li.task-list-item')?.getAttribute('data-line-from')).toBe('13');

    expect(root.querySelector('h1')?.getAttribute('data-line-from')).toBe('4');
    expect(root.querySelector('pre code:not([class])')?.textContent).toBe('<b>plain code</b>\n');
    expect(root.querySelector('pre code b')).toBeNull();
    expect(root.querySelectorAll('.code-copy-button')).toHaveLength(3);

    expect(root.querySelector('code.language-javascript .hljs-keyword') !== null).toBe(!lite);
    for (const selector of ['.markdown-alert-note .katex', 'td .katex', '#fn1 .katex', '.katex-display']) {
      expect(root.querySelector(selector) !== null, selector).toBe(!lite);
    }

    expect(root.querySelector('.katex-error')).toBeNull();
    expect(root.querySelector('.mermaid') !== null).toBe(!lite);

    if (lite) {
      expect(root.querySelector('code.language-mermaid')?.textContent).toContain('A --> B');
      expect(root.textContent).toContain('$x^2$');
      expect(await renderer.renderKatexHTML('x^2')).toBe('');
    } else {
      expect(root.querySelector('.mermaid')?.textContent).toContain('A --> B');
    }

    const withoutLines = parseHTML(await renderer.renderMarkdown(markdown, false));
    expect(withoutLines.querySelector('[data-line-from], [data-line-to]')).toBeNull();

    const tables = await renderer.renderTableBlocks(markdown);
    expect(tables).toHaveLength(1);
    expect(tables[0]).toMatchObject({ fromLine: 17, toLine: 19 });

    const table = parseHTML(tables[0].html);
    expect(table.querySelector('a')?.getAttribute('href')).toBe('https://example.net');
    expect(table.querySelector('.katex') !== null).toBe(!lite);
  });

  test('does not leak front matter, heading IDs, footnotes, or references between documents', async () => {
    const renderer = createRenderer(true);
    await renderer.renderMarkdown(markdown);
    await renderer.renderTableBlocks(markdown);
    await renderer.headingLineForAnchor(markdown, '#shared-heading-1');

    const next = parseHTML(await renderer.renderMarkdown(
      '# **Shared** `heading`\n\nUnresolved[^note] [External][target]\n\nFresh[^fresh]\n\n[^fresh]: New note',
    ));

    expect(next.querySelector('h1')?.id).toBe('shared-heading');
    expect(next.querySelector('.markdown-frontMatter')).toBeNull();
    expect(next.textContent).toContain('Unresolved[^note] [External][target]');
    expect(next.querySelectorAll('.footnote-item')).toHaveLength(1);
    expect(next.querySelector('#fn1')?.textContent).toContain('New note');
    expect(next.querySelector('a[href="https://example.net"]')).toBeNull();

    const again = parseHTML(await renderer.renderMarkdown(markdown));
    expect(again.querySelector('.markdown-frontMatter')?.textContent).toContain('Plugin integration');
    expect(again.querySelector('#fn1')?.textContent).toContain('Footnote with');
    expect(again.querySelector('#fn2')).toBeNull();
  });

  test('supports every alert type and preserves ordinary blockquotes', async () => {
    const renderer = createRenderer(true);
    for (const kind of ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION']) {
      const root = parseHTML(await renderer.renderMarkdown(`> [!${kind}]\n> **Message**`));
      expect(root.querySelector(`.markdown-alert-${kind.toLowerCase()} strong`)?.textContent).toBe('Message');
    }

    const ordinary = parseHTML(await renderer.renderMarkdown('> Ordinary **quote**'));
    expect(ordinary.querySelector('.markdown-alert')).toBeNull();
    expect(ordinary.querySelector('blockquote strong')?.textContent).toBe('quote');
  });

  test.skipIf(lite)('supports default and custom math delimiters in the full build', async () => {
    const renderer = createRenderer(true);
    for (const source of ['$x^2$', '$$x^2$$', '\\(x^2\\)', '\\[x^2\\]']) {
      const root = parseHTML(await renderer.renderMarkdown(source));
      expect(root.querySelectorAll('.katex'), source).toHaveLength(1);
      expect(root.querySelector('.katex-error'), source).toBeNull();
    }

    const custom = createRenderer(true, {
      mathDelimiters: [{ left: '%%', right: '%%', display: false }],
    });

    const root = parseHTML(await custom.renderMarkdown('%%x^2%% and $y^2$'));
    expect(root.querySelectorAll('.katex')).toHaveLength(1);
    expect(root.textContent).toContain('$y^2$');
    expect(root.textContent).not.toContain('%%');
  });
});
