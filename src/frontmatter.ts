import { parse } from 'yaml';
import { escapeHtml } from './utils';

const frontmatterRegex = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

/**
 * Extract and parse YAML frontmatter from a markdown string.
 *
 * @returns The parsed metadata and the remaining body, or `undefined` if no valid frontmatter is found.
 */
export function extractFrontmatter(markdown: string): { metadata: Record<string, unknown>; body: string } | undefined {
  const match = markdown.match(frontmatterRegex);
  if (match === null) {
    return undefined;
  }

  try {
    const parsed: unknown = parse(match[1]);
    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return { metadata: parsed as Record<string, unknown>, body: markdown.slice(match[0].length) };
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
