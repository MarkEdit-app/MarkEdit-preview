import { MarkEdit } from 'markedit-api';
import type { JSONObject, JSONValue } from 'markedit-api';
import type { PresetName } from 'markdown-it';

const Constants = {
  rootValueKey: 'extension.markeditPreview',
  defaultModes: ['side-by-side', 'preview'],
  defaultPreset: 'default',
};

// MarkEdit.userSettings requires MarkEdit 1.24.0+
const userSettings = toObject(MarkEdit.userSettings);
const rootValue = toObject(userSettings[Constants.rootValueKey]);
const changeMode = toObject(rootValue.changeMode);
const markdownIt = toObject(rootValue.markdownIt);

export const autoUpdate = toBoolean(rootValue.autoUpdate);
export const syncScroll = toBoolean(rootValue.syncScroll);
export const previewModes = (changeMode.modes ?? Constants.defaultModes) as string[];
export const keyboardShortcut = toObject(changeMode.hotKey);
export const markdownItPreset = (markdownIt.preset ?? Constants.defaultPreset) as PresetName;
export const markdownItOptions = toObject(markdownIt.options);

function toObject(jsonValue: JSONValue, defaultValue = {}) {
  return (jsonValue ?? defaultValue) as JSONObject;
}

function toBoolean(jsonValue: JSONValue, defaultValue = true) {
  return (jsonValue ?? defaultValue) as boolean;
}
