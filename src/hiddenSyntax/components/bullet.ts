import { syntaxTree } from '@codemirror/language';
import { Direction, RectangleMarker, layer } from '@codemirror/view';
import type { EditorView } from '@codemirror/view';
import { unorderedListSyntax } from '../unorderedList';

export interface UnorderedListBulletDescriptor {
  from: number;
  to: number;
}

export const unorderedListBullets = layer({
  above: false,
  class: 'cm-md-syntaxHiddenListBulletLayer',
  markers: unorderedListBulletMarkers,
  update: update => update.docChanged
    || update.selectionSet
    || update.viewportChanged
    || update.geometryChanged
    || update.transactions.some(transaction => transaction.reconfigured),
  mount: element => element.setAttribute('aria-hidden', 'true'),
});

export function unorderedListBulletDescriptors(view: EditorView): UnorderedListBulletDescriptor[] {
  const descriptors: UnorderedListBulletDescriptor[] = [];

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: node => {
        const syntax = unorderedListSyntax(node, view.state);
        if (syntax !== undefined && !syntax.task) {
          descriptors.push({ from: syntax.from, to: syntax.to });
        }
      },
    });
  }

  return descriptors;
}

export function unorderedListBulletMarkers(view: EditorView) {
  const base = layerBase(view);

  return unorderedListBulletDescriptors(view).flatMap(descriptor => {
    const rect = view.coordsForChar(descriptor.from);
    if (rect === null) {
      return [];
    }

    const style = sourceStyle(view, descriptor.from);
    return [new BulletMarker(
      rect.left - base.left,
      rect.top - base.top,
      rect.right - rect.left,
      rect.bottom - rect.top,
      style.color,
      style.opacity,
      style.textShadow,
    )];
  });
}

class BulletMarker extends RectangleMarker {
  constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    private readonly color: string,
    private readonly opacity: number,
    private readonly textShadow: string,
  ) {
    super('cm-md-syntaxHiddenListBullet', left, top, width, height);
  }

  draw() {
    const element = super.draw();
    element.textContent = '\u2022';
    element.style.color = this.color;
    element.style.opacity = `${this.opacity}`;
    element.style.textShadow = this.textShadow;
    return element;
  }

  update(element: HTMLElement, previous: BulletMarker) {
    if (!super.update(element, previous)) {
      return false;
    }

    element.style.color = this.color;
    element.style.opacity = `${this.opacity}`;
    element.style.textShadow = this.textShadow;
    return true;
  }

  eq(other: BulletMarker) {
    return super.eq(other)
      && this.color === other.color
      && this.opacity === other.opacity
      && this.textShadow === other.textShadow;
  }
}

function sourceStyle(view: EditorView, position: number) {
  const node = view.domAtPos(position).node;
  const source = node instanceof HTMLElement ? node : node.parentElement;
  const computedStyle = getComputedStyle(source ?? view.contentDOM);
  let opacity = 1;

  for (let element = source; element !== null && element !== view.scrollDOM; element = element.parentElement) {
    const value = parseFloat(getComputedStyle(element).opacity);
    if (!Number.isNaN(value)) {
      opacity *= value;
    }
  }

  return {
    color: computedStyle.color,
    opacity,
    textShadow: computedStyle.textShadow === 'none' ? '' : computedStyle.textShadow,
  };
}

function layerBase(view: EditorView) {
  const rect = view.scrollDOM.getBoundingClientRect();
  const left = view.textDirection === Direction.LTR
    ? rect.left
    : rect.right - view.scrollDOM.clientWidth * view.scaleX;

  return {
    left: left - view.scrollDOM.scrollLeft * view.scaleX,
    top: rect.top - view.scrollDOM.scrollTop * view.scaleY,
  };
}
