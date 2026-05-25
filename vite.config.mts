import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { defaultViteConfig } from 'markedit-vite';
import { transformSync } from 'esbuild';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import mainPackage from './package.json' with { type: 'json' };
import katexPackage from 'katex/package.json' with { type: 'json' };

const liteBuild = process.env.LITE_BUILD === 'true';
const outDir = liteBuild ? 'dist/lite' : 'dist';

// Compile src/quicklook/shim.ts into a banner snippet that installs a stub
// `require` when the host doesn't provide one. The leading `"use strict";`
// preserves strict mode for the rest of the bundle — without it the bundle's
// own top-level directive would be demoted by the preceding IIFE expression.
const shimPath = fileURLToPath(new URL('./src/quicklook/shim.ts', import.meta.url));
const requireShim = '"use strict";' + transformSync(readFileSync(shimPath, 'utf8'), {
  loader: 'ts',
  format: 'iife',
  minify: true,
  target: 'es2020',
  sourcefile: 'shim.ts',
}).code.trim();

export default defineConfig(mergeConfig(defaultViteConfig({ outDir }), {
  define: {
    __PKG_VERSION__: JSON.stringify(mainPackage.version),
    __FULL_BUILD__: JSON.stringify(!liteBuild),
  },
  build: {
    rollupOptions: {
      output: {
        banner: requireShim,
      },
    },
  },
  plugins: [viteSingleFile(), replaceKaTeXFonts()],
}));

function replaceKaTeXFonts() {
  return {
    name: 'replace-katex-fonts',
    transform(code: string, id: string) {
      if (id.endsWith('katex.css?raw')) {
        const modified = code.replace(/url\(fonts\//g, `url(https://cdn.jsdelivr.net/npm/katex@${katexPackage.version}/dist/fonts/`);
        return { code: modified, map: null };
      }
    },
  };
}
