import { describe, it, expect } from 'vitest';
import { isRelativePath } from '../src/utils';

describe('isRelativePath', () => {
  it('should return true for paths starting with ../', () => {
    expect(isRelativePath('../assets/image.png')).toBe(true);
  });

  it('should return true for paths starting with ./', () => {
    expect(isRelativePath('./assets/image.png')).toBe(true);
  });

  it('should return true for bare relative paths', () => {
    expect(isRelativePath('assets/image.png')).toBe(true);
  });

  it('should return true for file names', () => {
    expect(isRelativePath('readme.md')).toBe(true);
  });

  it('should return false for http URLs', () => {
    expect(isRelativePath('http://example.com')).toBe(false);
  });

  it('should return false for https URLs', () => {
    expect(isRelativePath('https://example.com/page')).toBe(false);
  });

  it('should return false for anchor links', () => {
    expect(isRelativePath('#heading')).toBe(false);
  });

  it('should return false for mailto links', () => {
    expect(isRelativePath('mailto:user@example.com')).toBe(false);
  });

  it('should return false for data URIs', () => {
    expect(isRelativePath('data:image/png;base64,abc')).toBe(false);
  });

  it('should return false for protocol-relative URLs', () => {
    expect(isRelativePath('//example.com/page')).toBe(false);
  });

  it('should return false for ftp URLs', () => {
    expect(isRelativePath('ftp://files.example.com')).toBe(false);
  });

  it('should return false for tel links', () => {
    expect(isRelativePath('tel:+1234567890')).toBe(false);
  });

  it('should return false for javascript URIs', () => {
    expect(isRelativePath('javascript:void(0)')).toBe(false);
  });
});
