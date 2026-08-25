import { syntaxTree } from '@codemirror/language';
import { Direction, RectangleMarker, layer } from '@codemirror/view';
import type { EditorView } from '@codemirror/view';
import type { SyntaxNode } from '@lezer/common';
import { blockquoteStyleRange } from '../blockquote';
import { selectionReveals } from '../selection';

export interface BlockquoteBarDescriptor {
  line: number;
  ownerFrom: number;
  anchor?: number;
  depth: number;
}

interface BlockquoteOwner {
  from: number;
  to: number;
  depth: number;
}

interface BlockquoteAnchor {
  position: number;
  active: boolean;
}

export const blockquoteBars = layer({
  above: false,
  class: 'cm-md-syntaxHiddenBlockquoteLayer',
  markers: blockquoteBarMarkers,
  update: update => update.docChanged
    || update.selectionSet
    || update.viewportChanged
    || update.geometryChanged
    || update.transactions.some(transaction => transaction.reconfigured),
  mount: element => element.setAttribute('aria-hidden', 'true'),
});

export function blockquoteBarDescriptors(view: EditorView): BlockquoteBarDescriptor[] {
  const owners = new Map<string, BlockquoteOwner>();
  const anchors = new Map<string, Map<number, BlockquoteAnchor>>();

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: node => {
        const blockquote = blockquoteStyleRange(node);
        if (blockquote !== undefined) {
          owners.set(ownerKey(blockquote), blockquote);
        }

        if (node.name !== 'QuoteMark') {
          return;
        }

        const owner = nearestBlockquote(node.node);
        if (owner === null) {
          return;
        }

        const key = ownerKey(owner);
        const line = view.state.doc.lineAt(node.from).from;
        const ownerAnchors = anchors.get(key) ?? new Map<number, BlockquoteAnchor>();

        ownerAnchors.set(line, {
          position: node.from,
          active: selectionReveals(view.state, node.from, node.to),
        });

        anchors.set(key, ownerAnchors);
      },
    });
  }

  const descriptors: BlockquoteBarDescriptor[] = [];
  owners.forEach((owner, key) => {
    const ownerAnchors = anchors.get(key);
    const lines = new Set<number>();

    view.viewportLineBlocks.forEach(block => {
      const line = view.state.doc.lineAt(block.from);
      if (lines.has(line.from) || line.to < owner.from || line.from >= owner.to) {
        return;
      }

      lines.add(line.from);
      const anchor = ownerAnchors?.get(line.from);
      if (anchor?.active === true) {
        return;
      }

      descriptors.push({
        line: line.from,
        ownerFrom: owner.from,
        anchor: anchor?.position,
        depth: owner.depth,
      });
    });
  });

  return descriptors;
}

export function blockquoteBarMarkers(view: EditorView) {
  const base = layerBase(view);
  const ownerOffsets = new Map<number, number>();

  return blockquoteBarDescriptors(view).flatMap(descriptor => {
    const lineElement = lineDOM(view, descriptor.line);
    const lineRect = lineElement?.getBoundingClientRect();
    const lineStart = view.coordsAtPos(descriptor.line, 1);
    if (lineRect === undefined || lineStart === null) {
      return [];
    }

    let left = descriptor.anchor === undefined ? undefined : view.coordsAtPos(descriptor.anchor, 1)?.left;
    if (left === undefined) {
      let offset = ownerOffsets.get(descriptor.ownerFrom);
      if (offset === undefined) {
        offset = ownerOffset(view, descriptor.ownerFrom);
        ownerOffsets.set(descriptor.ownerFrom, offset);
      }

      left = lineStart.left + offset;
    }

    const style = quoteMarkStyle(view, descriptor.anchor ?? descriptor.ownerFrom);
    return [new BlockquoteBarMarker(
      descriptor.depth,
      left - base.left,
      lineRect.top - base.top,
      3,
      lineRect.height,
      style.color,
      style.opacity,
    )];
  });
}

class BlockquoteBarMarker extends RectangleMarker {
  constructor(
    depth: number,
    left: number,
    top: number,
    width: number,
    height: number,
    private readonly color: string,
    private readonly opacity: number,
  ) {
    super(`cm-md-syntaxHiddenBlockquoteBar cm-md-syntaxHiddenBlockquoteBar-depth-${depth}`, left, top, width, height);
  }

  draw() {
    const element = super.draw();
    element.style.backgroundColor = this.color;
    element.style.opacity = `${this.opacity}`;
    return element;
  }

  update(element: HTMLElement, previous: BlockquoteBarMarker) {
    if (!super.update(element, previous)) {
      return false;
    }

    element.style.backgroundColor = this.color;
    element.style.opacity = `${this.opacity}`;
    return true;
  }

  eq(other: BlockquoteBarMarker) {
    return super.eq(other) && this.color === other.color && this.opacity === other.opacity;
  }
}

function quoteMarkStyle(view: EditorView, position: number) {
  const node = view.domAtPos(position).node;
  const source = node instanceof HTMLElement ? node : node.parentElement;
  let opacity = 1;

  for (let element = source; element !== null && element !== view.scrollDOM; element = element.parentElement) {
    const value = parseFloat(getComputedStyle(element).opacity);
    if (!Number.isNaN(value)) {
      opacity *= value;
    }
  }

  return {
    color: getComputedStyle(source ?? view.contentDOM).color,
    opacity,
  };
}

function ownerOffset(view: EditorView, ownerFrom: number) {
  const line = view.state.doc.lineAt(ownerFrom);
  const lineStart = view.coordsAtPos(line.from, 1);
  const ownerStart = view.coordsAtPos(ownerFrom, 1);
  if (lineStart !== null && ownerStart !== null) {
    return ownerStart.left - lineStart.left;
  }

  let column = 0;
  for (const character of view.state.sliceDoc(line.from, ownerFrom)) {
    column = character === '\t' ? column + view.state.tabSize - (column % view.state.tabSize) : column + 1;
  }

  return column * view.defaultCharacterWidth;
}

function lineDOM(view: EditorView, position: number) {
  const node = view.domAtPos(position).node;
  const element = node instanceof HTMLElement ? node : node.parentElement;
  return element?.closest<HTMLElement>('.cm-line');
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

function nearestBlockquote(node: SyntaxNode) {
  let owner = node.parent;
  while (owner !== null && owner.name !== 'Blockquote') {
    owner = owner.parent;
  }

  return owner;
}

function ownerKey(owner: { from: number; to: number }) {
  return `${owner.from}:${owner.to}`;
}
