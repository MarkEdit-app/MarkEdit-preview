import type { EditorState } from '@codemirror/state';
import { highlightingFor } from '@codemirror/language';
import { WidgetType } from '@codemirror/view';
import type { EditorView } from '@codemirror/view';
import type { Tag } from '@lezer/highlight';
import { followLinkAnchor, openLinkDestination } from '../navigation';

const icons = {
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg>',
};

export class LinkIconWidget extends WidgetType {
  private readonly highlightClasses: string;

  constructor(
    private readonly kind: keyof typeof icons,
    state: EditorState,
    private readonly destination: string,
    private readonly label: string,
    highlightTags: readonly Tag[],
  ) {
    super();
    this.highlightClasses = highlightingFor(state, highlightTags) ?? '';
  }

  toDOM(view: EditorView) {
    const icon = document.createElement('button');
    icon.type = 'button';
    icon.className = ['cm-md-syntaxHiddenLinkButton', this.highlightClasses].filter(Boolean).join(' ');
    icon.dataset.kind = this.kind;
    icon.title = this.destination;
    icon.innerHTML = icons[this.kind];
    icon.setAttribute('aria-label', this.destination || this.label);

    icon.addEventListener('click', event => {
      event.stopPropagation();
      if (this.destination.startsWith('#')) {
        followLinkAnchor(view, this.destination);
      } else if (this.destination !== '') {
        openLinkDestination(this.destination);
      }
    });

    return icon;
  }

  eq(other: LinkIconWidget) {
    return other.kind === this.kind
      && other.highlightClasses === this.highlightClasses
      && other.destination === this.destination
      && other.label === this.label;
  }

  ignoreEvent() {
    return true;
  }
}
