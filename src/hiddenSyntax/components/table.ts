import { EditorSelection, StateEffect, type Text } from '@codemirror/state';
import { WidgetType, EditorView } from '@codemirror/view';
import DOMPurify from 'dompurify';
import { MarkEdit } from 'markedit-api';
import { editorThemeCss } from '../../styling';
import { resolveImageURL } from '../../features/image';
import type { renderTableBlocks } from '../../render';

export const tableRenderFailed = StateEffect.define<{ doc: Text; from: number; to: number }>();
type RenderTables = () => ReturnType<typeof renderTableBlocks>;

/**
 * Render a read-only table, inspired by BlaisedEstais: https://github.com/MarkEdit-app/MarkEdit-preview/issues/188#issuecomment-5696116600
 */
export class TableWidget extends WidgetType {
  constructor(
    private readonly doc: Text,
    private readonly from: number,
    private readonly to: number,
    private readonly render: RenderTables,
    private readonly referenceContext = '',
  ) {
    super();
  }

  private get source() {
    return this.doc.sliceString(this.from, this.to);
  }

  toDOM(view: EditorView) {
    const container = document.createElement('div');
    container.className = 'cm-md-syntaxHiddenTable';
    const root = container.attachShadow({ mode: 'open' });
    const theme = document.createElement('style');
    const updateTheme = () => {
      theme.textContent = editorThemeCss(MarkEdit.editorConfig?.theme ?? 'github', view.state.facet(EditorView.darkTheme));
      view.requestMeasure();
    };

    updateTheme();
    window.addEventListener('editor-colors-changed', updateTheme);
    disposables.set(container, () => window.removeEventListener('editor-colors-changed', updateTheme));

    const style = document.createElement('style');
    style.textContent = `
      :host { display: block; }
      .markdown-body { font: inherit; min-width: 0; white-space: normal; word-break: normal; overflow-wrap: break-word; overflow-x: auto; }
      .markdown-body > table { display: table; width: auto; max-width: min(100%, 960px); margin: 0; overflow: visible; }
      .source { white-space: pre-wrap; }
    `;

    const body = document.createElement('div');
    body.className = 'markdown-body source';
    body.textContent = this.source;
    root.append(theme, style, body);

    const reveal = (event: MouseEvent) => {
      if (event.button !== 0 || event.shiftKey || event.altKey || event.metaKey || event.ctrlKey) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      view.dispatch({ selection: EditorSelection.cursor(view.posAtDOM(container)), scrollIntoView: false });
      view.focus();
    };

    container.addEventListener('mousedown', reveal);
    container.addEventListener('click', event => event.preventDefault());
    root.addEventListener('load', () => view.requestMeasure(), true);
    root.addEventListener('error', () => view.requestMeasure(), true);

    const fail = () => {
      if (container.isConnected) {
        const from = view.posAtDOM(container);
        view.dispatch({ effects: tableRenderFailed.of({ doc: view.state.doc, from, to: from + this.source.length }) });
      }
    };

    void Promise.all([
      this.render(),
      __FULL_BUILD__ ? import('../../../styles/katex.css?raw').then(module => module.default) : '',
    ]).then(([tables, mathCss]) => {
      if (!container.isConnected) {
        return;
      }

      const table = tables.find(candidate => candidate.fromLine === this.doc.lineAt(this.from).number
        && candidate.toLine === this.doc.lineAt(this.to).number);
      if (table === undefined) {
        fail();
        return;
      }

      const fragment = DOMPurify.sanitize(table.html, {
        RETURN_DOM_FRAGMENT: true,
        FORBID_TAGS: ['style', 'link', 'meta', 'form', 'input', 'button', 'select', 'textarea', 'iframe', 'object', 'embed', 'audio', 'video'],
        FORBID_ATTR: ['tabindex', 'autofocus', 'contenteditable'],
        SANITIZE_NAMED_PROPS: true,
      });

      const rendered = fragment.querySelector('table');
      if (rendered === null) {
        fail();
        return;
      }

      rendered.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
      rendered.querySelectorAll('img').forEach(image => {
        const source = image.getAttribute('src');
        if (source !== null) {
          image.src = resolveImageURL(source);
        }
      });

      style.textContent += mathCss;
      body.classList.remove('source');
      body.replaceChildren(rendered);
      view.requestMeasure();
    }).catch(fail);

    return container;
  }

  destroy(dom: HTMLElement) {
    disposables.get(dom)?.();
    disposables.delete(dom);
  }

  eq(other: TableWidget) {
    return other.source === this.source && other.referenceContext === this.referenceContext;
  }

  ignoreEvent() {
    return false;
  }
}

const disposables = new WeakMap<HTMLElement, () => void>();
