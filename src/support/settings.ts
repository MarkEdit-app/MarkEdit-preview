import { MarkEdit } from 'markedit-api';
import { hasExtensionManager } from './host';
import type { JSONObject, JSONValue } from 'markedit-api';
import type { PresetName } from 'markdown-it';
import type { ColorScheme } from '../shared/types';

const Constants = {
  rootValueKey: 'extension.markeditPreview',
  defaultModes: ['edit', 'side-by-side', 'preview', 'syntax-hidden'],
  defaultPreset: 'default',
};

// MarkEdit.userSettings requires MarkEdit 1.24.0+
const userSettings = toObject(MarkEdit.userSettings);
const rootValue = toObject(userSettings[Constants.rootValueKey]);
const changeMode = toObject(rootValue.changeMode);
const markdownIt = toObject(rootValue.markdownIt);

const updateBehaviors = ['automatic', 'quiet', 'notify', 'never'] as const;
export type UpdateBehavior = (typeof updateBehaviors)[number];

export const updateBehavior: UpdateBehavior = (() => {
  if (hasExtensionManager()) {
    return 'never';
  }

  const behavior = rootValue.updateBehavior as string | undefined;
  if (behavior && (updateBehaviors as readonly string[]).includes(behavior)) {
    return behavior as UpdateBehavior;
  }

  return toBoolean(rootValue.autoUpdate) ? 'quiet' : 'never';
})();

export const syncScroll = toBoolean(rootValue.syncScroll);
export const hidePreviewButtons = toBoolean(rootValue.hidePreviewButtons);
export const syntaxAutoDetect = toBoolean(rootValue.syntaxAutoDetect, false);
export const imageHoverPreview = toBoolean(rootValue.imageHoverPreview, false);
export const inlineImages = toBoolean(rootValue.inlineImages, false);
export const themeName = (rootValue.themeName ?? 'github') as string;
export const isAutoTheme = themeName === 'auto';
export const showRawHtml = themeName === 'none';

/**
 * The theme to use right now. For `"themeName": "auto"`, it follows the app's
 * current theme via `MarkEdit.editorConfig.theme`: the `-light`/`-dark`/`-dawn`
 * suffix maps to the theme's base name and pins the color scheme, so a dark
 * editor theme keeps the preview dark regardless of the system appearance.
 */
export function currentTheme(): { name: string; scheme?: Exclude<ColorScheme, 'auto'> } {
  if (!isAutoTheme) {
    return { name: themeName };
  }

  const appTheme = ((MarkEdit.editorConfig as { theme?: unknown }).theme ?? 'github-light') as string;
  const match = /^(.+?)(?:-(light|dark|dawn))?$/.exec(appTheme);
  const suffix = match?.[2];
  return {
    name: match?.[1] ?? 'github',
    // Suffix-less app themes (dracula, cobalt, night-owl, ...) are all dark
    scheme: suffix === 'light' || suffix === 'dawn' ? 'light' : 'dark',
  };
}
export const styledHtmlColorScheme = (rootValue.styledHtmlColorScheme ?? rootValue.styledHtmlTheme ?? 'auto') as ColorScheme; // styledHtmlTheme for backward compatibility
export const mathDelimiters = rootValue.mathDelimiters;
export const viewModes = (changeMode.modes ?? Constants.defaultModes) as string[];
export const keyboardShortcut = toObject(changeMode.hotKey);
export const markdownItPreset = (markdownIt.preset ?? Constants.defaultPreset) as PresetName;
export const markdownItOptions = toObject(markdownIt.options);

function toObject(jsonValue: JSONValue, defaultValue = {}): JSONObject {
  return jsonValue ?? defaultValue;
}

function toBoolean(jsonValue: JSONValue, defaultValue = true) {
  return (jsonValue ?? defaultValue) as boolean;
}
