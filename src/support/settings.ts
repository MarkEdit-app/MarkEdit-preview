import { MarkEdit } from 'markedit-api';
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

export const syncScroll = toBoolean(rootValue.syncScroll);
export const hidePreviewButtons = toBoolean(rootValue.hidePreviewButtons);
export const syntaxAutoDetect = toBoolean(rootValue.syntaxAutoDetect, false);
export const imageHoverPreview = toBoolean(rootValue.imageHoverPreview, false);
export const inlineImages = toBoolean(rootValue.inlineImages, false);
export const themeName = (rootValue.themeName ?? 'github') as string;
export const showRawHtml = themeName === 'none';
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
