import { stripQuotes } from '../utils';

export type ParseYamlFn = (raw: string) => unknown;

/**
 * Parse a raw frontMatter block and reject non-mapping results.
 * Returns undefined for arrays, scalars, null, or parser exceptions.
 */
export function parseFrontMatter(raw: string, parseYaml: ParseYamlFn): Record<string, unknown> | undefined {
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
export function parseYamlLite(raw: string): Record<string, unknown> {
  const result: Record<string, unknown> = Object.create(null);
  for (const line of raw.split('\n')) {
    const index = line.indexOf(':');
    if (index === -1) {
      continue;
    }

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    if (key.length > 0) {
      result[key] = stripQuotes(value);
    }
  }

  return result;
}
