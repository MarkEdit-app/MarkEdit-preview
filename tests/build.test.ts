import { readFileSync } from 'node:fs';
import { transform } from 'esbuild';
import { describe, expect, test } from 'vitest';

describe('build variants', () => {
  test('uses no-op renderers in lite builds', async () => {
    const source = readFileSync(new URL('../src/render.ts', import.meta.url), 'utf8');
    const transformRenderer = (fullBuild: boolean) => transform(source, {
      loader: 'ts',
      define: { __FULL_BUILD__: String(fullBuild) },
      treeShaking: true,
    });

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
    expect(lite.code).toMatch(/renderToString:\s*\(\.\.\._args\) => ""/);
    expect(lite.code).toMatch(/render:\s*async \(\) => \(\{\s*svg: ""\s*\}\)/);
  });
});
