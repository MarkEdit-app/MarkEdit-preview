import type MarkdownIt from 'markdown-it';
import extractFrontMatter from 'markdown-it-front-matter';

/**
 * Self-contained markdown-it plugin that extracts YAML frontMatter
 * and renders it as an HTML table.
 */
export async function frontMatterPlugin(mdit: MarkdownIt) {
  let renderedHtml = '';
  let parseYaml = parseYamlLite;

  // Additional 100 KB bundle size increase
  if (__FULL_BUILD__) {
    parseYaml = (await import('yaml')).parse;
  }

  mdit.use(extractFrontMatter, (raw: string) => {
    const metadata = parseFrontMatter(raw, parseYaml);
    if (metadata !== undefined) {
      renderedHtml = renderFrontMatter(metadata, mdit.utils.escapeHtml);
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
}

function parseFrontMatter(raw: string, parseYaml: parseYamlFn): Record<string, unknown> | undefined {
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

/**
 * Basic YAML parser that only supports simple key-value pairs used in frontMatter.
 */
function parseYamlLite(raw: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
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

function renderFrontMatter(metadata: Record<string, unknown>, escape: escapeHtmlFn): string {
  const entries = Object.entries(metadata);
  if (entries.length === 0) {
    return '';
  }

  const headers = entries.map(([key]) => `<th scope="col">${escape(key)}</th>`).join('');
  const values = entries.map(([, value]) => `<td>${formatValue(value, escape)}</td>`).join('');
  return `<thead><tr>${headers}</tr></thead>\n<tbody>\n<tr>${values}</tr>\n</tbody>`;
}

function formatValue(value: unknown, escape: escapeHtmlFn): string {
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

type parseYamlFn = (raw: string) => unknown;
type escapeHtmlFn = (input: string) => string;
