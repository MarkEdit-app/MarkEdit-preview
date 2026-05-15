import type MarkdownIt from 'markdown-it';
import extractFrontMatter from 'markdown-it-front-matter';
import { parseFrontMatter, parseYamlLite } from './parser';

/**
 * Self-contained markdown-it plugin that extracts YAML frontMatter
 * and renders it as an HTML table.
 */
export async function createFrontMatterPlugin(): Promise<MarkdownIt.PluginSimple> {
  let parseYaml = parseYamlLite;
  if (__FULL_BUILD__) {
    // Additional 100 KB bundle size increase
    parseYaml = (await import('yaml')).parse;
  }

  return (mdit) => {
    // The extractFrontMatter callback runs during tokenization, before the renderer
    // rule fires, so passing state via this closure is safe per-render.
    let renderedHtml = '';
    mdit.use(extractFrontMatter, (raw: string) => {
      const metadata = parseFrontMatter(raw, parseYaml);
      if (metadata !== undefined) {
        renderedHtml = renderMappingRows(metadata, mdit.utils.escapeHtml);
      } else {
        renderedHtml = '';
      }
    });

    mdit.renderer.rules.front_matter = (tokens, idx, _options, _env, self) => {
      if (renderedHtml === '') {
        return '';
      }

      const attrs = self.renderAttrs(tokens[idx]);
      return `<table class="markdown-frontMatter"${attrs}>\n${renderedHtml}\n</table>\n`;
    };
  };
}

function renderMappingRows(mapping: Record<string, unknown>, escape: EscapeHtmlFn): string {
  const entries = Object.entries(mapping);
  if (entries.length === 0) {
    return '';
  }

  const rows = entries.map(([key, value]) => {
    return `<tr><th scope="row">${escape(key)}</th><td>${formatValue(value, escape)}</td></tr>`;
  }).join('\n');

  return `<tbody>\n${rows}\n</tbody>`;
}

function formatValue(value: unknown, escape: EscapeHtmlFn): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (value instanceof Date) {
    return escape(formatDate(value));
  }

  if (Array.isArray(value)) {
    if (value.every(isPrimitiveLike)) {
      return value.map(item => formatValue(item, escape)).join(', ');
    }

    const items = value.map(item => `<li>${formatValue(item, escape)}</li>`).join('');
    return `<ul>${items}</ul>`;
  }

  if (typeof value === 'object') {
    const nested = renderMappingRows(value as Record<string, unknown>, escape);
    return nested === '' ? '' : `<table>${nested}</table>`;
  }

  return escape(String(value));
}

function isPrimitiveLike(value: unknown): boolean {
  if (value === null || value === undefined || value instanceof Date) {
    return true;
  }

  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean' || type === 'bigint';
}

/** Format a Date for display. Returns '' for invalid Date instances. */
export function formatDate(date: Date): string {
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const iso = date.toISOString();
  return iso.endsWith('T00:00:00.000Z') ? iso.slice(0, 10) : iso;
}

type EscapeHtmlFn = (input: string) => string;
