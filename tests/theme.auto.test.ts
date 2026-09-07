import { describe, expect, test, vi, beforeEach } from 'vitest';

const mockState = {
  appTheme: 'github-light' as string | undefined,
};

vi.mock('markedit-api', () => ({
  MarkEdit: {
    userSettings: { 'extension.markeditPreview': { themeName: 'auto' } },
    get editorConfig() {
      return { theme: mockState.appTheme };
    },
  },
}));

import { currentTheme, isAutoTheme } from '../src/support/settings';

beforeEach(() => {
  mockState.appTheme = 'github-light';
});

describe('currentTheme with "auto"', () => {
  test('is recognized as auto', () => {
    expect(isAutoTheme).toBe(true);
  });

  test('maps light-suffixed app themes', () => {
    mockState.appTheme = 'github-light';
    expect(currentTheme()).toEqual({ name: 'github', scheme: 'light' });

    mockState.appTheme = 'solarized-light';
    expect(currentTheme()).toEqual({ name: 'solarized', scheme: 'light' });

    mockState.appTheme = 'winter-is-coming-light';
    expect(currentTheme()).toEqual({ name: 'winter-is-coming', scheme: 'light' });
  });

  test('maps dark-suffixed app themes', () => {
    mockState.appTheme = 'xcode-dark';
    expect(currentTheme()).toEqual({ name: 'xcode', scheme: 'dark' });

    mockState.appTheme = 'minimal-dark';
    expect(currentTheme()).toEqual({ name: 'minimal', scheme: 'dark' });
  });

  test('maps rose-pine-dawn to the light variant', () => {
    mockState.appTheme = 'rose-pine-dawn';
    expect(currentTheme()).toEqual({ name: 'rose-pine', scheme: 'light' });
  });

  test('treats suffix-less app themes as dark', () => {
    for (const name of ['dracula', 'cobalt', 'synthwave84', 'night-owl', 'rose-pine']) {
      mockState.appTheme = name;
      expect(currentTheme()).toEqual({ name, scheme: 'dark' });
    }
  });

  test('falls back gracefully when the app theme is missing', () => {
    mockState.appTheme = undefined;
    expect(currentTheme()).toEqual({ name: 'github', scheme: 'light' });
  });
});
