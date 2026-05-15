import { describe, it, expect } from 'vitest';
import { parseFrontMatter } from '../src/features/frontMatter';

describe('parseFrontMatter (validation)', () => {
  it('returns the parsed mapping for an object root', () => {
    expect(parseFrontMatter('a: 1')).toEqual({ a: 1 });
  });

  it('returns undefined for a top-level array', () => {
    expect(parseFrontMatter('- a\n- b')).toBeUndefined();
  });

  it('returns undefined for a top-level scalar', () => {
    expect(parseFrontMatter('just a string')).toBeUndefined();
  });

  it('returns undefined for empty input', () => {
    expect(parseFrontMatter('')).toBeUndefined();
  });

  it('returns undefined for malformed YAML', () => {
    expect(parseFrontMatter(': : :\nnot valid')).toBeUndefined();
  });
});

describe('parseFrontMatter — type fidelity', () => {
  it('returns numbers as number', () => {
    const fm = parseFrontMatter('count: 42\npi: 3.14')!;
    expect(typeof fm.count).toBe('number');
    expect(fm.count).toBe(42);
    expect(typeof fm.pi).toBe('number');
  });

  it('returns booleans as boolean', () => {
    const fm = parseFrontMatter('draft: true\npublished: false')!;
    expect(typeof fm.draft).toBe('boolean');
    expect(fm.draft).toBe(true);
    expect(fm.published).toBe(false);
  });

  it('returns null for null / ~ / empty value', () => {
    const fm = parseFrontMatter('a: null\nb: ~\nc:')!;
    expect(fm.a).toBeNull();
    expect(fm.b).toBeNull();
    expect(fm.c).toBeNull();
  });

  it('returns arrays as arrays of typed primitives', () => {
    const fm = parseFrontMatter('tags: [a, 1, true]')!;
    expect(Array.isArray(fm.tags)).toBe(true);
    expect(fm.tags).toEqual(['a', 1, true]);
  });

  it('returns nested mappings as plain objects', () => {
    const fm = parseFrontMatter('author:\n  name: Jane\n  age: 30')!;
    expect(fm.author).toEqual({ name: 'Jane', age: 30 });
  });

  it('matches a real-world Hugo post shape', () => {
    const fm = parseFrontMatter([
      'title: "My Post"',
      'date: 2024-01-15',
      'draft: false',
      'tags: ["foo", "bar"]',
      'author:',
      '  name: Jane',
    ].join('\n'))!;
    expect(fm.title).toBe('My Post');
    expect(fm.draft).toBe(false);
    expect(fm.tags).toEqual(['foo', 'bar']);
    expect(fm.author).toEqual({ name: 'Jane' });
  });
});

describe('parseFrontMatter — CORE_SCHEMA (YAML 1.2) semantics', () => {
  it('does not treat no/yes/on/off as booleans (the Norway problem)', () => {
    const fm = parseFrontMatter('a: no\nb: yes\nc: on\nd: off')!;
    expect(fm).toEqual({ a: 'no', b: 'yes', c: 'on', d: 'off' });
  });

  it('does not coerce leading-zero numbers as octal', () => {
    const fm = parseFrontMatter('mode: 0755')!;
    expect(fm.mode).toBe(755);
  });

  it('keeps timestamps as strings (no Date coercion)', () => {
    const fm = parseFrontMatter('date: 2024-01-15\ncreated: 2024-01-15T10:30:00Z')!;
    expect(fm.date).toBe('2024-01-15');
    expect(typeof fm.date).toBe('string');
    expect(typeof fm.created).toBe('string');
  });
});
