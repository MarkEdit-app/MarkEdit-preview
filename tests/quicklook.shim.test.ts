import { afterEach, describe, expect, test, vi } from 'vitest';

type ShimHost = {
  require?: (id: string) => unknown;
};

const host = globalThis as unknown as ShimHost;
const originalRequire = host.require;

afterEach(() => {
  host.require = originalRequire;
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
});
