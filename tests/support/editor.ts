import { EditorView } from '@codemirror/view';
import { EditorSelection } from '@codemirror/state';
import type { Extension } from '@codemirror/state';
import { yamlFrontmatter as frontMatter } from '@codemirror/lang-yaml';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { markdownExtensions } from './markdown';

declare global {
  interface Window {
    editor: EditorView;
  }
}

export function setUp(doc: string, extensions: Extension = []) {
  const content = markdown({ base: markdownLanguage, extensions: markdownExtensions });
  const editor = new EditorView({
    doc,
    parent: document.body,
    extensions: [
      ...[extensions],
      frontMatter({ content: content.language }),
    ],
  });

  window.editor = editor;
}

export function setText(doc: string) {
  window.editor.dispatch({
    changes: {
      insert: doc,
      from: 0, to: window.editor.state.doc.length,
    },
    selection: EditorSelection.cursor(0),
  });
}

export function insertText(text: string) {
  window.editor.dispatch({
    changes: {
      insert: text,
      from: window.editor.state.doc.length,
    },
  });
}

export function getText() {
  return window.editor.state.doc.toString();
}

export function selectAll() {
  selectRange(0);
}

export function selectRange(from: number, to?: number) {
  window.editor.dispatch({
    selection: EditorSelection.range(from, to ?? window.editor.state.doc.length),
  });
}
