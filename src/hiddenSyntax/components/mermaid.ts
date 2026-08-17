import { WidgetType, type EditorView } from '@codemirror/view';
import { renderMermaidSVG } from '../../render';

export class MermaidWidget extends WidgetType {
  constructor(private readonly source: string) {
    super();
  }

  toDOM(view: EditorView) {
    const container = document.createElement('div');
    container.className = 'cm-md-syntaxHiddenMermaid';

    const colorScheme = matchMedia('(prefers-color-scheme: dark)');
    let renderVersion = 0;

    const render = () => {
      const version = ++renderVersion;
      void renderMermaidSVG(this.source).then(svg => {
        if (!container.isConnected || version !== renderVersion) {
          return;
        }

        container.classList.remove('cm-md-syntaxHiddenMermaidError');
        container.innerHTML = svg;
        view.requestMeasure();
      }, () => {
        if (!container.isConnected || version !== renderVersion) {
          return;
        }

        container.classList.add('cm-md-syntaxHiddenMermaidError');
        container.textContent = this.source;
        view.requestMeasure();
      });
    };

    const handleColorSchemeChange = () => render();
    colorScheme.addEventListener('change', handleColorSchemeChange);
    disposables.set(container, () => {
      renderVersion += 1;
      colorScheme.removeEventListener('change', handleColorSchemeChange);
    });

    render();
    return container;
  }

  destroy(dom: HTMLElement) {
    disposables.get(dom)?.();
    disposables.delete(dom);
  }

  eq(other: MermaidWidget) {
    return other.source === this.source;
  }

  ignoreEvent() {
    return false;
  }
}

const disposables = new WeakMap<HTMLElement, () => void>();
