/// <reference types="vite/client" />

/**
 * Package version read from the `package.json` file.
 */
declare const __PKG_VERSION__: string;

/**
 * Whether to include all extensions, such as `mermaid`, `katex`, and `highlight.js`.
 */
declare const __FULL_BUILD__: boolean;

/**
 * Installed Mermaid version used by styled HTML exports.
 */
declare const __MERMAID_VERSION__: string;
