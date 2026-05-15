import { describe, it, expect } from 'vitest';
import { parse as yamlParse } from 'yaml';
import { parseFrontMatter, parseYamlLite } from '../src/frontMatter/parser';
import { formatDate } from '../src/frontMatter';

describe('parseFrontMatter (validation)', () => {
  it('returns the parsed mapping for an object root', () => {
    expect(parseFrontMatter('a: 1', yamlParse)).toEqual({ a: 1 });
  });

  it('returns undefined for a top-level array', () => {
    expect(parseFrontMatter('- a\n- b', yamlParse)).toBeUndefined();
  });

  it('returns undefined for a top-level scalar', () => {
    expect(parseFrontMatter('just a string', yamlParse)).toBeUndefined();
  });

  it('returns undefined for null root', () => {
    expect(parseFrontMatter('', yamlParse)).toBeUndefined();
  });

  it('returns undefined when the parser throws', () => {
    const throwing = () => { throw new Error('bad'); };
    expect(parseFrontMatter('anything', throwing)).toBeUndefined();
  });
});

describe('full parser (yaml package) — type fidelity', () => {
  const parse = (raw: string) => parseFrontMatter(raw, yamlParse);

  it('returns numbers as number', () => {
    const fm = parse('count: 42\npi: 3.14')!;
    expect(typeof fm.count).toBe('number');
    expect(fm.count).toBe(42);
    expect(typeof fm.pi).toBe('number');
  });

  it('returns booleans as boolean', () => {
    const fm = parse('draft: true\npublished: false')!;
    expect(typeof fm.draft).toBe('boolean');
    expect(fm.draft).toBe(true);
    expect(fm.published).toBe(false);
  });

  it('returns null for null / ~ / empty value', () => {
    const fm = parse('a: null\nb: ~\nc:')!;
    expect(fm.a).toBeNull();
    expect(fm.b).toBeNull();
    expect(fm.c).toBeNull();
  });

  it('returns date-only values as string (yaml package does not coerce to Date)', () => {
    // Documenting current reality: the formatDate / Date branch in the renderer
    // is dormant under this parser. A future parser may choose to return Date.
    const fm = parse('date: 2024-01-15')!;
    expect(typeof fm.date).toBe('string');
    expect(fm.date).toBe('2024-01-15');
  });

  it('returns a string for ISO datetime values', () => {
    // The yaml package leaves timestamps as strings unless a custom schema is set.
    // Pinning this is what lets the renderer's `instanceof Date` branch stay correct.
    const fm = parse('created: 2024-01-15T10:30:00Z')!;
    expect(typeof fm.created).toBe('string');
  });

  it('returns arrays as arrays of typed primitives', () => {
    const fm = parse('tags: [a, 1, true]')!;
    expect(Array.isArray(fm.tags)).toBe(true);
    expect(fm.tags).toEqual(['a', 1, true]);
  });

  it('returns nested mappings as plain objects', () => {
    const fm = parse('author:\n  name: Jane\n  age: 30')!;
    expect(fm.author).toEqual({ name: 'Jane', age: 30 });
  });

  it('matches a real-world Hugo post shape', () => {
    const fm = parse([
      'title: "My Post"',
      'date: 2024-01-15',
      'draft: false',
      'tags: ["foo", "bar"]',
      'author:',
      '  name: Jane',
    ].join('\n'))!;
    expect(fm.title).toBe('My Post');
    expect(fm.date).toBe('2024-01-15');
    expect(fm.draft).toBe(false);
    expect(fm.tags).toEqual(['foo', 'bar']);
    expect(fm.author).toEqual({ name: 'Jane' });
  });
});

describe('parseYamlLite (lite build parser)', () => {
  it('returns all values as strings (no type coercion)', () => {
    const fm = parseYamlLite('count: 42\ndraft: true\ndate: 2024-01-15');
    expect(fm.count).toBe('42');
    expect(fm.draft).toBe('true');
    expect(fm.date).toBe('2024-01-15');
  });

  it('strips surrounding single and double quotes', () => {
    const fm = parseYamlLite('a: "hello"\nb: \'world\'');
    expect(fm.a).toBe('hello');
    expect(fm.b).toBe('world');
  });

  it('preserves colons after the first one', () => {
    const fm = parseYamlLite('url: https://example.com/path');
    expect(fm.url).toBe('https://example.com/path');
  });

  it('skips lines without a colon', () => {
    const fm = parseYamlLite('title: Hello\nignored line\nauthor: Jane');
    expect(fm).toEqual({ title: 'Hello', author: 'Jane' });
  });

  it('skips lines with an empty key', () => {
    const fm = parseYamlLite(': orphan\ntitle: Hello');
    expect(fm).toEqual({ title: 'Hello' });
  });

  it('returns an empty object for empty input', () => {
    expect(parseYamlLite('')).toEqual({});
  });

  it('does not recurse into block structures (flat only)', () => {
    // Block-style array / nested mapping should produce surprising-but-stable output:
    // the indented lines parse as their own top-level keys with leading whitespace.
    const fm = parseYamlLite('tags:\n  - foo\n  - bar');
    expect(fm.tags).toBe('');
    // Indented `- foo` has no `:` so it's skipped; this just pins the shape.
    expect(Object.keys(fm)).toEqual(['tags']);
  });
});

describe('formatDate', () => {
  it('returns empty string for an invalid Date (defensive guard)', () => {
    expect(formatDate(new Date(NaN))).toBe('');
  });

  it('returns YYYY-MM-DD for a UTC-midnight Date', () => {
    expect(formatDate(new Date('2024-01-15T00:00:00Z'))).toBe('2024-01-15');
  });

  it('returns full ISO 8601 for a non-midnight Date', () => {
    expect(formatDate(new Date('2024-01-15T10:30:00Z'))).toBe('2024-01-15T10:30:00.000Z');
  });
});
