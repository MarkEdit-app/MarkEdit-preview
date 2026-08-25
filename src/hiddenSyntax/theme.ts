import { EditorView } from '@codemirror/view';

export const hiddenSyntaxTheme = EditorView.baseTheme({
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource *': {
    fontSize: '0px !important',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource:has(> *)': {
    fontSize: 'inherit !important',
    lineHeight: 'inherit !important',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark *': {
    fontSize: 'inherit !important',
    visibility: 'hidden',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark *': {
    fontSize: 'inherit !important',
    visibility: 'hidden',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBullet': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85em',
    pointerEvents: 'none',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBulletLayer, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteLayer': {
    zIndex: '0 !important',
  },
  '&.cm-md-syntaxHiddenMode *:has(> .cm-md-syntaxHiddenSource)::before': {
    display: 'none',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark + *::before': {
    display: 'none',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline': {
    height: '0',
    lineHeight: '0',
    overflow: 'hidden',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline *::before': {
    display: 'none',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeStart .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeStart), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeStart': {
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
    paddingInlineStart: '0.25em',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeEnd .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeEnd), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeEnd': {
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
    paddingInlineEnd: '0.25em',
  },
  '&.cm-md-syntaxHiddenMode .cm-lineNumbers .cm-gutterElement': {
    overflow: 'hidden',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteBar': {
    pointerEvents: 'none',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert': {
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: '1em',
    lineHeight: '1em',
    verticalAlign: 'middle',
    gap: '0.4em',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    textIndent: '0',
  },
  '&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]': {
    color: '#0969da',
  },
  '&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]': {
    color: '#1a7f37',
  },
  '&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]': {
    color: '#8250df',
  },
  '&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]': {
    color: '#9a6700',
  },
  '&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]': {
    color: '#d1242f',
  },
  '&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]': {
    color: '#2f81f7',
  },
  '&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]': {
    color: '#3fb950',
  },
  '&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]': {
    color: '#a371f7',
  },
  '&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]': {
    color: '#d29922',
  },
  '&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]': {
    color: '#f85149',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon': {
    display: 'inline-block',
    width: '1em',
    height: '1em',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon svg': {
    display: 'block',
    width: '100%',
    height: '100%',
    fill: 'currentColor',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton': {
    display: 'inline-block',
    appearance: 'none',
    width: '0.9em',
    height: '0.9em',
    padding: '0',
    border: '0',
    background: 'transparent',
    font: 'inherit',
    marginInlineStart: '0.25em',
    verticalAlign: '-0.1em',
    cursor: 'pointer',
  },
  ':where(&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton)': {
    color: 'inherit',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton svg': {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenHorizontalRule': {
    display: 'inline-block',
    width: '100%',
    borderTop: '2px solid currentColor',
    verticalAlign: 'middle',
    opacity: '0.35',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenImage': {
    display: 'inline-block',
    maxWidth: '100%',
    height: 'auto',
    verticalAlign: 'middle',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath': {
    boxSizing: 'border-box',
    width: '100%',
    paddingBlock: '0.5em',
    overflowX: 'auto',
    overflowY: 'hidden',
    textAlign: 'center',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath .katex-display': {
    margin: '0',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid': {
    boxSizing: 'border-box',
    width: '100%',
    paddingBlock: '0.5em',
    overflowX: 'auto',
    overflowY: 'hidden',
    textAlign: 'center',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid svg': {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    marginInline: 'auto',
  },
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaidError': {
    whiteSpace: 'pre-wrap',
    textAlign: 'start',
  },
});
