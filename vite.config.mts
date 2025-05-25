import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { defaultViteConfig } from 'markedit-vite';
import packageJson from './package.json';

const liteBuild = process.env.LITE_BUILD === 'true';
const outDir = liteBuild ? 'dist/lite' : 'dist';

export default defineConfig(mergeConfig(defaultViteConfig({ outDir }), {
  define: {
    __PKG_VERSION__: JSON.stringify(packageJson.version),
    __FULL_BUILD__: JSON.stringify(!liteBuild),
  },
  plugins: [viteSingleFile()],
}));
