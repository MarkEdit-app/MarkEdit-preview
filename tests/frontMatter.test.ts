import { describe, it, expect, vi } from 'vitest';
import { renderMarkdown } from '../src/render';

vi.mock('markedit-api', () => ({ MarkEdit: {} }));

async function renderFm(yaml: string): Promise<string> {
  const html = await renderMarkdown(`---\n${yaml}\n---\n`, false);
  const match = html.match(/<table class="markdown-frontMatter"[^>]*>[\s\S]*<\/table>/);
  return match?.[0] ?? '';
}

function row(key: string, value: string): string {
  return `<tr><th scope="row">${key}</th><td>${value}</td></tr>`;
}

describe('frontMatter rendering', () => {

  describe('table structure', () => {
    it('wraps output in <table class="markdown-frontMatter"> with <tbody>', async () => {
      const html = await renderFm('title: Hello');
      expect(html).toMatch(/^<table class="markdown-frontMatter"[^>]*>/);
      expect(html).toContain('<tbody>');
      expect(html).toMatch(/<\/table>$/);
    });

    it('uses row-based layout (th[scope="row"]), not column headers', async () => {
      const html = await renderFm('title: Hello\nauthor: Jane');
      expect(html).not.toContain('<thead>');
      expect(html).not.toContain('scope="col"');
      expect(html).toContain('<th scope="row">title</th>');
      expect(html).toContain('<th scope="row">author</th>');
    });

    it('preserves declaration order of keys', async () => {
      const html = await renderFm('c: 3\na: 1\nb: 2');
      const idxC = html.indexOf('>c</th>');
      const idxA = html.indexOf('>a</th>');
      const idxB = html.indexOf('>b</th>');
      expect(idxC).toBeLessThan(idxA);
      expect(idxA).toBeLessThan(idxB);
    });
  });

  describe('scalar types', () => {
    it('renders plain strings', async () => {
      const html = await renderFm('title: Hello World');
      expect(html).toContain(row('title', 'Hello World'));
    });

    it('renders integers', async () => {
      const html = await renderFm('count: 42\nnegative: -7');
      expect(html).toContain(row('count', '42'));
      expect(html).toContain(row('negative', '-7'));
    });

    it('renders floats', async () => {
      const html = await renderFm('pi: 3.14\nratio: -0.5');
      expect(html).toContain(row('pi', '3.14'));
      expect(html).toContain(row('ratio', '-0.5'));
    });

    it('renders booleans as their lowercase form', async () => {
      const html = await renderFm('draft: true\npublished: false');
      expect(html).toContain(row('draft', 'true'));
      expect(html).toContain(row('published', 'false'));
    });

    it('renders null, ~, and empty value as empty cell', async () => {
      const html = await renderFm('a: null\nb: ~\nc:');
      expect(html).toContain(row('a', ''));
      expect(html).toContain(row('b', ''));
      expect(html).toContain(row('c', ''));
    });
  });

  describe('strings', () => {
    it('strips single and double quotes', async () => {
      const html = await renderFm('a: "double"\nb: \'single\'');
      expect(html).toContain(row('a', 'double'));
      expect(html).toContain(row('b', 'single'));
    });

    it('preserves colons inside quoted values', async () => {
      const html = await renderFm('url: "https://example.com/path"');
      expect(html).toContain(row('url', 'https://example.com/path'));
    });

    it('renders unicode content', async () => {
      const html = await renderFm('title: "日本語 — café 🌸"');
      expect(html).toContain('日本語 — café 🌸');
    });

    it('renders a literal block scalar (|) preserving content', async () => {
      const html = await renderFm('description: |\n  line one\n  line two');
      expect(html).toContain('line one');
      expect(html).toContain('line two');
    });

    it('renders a folded block scalar (>) preserving content', async () => {
      const html = await renderFm('description: >\n  one two\n  three four');
      expect(html).toContain('one two');
      expect(html).toContain('three four');
    });
  });

  describe('dates', () => {
    it('formats a date-only value as YYYY-MM-DD', async () => {
      const html = await renderFm('date: 2024-01-15');
      expect(html).toContain(row('date', '2024-01-15'));
      expect(html).not.toContain('GMT');
      expect(html).not.toContain('T00:00:00');
    });

    it('preserves a UTC ISO datetime string', async () => {
      const html = await renderFm('created: 2024-01-15T10:30:00Z');
      expect(html).toContain('2024-01-15T10:30:00');
      expect(html).not.toContain('GMT');
    });

    it('preserves an ISO datetime with timezone offset', async () => {
      const html = await renderFm('created: "2024-01-15T10:30:00-07:00"');
      expect(html).toContain('2024-01-15T10:30:00-07:00');
    });
  });

  describe('arrays', () => {
    it('joins flow-style primitive arrays with commas', async () => {
      const html = await renderFm('tags: [a, b, c]');
      expect(html).toContain(row('tags', 'a, b, c'));
    });

    it('joins block-style primitive arrays with commas', async () => {
      const html = await renderFm('tags:\n  - foo\n  - bar\n  - baz');
      expect(html).toContain(row('tags', 'foo, bar, baz'));
    });

    it('renders an empty array as an empty cell', async () => {
      const html = await renderFm('tags: []');
      expect(html).toContain(row('tags', ''));
    });

    it('joins arrays of mixed primitives', async () => {
      const html = await renderFm('mixed: [1, two, true, null]');
      expect(html).toContain('1, two, true, ');
    });

    it('renders arrays containing objects as a <ul> of nested tables', async () => {
      const html = await renderFm('items:\n  - name: a\n    qty: 1\n  - name: b\n    qty: 2');
      expect(html).toContain('<ul>');
      expect(html).toContain('<li><table>');
      expect(html).toContain(row('qty', '1'));
      expect(html).toContain(row('qty', '2'));
    });
  });

  describe('nested objects', () => {
    it('renders a one-level nested mapping as a nested table', async () => {
      const html = await renderFm('author:\n  name: Jane\n  email: jane@example.com');
      expect(html).toContain('<table><tbody>');
      expect(html).toContain(row('name', 'Jane'));
      expect(html).toContain(row('email', 'jane@example.com'));
    });

    it('renders deeply nested mappings', async () => {
      const html = await renderFm('a:\n  b:\n    c: deep');
      const tableOpens = html.match(/<table>/g)?.length ?? 0;
      expect(tableOpens).toBe(2);
      expect(html).toContain(row('c', 'deep'));
    });

    it('renders an empty nested mapping as an empty cell', async () => {
      const html = await renderFm('meta: {}');
      expect(html).toContain(row('meta', ''));
    });

    it('renders inline flow mapping', async () => {
      const html = await renderFm('author: { name: Jane, role: author }');
      expect(html).toContain(row('name', 'Jane'));
      expect(html).toContain(row('role', 'author'));
    });
  });

  describe('real-world examples', () => {
    it('Jekyll post', async () => {
      const html = await renderFm([
        'layout: post',
        'title: "Welcome to Jekyll!"',
        'date: 2015-11-17',
        'categories: [jekyll, update]',
      ].join('\n'));
      expect(html).toContain(row('layout', 'post'));
      expect(html).toContain(row('title', 'Welcome to Jekyll!'));
      expect(html).toContain(row('date', '2015-11-17'));
      expect(html).toContain(row('categories', 'jekyll, update'));
    });

    it('Hugo post with author object', async () => {
      const html = await renderFm([
        'title: "My Post"',
        'date: 2024-01-15',
        'draft: false',
        'tags: ["foo", "bar"]',
        'author:',
        '  name: Jane',
        '  email: jane@example.com',
      ].join('\n'));
      expect(html).toContain(row('title', 'My Post'));
      expect(html).toContain(row('draft', 'false'));
      expect(html).toContain(row('tags', 'foo, bar'));
      expect(html).toContain(row('name', 'Jane'));
    });

    it('Obsidian note with aliases and tags', async () => {
      const html = await renderFm([
        'title: My Note',
        'aliases:',
        '  - "TS Notes"',
        '  - typescript-notes',
        'tags:',
        '  - learning',
        '  - typescript',
        'cssclass: wide',
      ].join('\n'));
      expect(html).toContain(row('title', 'My Note'));
      expect(html).toContain(row('aliases', 'TS Notes, typescript-notes'));
      expect(html).toContain(row('tags', 'learning, typescript'));
      expect(html).toContain(row('cssclass', 'wide'));
    });

    it('Astro post with description and image object', async () => {
      const html = await renderFm([
        'title: "Astro Post"',
        'description: A short blurb.',
        'pubDate: 2024-01-15',
        'image:',
        '  url: /img/cover.png',
        '  alt: Cover image',
      ].join('\n'));
      expect(html).toContain(row('description', 'A short blurb.'));
      expect(html).toContain(row('url', '/img/cover.png'));
      expect(html).toContain(row('alt', 'Cover image'));
    });
  });

  describe('comments and whitespace', () => {
    it('ignores YAML # comments', async () => {
      const html = await renderFm('title: Hello # inline comment\n# full-line comment\nauthor: Jane');
      expect(html).toContain(row('title', 'Hello'));
      expect(html).toContain(row('author', 'Jane'));
      expect(html).not.toContain('inline comment');
      expect(html).not.toContain('full-line comment');
    });

    it('tolerates leading and trailing blank lines inside frontMatter', async () => {
      const html = await renderFm('\n\ntitle: Hello\n\n');
      expect(html).toContain(row('title', 'Hello'));
    });
  });

  describe('security', () => {
    it('escapes HTML in string values', async () => {
      const html = await renderFm('title: "<script>alert(1)</script>"');
      expect(html).not.toContain('<script>alert(1)</script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('escapes HTML in keys', async () => {
      const html = await renderFm('"<b>key</b>": value');
      expect(html).not.toContain('<b>key</b>');
      expect(html).toContain('&lt;b&gt;key&lt;/b&gt;');
    });

    it('escapes HTML inside nested object values', async () => {
      const html = await renderFm('meta:\n  body: "<img src=x onerror=alert(1)>"');
      expect(html).not.toContain('<img src=x');
      expect(html).toContain('&lt;img');
    });

    it('escapes HTML inside array items', async () => {
      const html = await renderFm('tags: ["<x>", "<y>"]');
      expect(html).not.toContain('<x>');
      expect(html).toContain('&lt;x&gt;');
      expect(html).toContain('&lt;y&gt;');
    });
  });

  describe('malformed and unsupported input', () => {
    it('omits the wrapper for malformed YAML', async () => {
      const html = await renderMarkdown('---\n: : :\nnot valid\n---\n', false);
      expect(html).not.toContain('markdown-frontMatter');
    });

    it('omits the wrapper when the document is a top-level array', async () => {
      const html = await renderMarkdown('---\n- a\n- b\n---\n', false);
      expect(html).not.toContain('markdown-frontMatter');
    });

    it('omits the wrapper for an empty frontMatter block', async () => {
      const html = await renderMarkdown('---\n---\n', false);
      expect(html).not.toContain('markdown-frontMatter');
    });

    it('omits the wrapper when the document is a top-level scalar', async () => {
      const html = await renderMarkdown('---\njust a string\n---\n', false);
      expect(html).not.toContain('markdown-frontMatter');
    });
  });
});
