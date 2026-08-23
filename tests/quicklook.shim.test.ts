// @vitest-environment happy-dom
import { afterEach, describe, expect, test, vi } from 'vitest';

type ShimHost = {
  MarkEdit?: object;
  require?: (id: string) => unknown;
  __markeditPreviewInitialized__?: boolean;
};

const host = globalThis as unknown as ShimHost;
const originalRequire = host.require;
const originalMarkEdit = host.MarkEdit;
const externalModules = [
  'markedit-api',
  '@codemirror/view',
  '@codemirror/state',
  '@codemirror/language',
  '@codemirror/lang-markdown',
  '@codemirror/commands',
  '@codemirror/search',
  '@codemirror/autocomplete',
  '@lezer/common',
  '@lezer/highlight',
  '@lezer/markdown',
  '@lezer/lr',
];

afterEach(() => {
  host.require = originalRequire;
  host.MarkEdit = originalMarkEdit;
  delete host.__markeditPreviewInitialized__;
  document.body.innerHTML = '';
  externalModules.forEach(id => vi.doUnmock(id));
  vi.useRealTimers();
  vi.resetModules();
});

describe('Quick Look require shim', () => {
  test('provides an inert CodeMirror compartment', async () => {
    host.require = undefined;
    await import('../src/quicklook/shim');
    const shimmedRequire = (globalThis as unknown as ShimHost).require;
    const state = shimmedRequire?.('@codemirror/state') as {
      Compartment: new () => {
        of: () => unknown;
        reconfigure: () => unknown;
      };
    };

    const compartment = new state.Compartment();
    expect(compartment.of()).toEqual({});
    expect(compartment.reconfigure()).toEqual({});
  });

  test('initializes the Preview entrypoint with shimmed modules', async () => {
    vi.useFakeTimers();
    host.MarkEdit = {};
    host.require = undefined;
    await import('../src/quicklook/shim');
    const shimmedRequire = (globalThis as unknown as Required<Pick<ShimHost, 'require'>>).require;
    expect(shimmedRequire).toBeTypeOf('function');
    externalModules.forEach(id => {
      vi.doMock(id, () => shimmedRequire(id) as object);
    });

    await expect(import('../main')).resolves.toBeDefined();
    expect(host.__markeditPreviewInitialized__).toBe(true);
    expect(document.querySelector('.quicklook-toolbar')).not.toBeNull();
  });
});
