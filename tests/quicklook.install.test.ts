import { describe, it, expect, vi } from 'vitest';
import { shouldCopy } from '../src/quicklook/installer';

const VERSION = '1.0.0';
vi.mock('markedit-api', () => ({ MarkEdit: {} }));

describe('shouldCopy', () => {
  it('copies when dest is missing', () => {
    expect(shouldCopy({
      destExists: false,
      bundleInfo: { version: VERSION, fullBuild: true },
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('copies when metadata has no record for this bundle', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: undefined,
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('copies when versions differ', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: { version: '0.9.0', fullBuild: true },
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('copies when the build variant differs (lite vs full swap)', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: { version: VERSION, fullBuild: false },
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('copies when stored variant is missing', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: { version: VERSION },
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('skips when version matches and variant is unchanged', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: { version: VERSION, fullBuild: true },
      currentVersion: VERSION,
    })).toBe(false);
  });
});
