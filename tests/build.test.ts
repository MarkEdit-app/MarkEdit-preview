import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { transform } from 'esbuild';
import { build, loadConfigFromFile } from 'vite';
import { describe, expect, test, vi } from 'vitest';

const require = createRequire(import.meta.url);

describe('build variants', () => {
  test('keeps the bundled KaTeX stylesheet aligned with the installed renderer', () => {
    const bundled = readFileSync(new URL('../styles/katex.css', import.meta.url), 'utf8');
    const installed = readFileSync(require.resolve('katex/dist/katex.css'), 'utf8');
    expect(bundled).toBe(installed);
  });

  test('uses no-op renderers in lite builds', async () => {
    const sources = ['../src/render.ts', '../src/features/mermaid.ts']
      .map(path => readFileSync(new URL(path, import.meta.url), 'utf8'));
    const transformRenderer = async (fullBuild: boolean) => {
      const results = await Promise.all(sources.map(source => transform(source, {
        loader: 'ts',
        define: { __FULL_BUILD__: String(fullBuild) },
        treeShaking: true,
        minifySyntax: true,
      })));

      return { code: results.map(result => result.code).join('\n') };
    };

    const lite = await transformRenderer(false);
    const full = await transformRenderer(true);
    const fullOnlyImports = [
      /import\(["']katex["']\)/,
      /import\(["']markedit-katex["']\)/,
      /import\(["']\.\.\/styles\/katex\.css\?raw["']\)/,
      /import\(["']mermaid["']\)/,
    ];

    fullOnlyImports.forEach(moduleImport => {
      expect(lite.code).not.toMatch(moduleImport);
      expect(full.code).toMatch(moduleImport);
    });
    expect(lite.code).not.toContain('https://cdn.jsdelivr.net/npm/mermaid@');
    expect(full.code).toContain('https://cdn.jsdelivr.net/npm/mermaid@');
    expect(lite.code).toMatch(/renderToString:\s*\(\.\.\._args\) => ""/);
    expect(lite.code).toMatch(/render:\s*async \(\) => \(\{\s*svg: ""\s*\}\)/);
  });

  test.each([false, true])('builds a single-file CommonJS bundle with host-provided externals (lite: %s)', async lite => {
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
        build: { ...loaded.config.build, write: false },
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

      expect(chunk.fileName).toMatch(/\.js$/);
      expect(chunk.dynamicImports.filter(id => id !== chunk.fileName)).toEqual([]);
      expect(chunk.code).not.toMatch(/\bimport\s*\(/);
      expect(chunk.imports).toEqual(expect.arrayContaining(['markedit-api', '@codemirror/state', '@codemirror/view']));
      expect(chunk.imports.every(id => id === 'markedit-api' || /^@(codemirror|lezer)\//.test(id))).toBe(true);
      expect(chunk.code).toMatch(/^"use strict";/);

      const script = new Script(chunk.code);
      const firstImport = new Error('Reached the first host import');

      // Stop at the first external import, before the bundle needs a browser DOM.
      let shimRequire: ((id: string) => unknown) | undefined;
      expect(() => script.runInNewContext({
        get require() {
          return shimRequire === undefined ? undefined : () => { throw firstImport; };
        },
        set require(value: ((id: string) => unknown) | undefined) {
          shimRequire = value;
        },
      })).toThrow(firstImport);

      const markeditApi = shimRequire?.('markedit-api');
      expect(markeditApi).toEqual({ MarkEdit: {} });

      const hostRequire = vi.fn(() => { throw firstImport; });
      expect(() => script.runInNewContext({ require: hostRequire })).toThrow(firstImport);
      expect(hostRequire).toHaveBeenCalledOnce();

      const modules = Object.keys(chunk.modules);
      expect(modules.some(id => id.includes('/node_modules/mermaid/'))).toBe(!lite);

      const katexRoot = dirname(require.resolve('katex/package.json'));
      expect(modules.some(id => id.startsWith(`${katexRoot}/`))).toBe(!lite);

      const mermaidRequire = createRequire(require.resolve('mermaid'));
      const mermaidKatexRoot = dirname(mermaidRequire.resolve('katex/package.json'));
      expect(modules.some(id => id.startsWith(`${mermaidKatexRoot}/`))).toBe(!lite);

      // The plugin must share the project's renderer; only Mermaid may bring its own.
      const katexRenderers = modules.filter(id => /\/katex\/dist\/katex\.(?:mjs|js)$/.test(id));
      const expectedRenderers = lite ? [] : [...new Set([
        `${katexRoot}/dist/katex.mjs`,
        `${mermaidKatexRoot}/dist/katex.mjs`,
      ])];

      expect(katexRenderers.sort()).toEqual(expectedRenderers.sort());
      expect(chunk.code.includes('https://cdn.jsdelivr.net/npm/mermaid@')).toBe(!lite);
    } finally {
      vi.unstubAllEnvs();
    }
  }, 120_000);
});
