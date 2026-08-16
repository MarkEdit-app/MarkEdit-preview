import { EditorView } from '@codemirror/view';

export const hiddenSyntaxTheme = EditorView.baseTheme({
  // Keep hidden source measurable so WebKit can resolve pointer positions.
  '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource *': {
    fontSize: '0.01px !important',
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
});
