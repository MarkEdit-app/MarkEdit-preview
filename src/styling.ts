import githubBase from '../styles/github/base.css?raw';
import githubLight from '../styles/github/light.css?raw';
import githubDark from '../styles/github/dark.css?raw';

import cobaltDark from '../styles/cobalt/dark.css?raw';
import draculaDark from '../styles/dracula/dark.css?raw';
import minimalLight from '../styles/minimal/light.css?raw';
import minimalDark from '../styles/minimal/dark.css?raw';
import nightOwlDark from '../styles/night-owl/dark.css?raw';
import rosePineLight from '../styles/rose-pine/light.css?raw';
import rosePineDark from '../styles/rose-pine/dark.css?raw';
import solarizedLight from '../styles/solarized/light.css?raw';
import solarizedDark from '../styles/solarized/dark.css?raw';
import synthwave84Dark from '../styles/synthwave84/dark.css?raw';
import winterIsComingLight from '../styles/winter-is-coming/light.css?raw';
import winterIsComingDark from '../styles/winter-is-coming/dark.css?raw';
import xcodeLight from '../styles/xcode/light.css?raw';
import xcodeDark from '../styles/xcode/dark.css?raw';

import alertsBase from '../styles/alerts/base.css?raw';
import alertsLight from '../styles/alerts/light.css?raw';
import alertsDark from '../styles/alerts/dark.css?raw';

import hljsBase from '../styles/hljs/base.css?raw';
import hljsDark from '../styles/hljs/dark.css?raw';

import codeCopyBase from '../styles/code-copy/base.css?raw';
import codeCopyLight from '../styles/code-copy/light.css?raw';
import codeCopyDark from '../styles/code-copy/dark.css?raw';

export type ColorTheme = 'light' | 'dark' | 'auto';
export type PreviewTheme = typeof previewThemeNames[number];

export const previewThemeNames = [
  'github',
  'cobalt',
  'dracula',
  'minimal',
  'night-owl',
  'rose-pine',
  'solarized',
  'synthwave84',
  'winter-is-coming',
  'xcode',
] as const;

type ThemeVariants = { light?: string; dark?: string };

const previewThemes: Record<string, ThemeVariants> = {
  'github': { light: githubLight, dark: githubDark },
  'cobalt': { dark: cobaltDark },
  'dracula': { dark: draculaDark },
  'minimal': { light: minimalLight, dark: minimalDark },
  'night-owl': { dark: nightOwlDark },
  'rose-pine': { light: rosePineLight, dark: rosePineDark },
  'solarized': { light: solarizedLight, dark: solarizedDark },
  'synthwave84': { dark: synthwave84Dark },
  'winter-is-coming': { light: winterIsComingLight, dark: winterIsComingDark },
  'xcode': { light: xcodeLight, dark: xcodeDark },
};

export function coreCss(themeName: string = 'github', theme: ColorTheme = 'auto') {
  const variants = previewThemes[themeName] ?? previewThemes['github'];
  const lightBg = extractBgColor(variants.light) ?? '#ffffff';
  const darkBg = extractBgColor(variants.dark) ?? '#0d1117';

  const styles = [
    '.markdown-body { padding: 25px; }',
    ...createCss(theme, `body { background: ${lightBg}; }`, `body { background: ${darkBg}; }`),
  ];

  return styles.join('\n');
}

export function previewThemeCss(themeName: string = 'github', theme: ColorTheme = 'auto') {
  const variants = previewThemes[themeName] ?? previewThemes['github'];
  const light = variants.light ?? variants.dark!;
  const dark = variants.dark ?? variants.light!;

  const styles = [
    githubBase,
    ...createCss(theme, light, dark),
  ];

  return styles.join('\n');
}

export function alertsCss(theme: ColorTheme = 'auto') {
  const styles = [
    alertsBase,
    ...createCss(theme, alertsLight, alertsDark),
  ];

  return styles.join('\n');
}

export function hljsCss(theme: ColorTheme = 'auto') {
  return createCss(theme, hljsBase, hljsDark).join('\n');
}

export function codeCopyCss(theme: ColorTheme = 'auto') {
  const styles = [
    codeCopyBase,
    ...createCss(theme, codeCopyLight, codeCopyDark),
  ];

  return styles.join('\n');
}

function createCss(theme: ColorTheme, lightCss: string, darkCss: string): string[] {
  const styles: string[] = [];
  switch (theme) {
    case 'light': styles.push(lightCss); break;
    case 'dark': styles.push(darkCss); break;
    case 'auto':
      styles.push(`
        ${lightCss}
        @media (prefers-color-scheme: dark) {
          ${darkCss}
        }`,
      );
      break;
    default: break;
  }

  return styles;
}

function extractBgColor(css: string | undefined): string | undefined {
  const match = css?.match(/--bgColor-default:\s*([^;]+);/);
  return match?.[1]?.trim();
}
