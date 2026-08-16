import { highlightingFor } from '@codemirror/language';
import type { EditorState, Range } from '@codemirror/state';
import { Decoration, WidgetType } from '@codemirror/view';
import type { SyntaxNodeRef } from '@lezer/common';
import { tags } from '@lezer/highlight';
import { selectionIntersects } from './selection';

export function horizontalRuleDecoration(node: SyntaxNodeRef, state: EditorState): Range<Decoration> | undefined {
  if (node.name !== 'HorizontalRule' || node.node.parent?.name !== 'Document') {
    return;
  }

  const line = state.doc.lineAt(node.from);
  if (selectionIntersects(state, line.from, line.to)) {
    return;
  }

  return Decoration.replace({
    widget: new HorizontalRuleWidget(highlightingFor(state, [tags.contentSeparator]) ?? ''),
  }).range(line.from, line.to);
}

class HorizontalRuleWidget extends WidgetType {
  constructor(private readonly highlightClass: string) {
    super();
  }

  eq(other: HorizontalRuleWidget) {
    return other.highlightClass === this.highlightClass;
  }

  toDOM() {
    const divider = document.createElement('span');
    divider.className = ['cm-md-syntaxHiddenHorizontalRule', this.highlightClass].filter(Boolean).join(' ');
    divider.setAttribute('role', 'separator');
    divider.setAttribute('aria-orientation', 'horizontal');
    return divider;
  }
}
