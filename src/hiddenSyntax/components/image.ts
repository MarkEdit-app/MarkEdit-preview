import { WidgetType } from '@codemirror/view';
import { resolveImageURL } from '../../features/image';

export class InlineImageWidget extends WidgetType {
  constructor(
    private readonly destination: string,
    private readonly label: string,
  ) {
    super();
  }

  toDOM() {
    const image = document.createElement('img');
    image.className = 'cm-md-syntaxHiddenImage';
    image.src = resolveImageURL(this.destination);
    image.alt = this.label;
    image.title = this.destination;
    image.draggable = false;
    return image;
  }

  eq(other: InlineImageWidget) {
    return other.destination === this.destination && other.label === this.label;
  }

  ignoreEvent() {
    return false;
  }
}
