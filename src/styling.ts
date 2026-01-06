import githubBase from '../styles/github/base.css?raw';
import githubLight from '../styles/github/light.css?raw';
import githubDark from '../styles/github/dark.css?raw';

import alertsBase from '../styles/alerts/base.css?raw';
import alertsLight from '../styles/alerts/light.css?raw';
import alertsDark from '../styles/alerts/dark.css?raw';

import hljsBase from '../styles/hljs/base.css?raw';
import hljsDark from '../styles/hljs/dark.css?raw';

export type ColorTheme = 'light' | 'dark' | 'auto';

export function coreCss(theme: ColorTheme = 'auto') {
  const styles = [
    '.markdown-body { padding: 25px; }',
    ...createCss(theme, 'body { background: #ffffff; }', 'body { background: #0d1117; }'),
  ];

  return styles.join('\n');
}

export function githubCss(theme: ColorTheme = 'auto') {
  const styles = [
    githubBase,
    ...createCss(theme, githubLight, githubDark),
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
