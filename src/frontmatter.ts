import { parse } from 'yaml';
import { escapeHtml } from './utils';

/**
 * Parse a raw YAML frontmatter string into a structured object.
 */
export function parseFrontmatter(raw: string): Record<string, unknown> | undefined {
  try {
    const parsed: unknown = parse(raw);
    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // Silently ignore malformed YAML
  }

  return undefined;
}

/**
 * Render a parsed frontmatter object as an HTML table.
 */
export function renderFrontmatter(metadata: Record<string, unknown>): string {
  const entries = Object.entries(metadata);
  const headers = entries.map(([key]) => `<th>${escapeHtml(key)}</th>`).join('');
  const values = entries.map(([, value]) => `<td>${formatValue(value)}</td>`).join('');

  return `<table>\n<thead><tr>${headers}</tr></thead>\n<tbody>\n<tr>${values}</tr>\n</tbody>\n</table>\n`;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map(item => escapeHtml(String(item))).join(', ');
  }

  if (typeof value === 'object') {
    return escapeHtml(JSON.stringify(value));
  }

  return escapeHtml(String(value));
}
