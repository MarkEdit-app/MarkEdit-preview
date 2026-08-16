import { syntaxTree } from '@codemirror/language';
import type { Range } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView, ViewPlugin, type ViewUpdate, WidgetType } from '@codemirror/view';
import { selectionIntersects } from '../selection';

export interface TaskCheckboxDescriptor {
  from: number;
  to: number;
  markerFrom: number;
  listPrefix: string;
  checked: boolean;
  label: string;
}

const taskCheckboxResizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(entries => {
  for (const entry of entries) {
    resizeTaskCheckbox(entry.target as HTMLElement);
  }
});

export const taskCheckboxes = [
  ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;
      constructor(view: EditorView) {
        this.decorations = taskCheckboxDecorations(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged
          || update.selectionSet
          || update.viewportChanged
          || update.geometryChanged
          || update.startState.readOnly !== update.state.readOnly
          || update.transactions.some(transaction => transaction.reconfigured)) {
          this.decorations = taskCheckboxDecorations(update.view);
        }
      }
    },
    { decorations: plugin => plugin.decorations },
  ),
  EditorView.baseTheme({
    '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxFrame': {
      display: 'inline-block',
      position: 'relative',
      height: '1lh',
      margin: '0',
      textIndent: '0',
      verticalAlign: 'top',
    },
    '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxMarker': {
      visibility: 'hidden',
    },
    '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxControl': {
      position: 'absolute',
      insetBlockStart: '0',
      insetInlineStart: '-0.15em',
      display: 'grid',
      placeItems: 'center',
      width: '1em',
      height: '1lh',
    },
    '&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckbox': {
      margin: '0',
      transform: 'translateY(-0.09em) scale(var(--cm-md-task-checkbox-scale, 1))',
    },
  }),
];

export function taskCheckboxDescriptors(view: EditorView): TaskCheckboxDescriptor[] {
  const descriptors: TaskCheckboxDescriptor[] = [];

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: node => {
        if (node.name !== 'TaskMarker') {
          return;
        }

        const task = node.node.parent;
        const item = task?.parent;
        const listMark = item?.getChild('ListMark');
        const separatorTo = node.to + 1;
        if (
          task?.name === 'Task'
          && item?.name === 'ListItem'
          && item.parent?.name === 'BulletList'
          && listMark !== null
          && listMark !== undefined
          && view.state.sliceDoc(node.to, separatorTo) === ' '
          && !selectionIntersects(view.state, listMark.from, node.to)
        ) {
          descriptors.push({
            from: listMark.from,
            to: separatorTo,
            markerFrom: node.from,
            listPrefix: view.state.sliceDoc(listMark.from, listMark.to + 1),
            checked: view.state.sliceDoc(node.from, node.to) !== '[ ]',
            label: view.state.sliceDoc(separatorTo, view.state.doc.lineAt(node.to).to).trim() || 'Task',
          });
        }
      },
    });
  }

  return descriptors;
}

function taskCheckboxDecorations(view: EditorView) {
  const disabled = view.state.readOnly || !view.state.facet(EditorView.editable);
  const ranges: Range<Decoration>[] = taskCheckboxDescriptors(view).map(descriptor => Decoration.replace({
    widget: new TaskCheckboxWidget(
      descriptor.markerFrom,
      descriptor.listPrefix,
      descriptor.checked,
      descriptor.label,
      disabled,
    ),
  }).range(descriptor.from, descriptor.to));
  return Decoration.set(ranges, true);
}

class TaskCheckboxWidget extends WidgetType {
  constructor(
    private readonly markerFrom: number,
    private readonly listPrefix: string,
    private readonly checked: boolean,
    private readonly label: string,
    private readonly disabled: boolean,
  ) {
    super();
  }

  eq(other: TaskCheckboxWidget) {
    return this.markerFrom === other.markerFrom
      && this.listPrefix === other.listPrefix
      && this.checked === other.checked
      && this.label === other.label
      && this.disabled === other.disabled;
  }

  toDOM(view: EditorView) {
    const frame = document.createElement('span');
    frame.className = 'cm-md-syntaxHiddenTaskCheckboxFrame';

    const marker = frame.appendChild(document.createElement('span'));
    marker.className = 'cm-md-syntaxHiddenTaskCheckboxMarker';
    marker.textContent = this.listPrefix;

    const control = frame.appendChild(document.createElement('span'));
    control.className = 'cm-md-syntaxHiddenTaskCheckboxControl';

    const input = control.appendChild(document.createElement('input'));
    input.className = 'cm-md-syntaxHiddenTaskCheckbox';
    input.type = 'checkbox';
    this.updateInput(input);
    input.addEventListener('change', () => setTaskChecked(view, Number(input.dataset.markerFrom), input.checked));

    taskCheckboxResizeObserver?.observe(frame);
    return frame;
  }

  updateDOM(dom: HTMLElement) {
    const input = dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    if (input === null) {
      return false;
    }

    this.updateInput(input);
    return true;
  }

  destroy(dom: HTMLElement) {
    taskCheckboxResizeObserver?.unobserve(dom);
  }

  ignoreEvent() {
    return true;
  }

  private updateInput(input: HTMLInputElement) {
    input.checked = this.checked;
    input.disabled = this.disabled;
    input.dataset.markerFrom = `${this.markerFrom}`;
    input.setAttribute('aria-label', this.label);
  }
}

function resizeTaskCheckbox(frame: HTMLElement) {
  const input = frame.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
  if (input === null || input.offsetWidth === 0) {
    return;
  }

  const targetWidth = parseFloat(getComputedStyle(frame).fontSize);
  input.style.setProperty('--cm-md-task-checkbox-scale', `${targetWidth / input.offsetWidth}`);
}

function setTaskChecked(view: EditorView, markerFrom: number, checked: boolean) {
  const marker = view.state.sliceDoc(markerFrom, markerFrom + 3);
  if (view.state.readOnly || !view.state.facet(EditorView.editable) || !/^\[[ xX]\]$/.test(marker)) {
    return;
  }

  const changes = view.state.changes({
    from: markerFrom + 1,
    to: markerFrom + 2,
    insert: checked ? 'x' : ' ',
  });

  view.dispatch({
    changes,
    effects: view.scrollSnapshot().map(changes) ?? [],
    userEvent: 'input',
  });
}
