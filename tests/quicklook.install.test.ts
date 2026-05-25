import { describe, it, expect, vi } from 'vitest';
import { shouldCopy } from '../src/quicklook/installer';

const VERSION = '1.0.0';
vi.mock('markedit-api', () => ({ MarkEdit: {} }));

describe('shouldCopy', () => {
  it('copies when dest is missing', () => {
    expect(shouldCopy({
      destExists: false,
      bundleInfo: { version: VERSION, size: 1000 },
      sourceFileSize: 1000,
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('copies when metadata has no record for this bundle', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: undefined,
      sourceFileSize: 1000,
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('copies when versions differ', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: { version: '0.9.0', size: 1000 },
      sourceFileSize: 1000,
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('copies when size delta crosses the threshold (lite vs full swap)', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: { version: VERSION, size: 256_000 },
      sourceFileSize: 4_960_000,
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('copies when stored size is missing', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: { version: VERSION },
      sourceFileSize: 1000,
      currentVersion: VERSION,
    })).toBe(true);
  });

  it('skips when version matches and size delta is small', () => {
    expect(shouldCopy({
      destExists: true,
      bundleInfo: { version: VERSION, size: 1_000_000 },
      sourceFileSize: 1_100_000,
      currentVersion: VERSION,
    })).toBe(false);
  });
});
