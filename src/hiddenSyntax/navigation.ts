import { EditorSelection } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { headingLineForAnchor } from '../render';

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

export async function followLinkAnchor(view: EditorView, destination: string) {
  const doc = view.state.doc;
  const source = doc.toString();
  const line = await headingLineForAnchor(source, destination);
  if (line === undefined || view.state.doc !== doc) {
    return false;
  }

  const target = view.state.doc.line(line + 1).from;
  const currentOffset = view.scrollDOM.scrollTop;
  const scroll = (y: 'start' | 'center') => view.dispatch({
    effects: EditorView.scrollIntoView(target, { y, yMargin: 5 }),
  });

  view.dispatch({ selection: EditorSelection.cursor(target) });
  scroll('start');
  setTimeout(() => {
    if (view.state.doc === doc && Math.abs(view.scrollDOM.scrollTop - currentOffset) < 0.001) {
      scroll('center');
    }
  }, 50);

  return true;
}
