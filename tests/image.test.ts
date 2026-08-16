// @vitest-environment happy-dom
import { describe, expect, test, vi } from 'vitest';
import { resolveImageURL } from '../src/features/image';

vi.mock('markedit-api', () => ({ MarkEdit: {} }));

describe('resolveImageURL', () => {
  test('keeps web and data image URLs unchanged', () => {
    expect(resolveImageURL('https://example.com/image.png')).toBe('https://example.com/image.png');
    expect(resolveImageURL('http://example.com/image.png')).toBe('http://example.com/image.png');
    expect(resolveImageURL('//example.com/image.png')).toBe('//example.com/image.png');
    expect(resolveImageURL('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
  });

  test('routes local image paths through the image loader', () => {
    expect(resolveImageURL('images/photo.png')).toBe('image-loader://images/photo.png');
    expect(resolveImageURL('../photo.png')).toBe('image-loader://../photo.png');
  });
});
