import { EditorSelection, type EditorState } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import { EditorView, WidgetType } from '@codemirror/view';
import { parser } from '@lezer/html';
import { MarkEdit } from 'markedit-api';
import { editorThemeCss } from '../../styling';
import { resolveImageURL } from '../../features/image';
import DOMPurify from 'dompurify';

export function htmlFragments(state: EditorState, renderTables: boolean) {
  const source = state.doc.toString();
  const allowed: { from: number; to: number; limit: number }[] = [];
  const quoteMarks: { from: number; to: number }[] = [];

  syntaxTree(state).iterate({
    enter: node => {
      if (['FencedCode', 'CodeBlock', 'InlineCode', 'Frontmatter', 'CommentBlock', 'BlockMath'].includes(node.name)
        || (renderTables && node.name === 'Table')) {
        return false;
      }

      if (node.name === 'HTMLBlock' || node.name === 'HTMLTag') {
        let limit = state.doc.length;
        for (let parent = node.node.parent; parent !== null; parent = parent.parent) {
          if (parent.name === 'ListItem' || parent.name === 'Blockquote') {
            limit = Math.min(limit, parent.to);
          }
        }

        allowed.push({ from: node.from, to: node.to, limit });
        if (node.name === 'HTMLTag') {
          return false;
        }
      } else if (node.name === 'QuoteMark') {
        quoteMarks.push({ from: node.from, to: node.to });
      }
    },
  });

  if (allowed.length === 0) {
    return [];
  }

  let rangeIndex = 0;
  const input = source.replace(/</g, (character: string, offset: number) => {
    while (rangeIndex < allowed.length && allowed[rangeIndex].to <= offset) {
      rangeIndex++;
    }

    const range = allowed[rangeIndex];
    return range !== undefined && range.from <= offset ? character : ' ';
  });

  const fragments: { from: number; to: number; source: string }[] = [];
  rangeIndex = 0;
  parser.parse(input).iterate({
    enter: node => {
      if (node.name !== 'Element') {
        return;
      }

      const { from, to } = node;
      while (rangeIndex < allowed.length && allowed[rangeIndex].to <= from) {
        rangeIndex++;
      }

      const range = allowed[rangeIndex];
      let content = source.slice(from, to);
      for (let index = quoteMarks.length - 1; index >= 0; index--) {
        const mark = quoteMarks[index];
        if (mark.from >= from && mark.to <= to) {
          content = content.slice(0, mark.from - from) + content.slice(mark.to - from);
        }
      }

      if (range !== undefined && range.from <= from && to <= range.limit
        && isCompleteHtml(content)) {
        fragments.push({ from, to, source: content });
        return false;
      }
    },
  });

  return fragments;
}

export function isCompleteHtml(source: string) {
  const tree = parser.parse(source);
  let complete = true;
  let elements = 0;
  tree.iterate({
    enter: node => {
      if (node.type.isError || node.name === 'MismatchedCloseTag') {
        complete = false;
      }

      if (node.name === 'Element') {
        elements++;
        const first = node.node.firstChild;
        const last = node.node.lastChild;
        if (first?.name !== 'SelfClosingTag' && last?.name !== 'CloseTag') {
          complete = false;
        }
      } else if (node.node.parent?.name === 'Document'
        && (node.name !== 'Text' || source.slice(node.from, node.to).trim() !== '')) {
        complete = false;
      }
    },
  });

  return complete && elements > 0;
}

export class HtmlWidget extends WidgetType {
  readonly block: boolean;

  private constructor(readonly source: string, private readonly fragment: DocumentFragment) {
    super();
    this.block = fragment.querySelector('address, article, aside, blockquote, dd, details, dialog, div, dl, dt, fieldset, figcaption, figure, footer, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, ol, p, pre, section, table, ul') !== null;
  }

  static create(source: string) {
    if (!isCompleteHtml(source)) {
      return undefined;
    }

    const fragment = DOMPurify.sanitize(source, {
      RETURN_DOM_FRAGMENT: true,
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['script', 'style', 'link', 'meta', 'base', 'form', 'input', 'button', 'select', 'textarea', 'iframe', 'object', 'embed', 'audio', 'video'],
      FORBID_ATTR: ['tabindex', 'autofocus', 'contenteditable'],
      SANITIZE_NAMED_PROPS: true,
    });

    if (fragment.childElementCount === 0) {
      return undefined;
    }

    const style = document.createElement('span').style;
    fragment.querySelectorAll<HTMLElement>('[style]').forEach(element => {
      style.cssText = element.getAttribute('style') ?? '';
      element.removeAttribute('style');
      for (const property of allowedInlineStyles) {
        const value = style.getPropertyValue(property);
        if (value !== '') {
          element.style.setProperty(property, value);
        }
      }
    });

    fragment.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
    fragment.querySelectorAll('img').forEach(image => {
      const imageSource = image.getAttribute('src');
      if (imageSource !== null) {
        image.src = resolveImageURL(imageSource);
      }
    });

    return new HtmlWidget(source, fragment);
  }

  toDOM(view: EditorView) {
    const container: HTMLElement = document.createElement(this.block ? 'div' : 'span');
    container.className = 'cm-md-syntaxHiddenHtml';

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
    style.textContent = this.block
      ? ':host { display: block; } .markdown-body { font: inherit; white-space: normal; overflow-wrap: anywhere; overflow: auto; }'
      : ':host { display: inline; } .markdown-body { display: inline; font: inherit; white-space: normal; overflow-wrap: anywhere; } .markdown-body::before, .markdown-body::after { content: none; }';

    const body = document.createElement(this.block ? 'div' : 'span');
    body.className = 'markdown-body';
    body.inert = true;
    body.append(this.fragment.cloneNode(true));
    root.append(theme, style, body);

    container.addEventListener('mousedown', event => {
      if (event.button !== 0 || event.shiftKey || event.altKey || event.metaKey || event.ctrlKey) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      view.dispatch({ selection: EditorSelection.cursor(view.posAtDOM(container)), scrollIntoView: false });
      view.focus();
    });

    container.addEventListener('click', event => event.preventDefault());
    root.addEventListener('load', () => view.requestMeasure(), true);
    root.addEventListener('error', () => view.requestMeasure(), true);
    return container;
  }

  updateDOM(container: HTMLElement, view: EditorView) {
    if ((container.tagName === 'DIV') !== this.block) {
      return false;
    }

    container.shadowRoot!.querySelector('.markdown-body')!.replaceChildren(this.fragment.cloneNode(true));
    view.requestMeasure();
    return true;
  }

  eq(other: HtmlWidget) {
    return this.source === other.source;
  }

  destroy(container: HTMLElement) {
    disposables.get(container)?.();
    disposables.delete(container);
  }

  ignoreEvent() {
    return false;
  }
}

const disposables = new WeakMap<HTMLElement, () => void>();

const allowedInlineStyles = [
  'text-align', 'color', 'background-color', 'font-family', 'font-weight', 'font-style',
  'text-decoration-line', 'text-decoration-color', 'text-decoration-style',
];
