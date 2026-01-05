import markdownit from 'markdown-it';
import anchor from 'markdown-it-anchor';
import mila from 'markdown-it-link-attributes';
import footnote from 'markdown-it-footnote';
import tasklist from 'markdown-it-task-lists';
import githubAlerts from 'markdown-it-github-alerts';

import baseCss from '../styles/base.css?raw';
import githubCss from '../styles/github.css?raw';
import alertsLightCss from 'markdown-it-github-alerts/styles/github-colors-light.css?raw';
import alertsDarkCss from 'markdown-it-github-alerts/styles/github-colors-dark-media.css?raw';
import alertsBaseCss from 'markdown-it-github-alerts/styles/github-base.css?raw';

import { markdownItPreset, markdownItOptions } from './settings';

/**
 * @param lineInfo Whether to include line info like `data-line-from` and `data-line-to`.
 */
export function renderMarkdown(markdown: string, lineInfo = true) {
  return mdit.render(markdown, { lineInfo });
}

export function handlePostRender(process: () => void) {
  if (__FULL_BUILD__) {
    import('mermaid').then(({ default: mermaid }) => {
      mermaid.run({
        querySelector: '.mermaid',
        postRenderCallback: process,
      });
    });
  } else {
    process();
  }
}

export async function applyStyles(html: string) {
  const stylify = (css: string) => `<style>\n${css}\n</style>`;
  const components = [
    '<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',
    `<div class="markdown-body">\n${html}\n</div>`,
    stylify(baseCss),
    stylify(githubCss),
    stylify(alertsLightCss),
    stylify(alertsDarkCss),
    stylify(alertsBaseCss),
    '</body></html>',
  ];

  if (__FULL_BUILD__) {
    const { default: codeCss } = await import('../styles/code.css?raw');
    components.push(stylify(codeCss));

    const { default: katexCss } = await import('../styles/katex.css?raw');
    components.push(stylify(katexCss));

    const mermaid = '<script type="module">\nimport mermaid from \'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs\';\n</script>';
    components.push(mermaid);
  }

  return components.join('\n');
}

// Create the markdown-it instance
const mdit = markdownit(markdownItPreset, {
  html: true,
  breaks: true,
  linkify: true,
  ...markdownItOptions,
});

// Link attributes
mdit.use(anchor);
mdit.use(mila, {
  matcher: (href: string) => !href.startsWith('#'),
  attrs: {
    target: '_blank',
    rel: 'noopener',
  },
});

// Extended syntaxes
mdit.use(footnote);
mdit.use(tasklist);
mdit.use(githubAlerts);

const blockTypes = new Set([
  'paragraph_open',
  'heading_open',
  'blockquote_open',
  'list_item_open',
  'bullet_list_open',
  'ordered_list_open',
  'fence',
  'code_block',
  'table_open',
  'html_block',
]);

// Add "line from" and "line to" info to each block
for (const type of blockTypes) {
  const renderBlock = mdit.renderer.rules[type];
  mdit.renderer.rules[type] = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (env.lineInfo && token.map?.length === 2) {
      token.attrSet('data-line-from', String(token.map[0]));
      token.attrSet('data-line-to', String(token.map[1] - 1));
    }

    if (renderBlock) {
      return renderBlock(tokens, idx, options, env, self);
    }

    return self.renderToken(tokens, idx, options);
  };
}

// Highlight.js, KaTex and Mermaid, for full builds only
if (__FULL_BUILD__) {
  import('markdown-it-highlightjs').then(mod => mdit.use(mod.default));
  import('@vscode/markdown-it-katex').then(mod => mdit.use(mod.default));

  const renderFence = mdit.renderer.rules.fence;
  mdit.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    const lang = token.info.trim();

    if (lang === 'mermaid') {
      return `<div class="mermaid">${code}</div>`;
    }

    if (renderFence !== undefined) {
      return renderFence(tokens, idx, options, env, slf);
    }

    return `<pre><code class="language-${lang}">${mdit.utils.escapeHtml(code)}</code></pre>`;
  };
}
