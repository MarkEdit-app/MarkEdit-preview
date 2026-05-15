import { load as parseYaml, CORE_SCHEMA as schema } from 'js-yaml';
import extractFrontMatter from 'markdown-it-front-matter';
import type MarkdownIt from 'markdown-it';

/**
 * Markdown-it plugin that extracts YAML frontMatter and renders it as an HTML table.
 */
export function createFrontMatterPlugin(): MarkdownIt.PluginSimple {
  return (mdit) => {
    // Closure state is safe: the extract callback and the renderer rule fire in the same synchronous pass.
    let renderedHtml = '';
    mdit.use(extractFrontMatter, (raw: string) => {
      const metadata = parseFrontMatter(raw);
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

/**
 * Parse a YAML frontMatter block.
 *
 * Returns undefined for malformed YAML, non-mapping roots, and empty mappings.
 */
export function parseFrontMatter(raw: string): Record<string, unknown> | undefined {
  try {
    const parsed: unknown = parseYaml(raw, { schema });
    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length > 0) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // Silently ignore malformed YAML
  }

  return undefined;
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

function formatDate(date: Date): string {
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const iso = date.toISOString();
  return iso.endsWith('T00:00:00.000Z') ? iso.slice(0, 10) : iso;
}

function isPrimitiveLike(value: unknown): boolean {
  if (value === null || value === undefined || value instanceof Date) {
    return true;
  }

  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean' || type === 'bigint';
}

type EscapeHtmlFn = (input: string) => string;
