import markdownit from 'markdown-it';
import anchor from 'markdown-it-anchor';
import mila from 'markdown-it-link-attributes';
import footnote from 'markdown-it-footnote';
import tasklist from 'markdown-it-task-lists';
import githubAlerts from 'markdown-it-github-alerts';

import { coreCss, previewThemeCss, alertsCss, hljsCss, codeCopyCss } from './styling';
import { localized } from './strings';
import { syntaxAutoDetect, styledHtmlColorScheme, mathDelimiters, markdownItPreset, markdownItOptions } from './settings';

/**
 * @param lineInfo Whether to include line info like `data-line-from` and `data-line-to`.
 */
export function renderMarkdown(markdown: string, lineInfo = true) {
  return mdit.render(markdown, { lineInfo });
}

export function handlePostRender(process: () => void) {
  if (__FULL_BUILD__) {
    import('mermaid').then(({ default: mermaid }) => {
      const isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches;
      mermaid.initialize({
        theme: isDarkMode ? 'dark' : undefined,
      });

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
    stylify(coreCss(styledHtmlColorScheme)),
    stylify(previewThemeCss(styledHtmlColorScheme)),
    stylify(alertsCss(styledHtmlColorScheme)),
    stylify(codeCopyCss(styledHtmlColorScheme)),
    '</body></html>',
  ];

  if (__FULL_BUILD__) {
    components.push(stylify(hljsCss(styledHtmlColorScheme)));

    const { default: katexCss } = await import('../styles/katex.css?raw');
    components.push(stylify(katexCss));

    const mermaid = `
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      if (${styledHtmlColorScheme === 'auto' ? 'true' : 'false'}) {
        const darkMode = matchMedia("(prefers-color-scheme: dark)");
        mermaid.initialize({ theme: darkMode.matches ? "dark" : undefined });
        darkMode.addEventListener("change", () => {
          if (document.querySelector(".mermaid") !== null) {
            location.reload();
          }
        });
      } else {
        const isDark = ${styledHtmlColorScheme === 'dark' ? 'true' : 'false'};
        mermaid.initialize({ theme: isDark ? "dark" : undefined });
      }
    </script>`;
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
  import('markdown-it-highlightjs').then(mod => mdit.use(mod.default, { auto: syntaxAutoDetect }));
  import('markedit-katex').then(mod => {
    const options = mathDelimiters ? { delimiters: mathDelimiters } : {};
    mdit.use(mod.default, options);
  });

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

// Add copy button to code blocks
for (const type of ['fence', 'code_block']) {
  const renderCode = mdit.renderer.rules[type];
  mdit.renderer.rules[type] = (tokens, idx, options, env, self) => {
    const codeBlock = renderCode === undefined ? self.renderToken(tokens, idx, options) : renderCode(tokens, idx, options, env, self);
    return `
    <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
      ${codeBlock}
      <button title="${localized('copyCode')}" aria-label="${localized('copyCode')}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); this.style.opacity='0'">
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
          <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
          <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
      </button>
    </div>`;
  };
}
