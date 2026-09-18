import { beforeEach, describe, expect, test, vi } from 'vitest';

const settings = vi.hoisted<{ inlineRendering: unknown; inlineImages?: boolean }>(() => ({ inlineRendering: undefined }));
vi.mock('markedit-api', () => ({ MarkEdit: { userSettings: { 'extension.markeditPreview': settings } } }));
beforeEach(() => {
  vi.resetModules();
  settings.inlineRendering = undefined;
  settings.inlineImages = undefined;
});

describe('Inline rendering settings', () => {
  test.each([true, false])('preserves deprecated inlineImages: %s', async enabled => {
    settings.inlineImages = enabled;
    const { inlineRendering } = await import('../src/support/settings');
    expect(inlineRendering).toEqual(enabled ? ['image', 'table', 'math', 'mermaid'] : ['table', 'math', 'mermaid']);
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
    expect(inlineRendering).toEqual(['table', 'math', 'mermaid']);
  });

  test.each([
    { value: [], expected: [] },
    { value: ['image'], expected: ['image'] },
    { value: ['image', 'table', 'math', 'mermaid'], expected: ['image', 'table', 'math', 'mermaid'] },
    { value: ['unknown', null, 1, true, {}, 'table'], expected: ['table'] },
    { value: ['unknown'], expected: [] },
  ])('keeps only supported entries: $value', async ({ value, expected }) => {
    settings.inlineRendering = value;
    const { inlineRendering } = await import('../src/support/settings');
    expect(inlineRendering).toEqual(expected);
  });
});
