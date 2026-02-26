import { parse } from 'yaml';

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
  const rows = Object.entries(metadata)
    .map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td>${formatValue(value)}</td></tr>`)
    .join('\n');

  return `<table>\n<thead><tr><th>Key</th><th>Value</th></tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>\n`;
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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
