export type Mode = 'source' | 'preview';

export function currentMode(): Mode {
  if (cachedMode !== undefined) {
    return cachedMode;
  }

  try {
    cachedMode = localStorage.getItem(ModeCacheKey) === 'preview' ? 'preview' : 'source';
  } catch {
    console.error('Failed to read quick look mode from localStorage');
    cachedMode = 'source';
  }

  return cachedMode;
}

export function saveMode(mode: Mode) {
  cachedMode = mode;
  try {
    localStorage.setItem(ModeCacheKey, mode);
  } catch {
    console.error('Failed to write quick look mode to localStorage');
  }
}

let cachedMode: Mode | undefined;
const ModeCacheKey = 'ui.quicklook-mode';
