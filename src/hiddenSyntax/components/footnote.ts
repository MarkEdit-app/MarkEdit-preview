import { WidgetType } from '@codemirror/view';

export class FootnoteDefinitionSuffix extends WidgetType {
  constructor(private readonly text: string) {
    super();
  }

  eq(other: FootnoteDefinitionSuffix) {
    return other.text === this.text;
  }

  toDOM() {
    const suffix = document.createElement('span');
    suffix.textContent = this.text;
    return suffix;
  }

  ignoreEvent() {
    return false;
  }
}
