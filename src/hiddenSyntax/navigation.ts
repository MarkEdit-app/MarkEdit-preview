import { EditorSelection, type SelectionRange } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { ensureSyntaxTree } from '@codemirror/language';
import { footnoteReferences } from './link';
import { headingLineForAnchor } from '../render';
import { playSystemBeep } from '../shared/utils';

const unsafeProtocol = /^(?:vbscript|javascript|file|data):/;
const safeDataImage = /^data:image\/(?:gif|png|jpeg|webp);/;

export function openLinkDestination(destination: string) {
  const normalized = destination.trim().toLowerCase();
  if (unsafeProtocol.test(normalized) && !safeDataImage.test(normalized)) {
    return false;
  }

  window.open(destination, '_blank', 'noopener');
  return true;
}

export async function followFootnote(view: EditorView, label: string, direction: 'definition' | 'reference' = 'definition') {
  const state = view.state;
  const tree = ensureSyntaxTree(state, state.doc.length, 5000);
  if (tree === null) {
    return false;
  }

  let target: SelectionRange | undefined;
  tree.iterate({
    enter: node => {
      if (target !== undefined) {
        return false;
      }

      if (direction === 'reference') {
        const reference = footnoteReferences(node, state).find(candidate => candidate.label === label);
        if (reference !== undefined) {
          target = EditorSelection.range(reference.from, reference.to);
        }
      } else if (node.name === 'LinkDefinition' && state.sliceDoc(node.from, node.to) === `[${label}]`) {
        target = EditorSelection.range(node.from, node.to);
      }
    },
  });

  if (target === undefined) {
    playSystemBeep();
    return false;
  }

  revealLinkTarget(view, target);
  return true;
}

export async function followLinkAnchor(view: EditorView, destination: string) {
  const doc = view.state.doc;
  const source = doc.toString();
  const line = await headingLineForAnchor(source, destination);
  if (line === undefined || view.state.doc !== doc) {
    return false;
  }

  const target = view.state.doc.line(line + 1).from;
  revealLinkTarget(view, EditorSelection.cursor(target));
  return true;
}

function revealLinkTarget(view: EditorView, target: SelectionRange) {
  const doc = view.state.doc;
  const currentOffset = view.scrollDOM.scrollTop;
  const scroll = (y: 'start' | 'center') => view.dispatch({
    effects: EditorView.scrollIntoView(target.from, { y, yMargin: 5 }),
  });

  view.dispatch({ selection: target });
  scroll('start');
  setTimeout(() => {
    if (view.state.doc === doc && Math.abs(view.scrollDOM.scrollTop - currentOffset) < 0.001) {
      scroll('center');
    }
  }, 50);
}
