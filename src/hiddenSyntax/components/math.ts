import { WidgetType, type EditorView } from '@codemirror/view';
import { renderKatexHTML } from '../../render';

export class BlockMathWidget extends WidgetType {
  constructor(private readonly source: string) {
    super();
  }

  toDOM(view: EditorView) {
    const container = document.createElement('div');
    container.className = 'cm-md-syntaxHiddenBlockMath';

    void renderKatexHTML(this.source).then(html => {
      if (!container.isConnected) {
        return;
      }

      container.innerHTML = html;
      view.requestMeasure();
    });

    return container;
  }

  eq(other: BlockMathWidget) {
    return other.source === this.source;
  }

  ignoreEvent() {
    return false;
  }
}
