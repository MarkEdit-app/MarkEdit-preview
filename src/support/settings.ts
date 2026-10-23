import { MarkEdit } from 'markedit-api';
import type { JSONObject, JSONValue } from 'markedit-api';
import type { MarkdownIt } from 'markdown-it';
import type { MathDelimiter } from 'markedit-katex';
import type { MermaidConfig } from 'mermaid';
import type { ColorScheme } from '../shared/types';

export type InlineRenderingType = 'image' | 'table' | 'math' | 'mermaid' | 'html';

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
const mermaid = toObject(rootValue.mermaid);

export const syncScroll = toBoolean(rootValue.syncScroll);
export const hidePreviewButtons = toBoolean(rootValue.hidePreviewButtons);
export const syntaxAutoDetect = toBoolean(rootValue.syntaxAutoDetect, false);
export const imageHoverPreview = toBoolean(rootValue.imageHoverPreview, false);

/**
 * @deprecated Use inlineRendering instead.
 */
export const inlineImages = toBoolean(rootValue.inlineImages, false);
export const inlineRendering: readonly InlineRenderingType[] = Array.isArray(rootValue.inlineRendering)
  ? rootValue.inlineRendering.filter((value): value is InlineRenderingType =>
    value === 'image' || value === 'table' || value === 'math' || value === 'mermaid' || value === 'html')
  : inlineImages ? ['image', 'math', 'mermaid'] : ['math', 'mermaid'];

export const themeName = (rootValue.themeName ?? 'github') as string;
export const showRawHtml = themeName === 'none';
export const styledHtmlColorScheme = (rootValue.styledHtmlColorScheme ?? rootValue.styledHtmlTheme ?? 'auto') as ColorScheme; // styledHtmlTheme for backward compatibility
export const mathDelimiters = toMathDelimiters(rootValue.mathDelimiters);
export const viewModes = (changeMode.modes ?? Constants.defaultModes) as string[];
export const keyboardShortcut = toObject(changeMode.hotKey);
export const markdownItPreset = (markdownIt.preset ?? Constants.defaultPreset) as Extract<Parameters<MarkdownIt['configure']>[0], string>;
export const markdownItOptions = toObject(markdownIt.options);
export const mermaidLightTheme = toMermaidTheme(mermaid.lightTheme, 'lightTheme', 'default');
export const mermaidDarkTheme = toMermaidTheme(mermaid.darkTheme, 'darkTheme', 'dark');

function toObject(jsonValue: JSONValue, defaultValue = {}): JSONObject {
  return jsonValue ?? defaultValue;
}

function toBoolean(jsonValue: JSONValue, defaultValue = true) {
  return (jsonValue ?? defaultValue) as boolean;
}

function toMathDelimiters(value: unknown): MathDelimiter[] | undefined {
  if (!value) {
    return undefined;
  }

  const isDelimiter = (delimiter: unknown): delimiter is MathDelimiter =>
    delimiter !== null && typeof delimiter === 'object'
    && 'left' in delimiter && typeof delimiter.left === 'string'
    && 'right' in delimiter && typeof delimiter.right === 'string'
    && 'display' in delimiter && typeof delimiter.display === 'boolean';

  if (!Array.isArray(value) || !value.every(isDelimiter)) {
    throw new TypeError('Invalid mathDelimiters setting: expected an array of { left: string, right: string, display: boolean }');
  }

  return value;
}

function toMermaidTheme(value: unknown, key: string, defaultValue: NonNullable<MermaidConfig['theme']>): NonNullable<MermaidConfig['theme']> {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  const themes: readonly NonNullable<MermaidConfig['theme']>[] = [
    'default', 'base', 'dark', 'forest', 'neutral', 'neo', 'neo-dark',
    'redux', 'redux-dark', 'redux-color', 'redux-dark-color', 'null',
  ];

  const theme = themes.find(name => name === value);
  if (theme === undefined) {
    throw new TypeError(`Invalid mermaid.${key} setting: expected a supported Mermaid theme name`);
  }

  return theme;
}
