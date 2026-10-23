import { beforeEach, describe, expect, test, vi } from 'vitest';

const settings = vi.hoisted<{ inlineRendering: unknown; inlineImages?: boolean; mathDelimiters?: unknown; markdownIt?: unknown }>(() => ({ inlineRendering: undefined }));
vi.mock('markedit-api', () => ({ MarkEdit: { userSettings: { 'extension.markeditPreview': settings } } }));
beforeEach(() => {
  vi.resetModules();
  settings.inlineRendering = undefined;
  settings.inlineImages = undefined;
  settings.mathDelimiters = undefined;
  settings.markdownIt = undefined;
});

describe('Markdown settings', () => {
  test.each([undefined, null, false, ''])('uses default math delimiters for %j', async value => {
    settings.mathDelimiters = value;
    const { mathDelimiters } = await import('../src/support/settings');
    expect(mathDelimiters).toBeUndefined();
  });

  test.each([
    { value: [] },
    { value: [{ left: '\\(', right: '\\)', display: false }] },
  ])('preserves configured math delimiters: $value', async ({ value }) => {
    settings.mathDelimiters = value;
    const { mathDelimiters } = await import('../src/support/settings');
    expect(mathDelimiters).toEqual(value);
  });

  test.each([
    { value: 'invalid' },
    { value: {} },
    { value: [null] },
    { value: [{ left: '$', right: '$' }] },
    { value: [{ left: '$', right: '$', display: 'false' }] },
  ])('rejects invalid math delimiters: $value', async ({ value }) => {
    settings.mathDelimiters = value;
    await expect(import('../src/support/settings')).rejects.toThrow('Invalid mathDelimiters setting');
  });

  test('allows disabling automatic links', async () => {
    settings.markdownIt = { options: { linkify: false } };
    const { renderMarkdown } = await import('../src/render');
    const html = await renderMarkdown('example.com https://example.com');
    expect(html).not.toContain('<a ');
  });
});

describe('Inline rendering settings', () => {
  test.each([true, false])('preserves deprecated inlineImages: %s', async enabled => {
    settings.inlineImages = enabled;
    const { inlineRendering } = await import('../src/support/settings');
    expect(inlineRendering).toEqual(enabled ? ['image', 'math', 'mermaid'] : ['math', 'mermaid']);
  });

  test.each([
    { legacy: true, rendering: [] },
    { legacy: true, rendering: ['table'] },
    { legacy: false, rendering: ['image'] },
  ])('prefers explicit inlineRendering: $rendering over inlineImages: $legacy', async ({ legacy, rendering }) => {
    settings.inlineImages = legacy;
    settings.inlineRendering = rendering;
    const { inlineRendering } = await import('../src/support/settings');
    expect(inlineRendering).toEqual(rendering);
  });

  test.each([undefined, null, false, 'image', {}])('uses defaults for a non-array value: %j', async value => {
    settings.inlineRendering = value;
    const { inlineRendering } = await import('../src/support/settings');
    expect(inlineRendering).toEqual(['math', 'mermaid']);
  });

  test.each([
    { value: [], expected: [] },
    { value: ['image'], expected: ['image'] },
    { value: ['html'], expected: ['html'] },
    { value: ['image', 'table', 'math', 'mermaid'], expected: ['image', 'table', 'math', 'mermaid'] },
    { value: ['unknown', null, 1, true, {}, 'table'], expected: ['table'] },
    { value: ['unknown'], expected: [] },
  ])('keeps only supported entries: $value', async ({ value, expected }) => {
    settings.inlineRendering = value;
    const { inlineRendering } = await import('../src/support/settings');
    expect(inlineRendering).toEqual(expected);
  });
});
