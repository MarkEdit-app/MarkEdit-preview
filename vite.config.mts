import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { defaultViteConfig } from 'markedit-vite';

import mainPackage from './package.json' with { type: 'json' };
import katexPackage from 'katex/package.json' with { type: 'json' };

const liteBuild = process.env.LITE_BUILD === 'true';
const outDir = liteBuild ? 'dist/lite' : 'dist';

export default defineConfig(mergeConfig(defaultViteConfig({ outDir }), {
  define: {
    __PKG_VERSION__: JSON.stringify(mainPackage.version),
    __FULL_BUILD__: JSON.stringify(!liteBuild),
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
