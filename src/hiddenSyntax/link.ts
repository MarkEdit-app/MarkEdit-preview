import type { EditorState } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import type { SyntaxNode, SyntaxNodeRef, Tree } from '@lezer/common';
import { getStyleTags, type Tag } from '@lezer/highlight';
import { selectionReveals } from './selection';

type ReferenceDestinationResolver = (label: string) => string;
const referenceDestinationCache = new WeakMap<Tree, {
  doc: EditorState['doc'];
  destinations: Map<string, string>;
}>();

export function linkSyntax(
  node: SyntaxNodeRef,
  state: EditorState,
  resolveReferenceDestination: ReferenceDestinationResolver,
) {
  if (!['Link', 'Image', 'Autolink'].includes(node.name) || selectionReveals(state, node.from, node.to)) {
    return;
  }

  const marks = linkMarks(node.node);
  if (node.name === 'Autolink') {
    if (marks.length < 2) {
      return;
    }

    const label = state.sliceDoc(marks[0].to, marks[1].from);
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(label)) {
      return;
    }

    return {
      hidden: marks.map(mark => ({ from: mark.from, to: mark.to })),
      label: { from: marks[0].to, to: marks[1].from },
      image: false,
      destination: label,
      highlightTags: inheritedHighlightTags(node.node),
    };
  }

  if (marks.length < 2) {
    return;
  }

  const referenceLabel = node.node.getChild('LinkLabel');
  if (marks.length === 2 && (referenceLabel === null || referenceLabel.to - referenceLabel.from === 2)) {
    return;
  }

  const url = node.node.getChild('URL');
  if (marks.length > 2 && url === null) {
    return;
  }

  if (['(', '['].includes(state.sliceDoc(node.to, node.to + 1))) {
    return;
  }

  const opening = marks[0];
  const labelEnd = marks[1];
  const label = state.sliceDoc(opening.to, labelEnd.from);
  if (!/\S/.test(label) || (label.startsWith('^') && node.to === labelEnd.to)) {
    return;
  }

  const destination = url === null
    ? referenceDestination(referenceLabel, state, resolveReferenceDestination)
    : state.sliceDoc(url.from, url.to);
  if (node.name === 'Image' && url === null && destination === '') {
    return;
  }

  return {
    hidden: [
      { from: opening.from, to: opening.to },
      { from: labelEnd.from, to: node.to },
    ],
    label: { from: opening.to, to: labelEnd.from },
    image: node.name === 'Image',
    destination,
    highlightTags: inheritedHighlightTags(node.node),
  };
}

function inheritedHighlightTags(node: SyntaxNode) {
  const path: SyntaxNode[] = [];
  for (let current: SyntaxNode | null = node; current !== null; current = current.parent) {
    path.unshift(current);
  }

  const tags = new Set<Tag>();
  for (const current of path) {
    const style = getStyleTags(current);
    if (style !== null && (current === node || style.inherit)) {
      style.tags.forEach(tag => tags.add(tag));
    }
  }

  return [...tags];
}

export function referenceDestinationResolver(state: EditorState): ReferenceDestinationResolver {
  const tree = syntaxTree(state);
  let destinations: Map<string, string> | undefined;

  return label => {
    const cached = referenceDestinationCache.get(tree);
    destinations ??= cached?.doc === state.doc ? cached.destinations : undefined;
    if (destinations === undefined) {
      destinations = referenceDestinations(state, tree);
      referenceDestinationCache.set(tree, { doc: state.doc, destinations });
    }

    return destinations.get(normalizeLabel(label)) ?? '';
  };
}

function referenceDestination(
  label: SyntaxNode | null,
  state: EditorState,
  resolve: ReferenceDestinationResolver,
) {
  if (label === null) {
    return '';
  }

  return resolve(state.sliceDoc(label.from + 1, label.to - 1));
}

function referenceDestinations(state: EditorState, tree: Tree) {
  const destinations = new Map<string, string>();
  tree.iterate({
    enter: node => {
      if (node.name !== 'LinkDefinitionID') {
        return;
      }

      const label = normalizeLabel(state.sliceDoc(node.from, node.to));
      if (destinations.has(label)) {
        return;
      }

      const line = state.doc.lineAt(node.to);
      const source = state.sliceDoc(node.node.parent?.to ?? node.to, line.to);
      const match = /^:\s*(?:<([^>]*)>|(\S+))/.exec(source);
      const destination = match?.[1] ?? match?.[2];
      if (destination !== undefined) {
        destinations.set(label, destination);
      }
    },
  });

  return destinations;
}

function normalizeLabel(label: string) {
  return label.trim().replace(/\s+/g, ' ').toLowerCase();
}

function linkMarks(node: SyntaxNode) {
  const marks: SyntaxNode[] = [];
  for (let child = node.firstChild; child !== null; child = child.nextSibling) {
    if (child.name === 'LinkMark') {
      marks.push(child);
    }
  }

  return marks;
}
