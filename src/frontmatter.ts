import type MarkdownIt from 'markdown-it';
import extractFrontmatter from 'markdown-it-front-matter';
import { parse as parseYaml } from 'yaml';

/**
 * Self-contained markdown-it plugin that extracts YAML frontmatter
 * and renders it as an HTML table.
 */
export function frontmatterPlugin(mdit: MarkdownIt) {
  let frontmatterHtml = '';

  mdit.use(extractFrontmatter, (raw: string) => {
    const metadata = parseFrontmatter(raw);
    if (metadata !== undefined) {
      frontmatterHtml = renderFrontmatter(metadata, mdit.utils.escapeHtml);
    } else {
      frontmatterHtml = '';
    }
  });

  mdit.renderer.rules.front_matter = () => {
    return frontmatterHtml;
  };
}

function parseFrontmatter(raw: string): Record<string, unknown> | undefined {
  try {
    const parsed: unknown = parseYaml(raw);
    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // Silently ignore malformed YAML
  }

  return undefined;
}

function renderFrontmatter(metadata: Record<string, unknown>, escape: escapeFn): string {
  const entries = Object.entries(metadata);
  if (entries.length === 0) {
    return '';
  }

  const headers = entries.map(([key]) => `<th>${escape(key)}</th>`).join('');
  const values = entries.map(([, value]) => `<td>${formatValue(value, escape)}</td>`).join('');
  return `<table>\n<thead><tr>${headers}</tr></thead>\n<tbody>\n<tr>${values}</tr>\n</tbody>\n</table>\n`;
}

function formatValue(value: unknown, escape: escapeFn): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map(item => escape(String(item))).join(', ');
  }

  if (typeof value === 'object') {
    return escape(JSON.stringify(value));
  }

  return escape(String(value));
}

type escapeFn = (input: string) => string;
