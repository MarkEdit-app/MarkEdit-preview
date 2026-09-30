import { defineConfig } from 'vitest/config';
import mermaidPackage from 'mermaid/package.json' with { type: 'json' };

export default defineConfig({
  test: {
    globals: true,
    css: true,
    setupFiles: ['./tests/setup.ts'],
  },
  define: {
    __PKG_VERSION__: JSON.stringify('test'),
    __FULL_BUILD__: JSON.stringify(true),
    __MERMAID_VERSION__: JSON.stringify(mermaidPackage.version),
  },
});
