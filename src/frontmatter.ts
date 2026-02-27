import type MarkdownIt from 'markdown-it';
import extractFrontmatter from 'markdown-it-front-matter';

let parseYaml: (raw: string) => unknown = parseYamlLite;

if (__FULL_BUILD__) {
  import('yaml').then(({ parse }) => {
    parseYaml = parse;
  });
}

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

  mdit.renderer.rules.front_matter = (tokens, idx, _options, _env, self) => {
    if (frontmatterHtml === '') {
      return '';
    }

    const attrs = self.renderAttrs(tokens[idx]);
    return `<table class="markdown-frontmatter"${attrs}>\n${frontmatterHtml}\n</table>\n`;
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

  const headers = entries.map(([key]) => `<th scope="col">${escape(key)}</th>`).join('');
  const values = entries.map(([, value]) => `<td>${formatValue(value, escape)}</td>`).join('');
  return `<thead><tr>${headers}</tr></thead>\n<tbody>\n<tr>${values}</tr>\n</tbody>`;
}

function formatValue(value: unknown, escape: escapeFn): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map(item => formatValue(item, escape)).join(', ');
  }

  if (typeof value === 'object') {
    return escape(JSON.stringify(value));
  }

  return escape(String(value));
}

/**
 * Lightweight YAML parser for simple key-value frontmatter.
 *
 * Only covers flat `key: value` pairs; nested structures
 * and advanced YAML features are handled by the full `yaml` package
 * in __FULL_BUILD__ mode.
 */
function parseYamlLite(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of raw.split('\n')) {
    const index = line.indexOf(':');
    if (index === -1) {
      continue;
    }

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    if (key.length > 0) {
      result[key] = value;
    }
  }

  return result;
}

type escapeFn = (input: string) => string;
