// @vitest-environment happy-dom
import './support';
import { describe, expect, test, vi } from 'vitest';
import { EditorState } from '@codemirror/state';
import { history, undo } from '@codemirror/commands';
import { Decoration, EditorView, lineNumbers } from '@codemirror/view';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { unorderedListBulletDescriptors, unorderedListBulletMarkers } from '../../src/hiddenSyntax/components/bullet';
import { taskCheckboxDescriptors } from '../../src/hiddenSyntax/components/task';
import * as editor from '../support/editor';

describe('Unordered list syntax', () => {
  function hiddenMarkerPositions() {
    return [...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenListMark')]
      .map(marker => window.editor.posAtDOM(marker));
  }

  test('normalizes bullet markers and reveals only an active prefix', () => {
    const source = '- one\n* two\n+ three\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const hiddenMarkers = () => [...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenBulletMark')]
      .map(marker => marker.textContent);
    const bulletPositions = () => unorderedListBulletDescriptors(window.editor)
      .map(descriptor => descriptor.from);
    expect(hiddenMarkers()).toEqual(['-', '*', '+']);
    expect(bulletPositions()).toEqual([0, source.indexOf('*'), source.indexOf('+')]);
    expect(window.editor.state.doc.toString()).toBe(source);

    window.editor.dispatch({ selection: { anchor: source.indexOf('two') } });
    expect(hiddenMarkers()).toEqual(['-', '*', '+']);
    expect(bulletPositions()).toEqual([0, source.indexOf('*'), source.indexOf('+')]);

    window.editor.dispatch({ selection: { anchor: source.indexOf('*') + 1 } });
    expect(hiddenMarkers()).toEqual(['-', '+']);
    expect(bulletPositions()).toEqual([0, source.indexOf('+')]);
  });

  test('hides a complete marker while typing item content', () => {
    editor.setUp('', hiddenSyntaxExtension);

    window.editor.dispatch({ changes: { from: 0, insert: '-' }, selection: { anchor: 1 } });
    expect(hiddenMarkerPositions()).toEqual([]);

    window.editor.dispatch({ changes: { from: 1, insert: ' ' }, selection: { anchor: 2 } });
    expect(hiddenMarkerPositions()).toEqual([0]);

    window.editor.dispatch({ changes: { from: 2, insert: 'item' }, selection: { anchor: 6 } });
    expect(hiddenMarkerPositions()).toEqual([0]);
  });

  test('keeps the bullet until a task marker is complete', () => {
    editor.setUp('', hiddenSyntaxExtension);

    const type = (text: string) => {
      const from = window.editor.state.doc.length;
      window.editor.dispatch({ changes: { from, insert: text }, selection: { anchor: from + text.length } });
    };

    type('- ');
    expect(unorderedListBulletDescriptors(window.editor)).toHaveLength(1);
    expect(taskCheckboxDescriptors(window.editor)).toHaveLength(0);

    for (const character of ['[', ' ', ']']) {
      type(character);
      expect(unorderedListBulletDescriptors(window.editor)).toHaveLength(1);
      expect(taskCheckboxDescriptors(window.editor)).toHaveLength(0);
    }

    type(' ');
    expect(unorderedListBulletDescriptors(window.editor)).toHaveLength(0);
    expect(taskCheckboxDescriptors(window.editor)).toHaveLength(1);
  });

  test('paints source color, opacity, and shadow without marker classes', () => {
    const source = '- item\n\nBody';
    const listColor = 'rgb(12, 34, 56)';
    const listShadow = 'rgb(1, 2, 3) 0px 0px 4px';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const marker = window.editor.dom.querySelector<HTMLElement>('.cm-md-syntaxHiddenBulletMark');
    if (marker === null) {
      throw new Error('Expected hidden bullet syntax');
    }

    const line = marker.closest<HTMLElement>('.cm-line');
    if (line === null) {
      throw new Error('Expected hidden bullet line');
    }

    window.editor.dom.querySelectorAll('.cm-md-listMark').forEach(element => {
      element.classList.remove('cm-md-listMark');
    });

    marker.style.color = listColor;
    marker.style.opacity = '0.5';
    marker.style.textShadow = listShadow;
    line.style.opacity = '0.5';

    vi.spyOn(window.editor, 'coordsForChar').mockReturnValue({
      left: 10,
      right: 20,
      top: 30,
      bottom: 50,
    });

    const initial = unorderedListBulletMarkers(window.editor)[0];
    const painted = initial.draw();
    expect(painted.className).toBe('cm-md-syntaxHiddenListBullet');
    expect(painted.style.color).toBe(listColor);
    expect(painted.style.opacity).toBe('0.25');
    expect(painted.style.textShadow).toBe(listShadow);
    expect(painted.style.left).toBe('10px');
    expect(painted.style.width).toBe('10px');

    line.style.opacity = '0.4';
    marker.style.textShadow = 'none';
    const updated = unorderedListBulletMarkers(window.editor)[0];
    expect(updated.eq(initial)).toBe(false);
    expect(updated.update(painted, initial)).toBe(true);
    expect(painted.style.opacity).toBe('0.2');
    expect(painted.style.textShadow).toBe('');
  });

  test('reveals nested prefixes independently', () => {
    const source = '- parent\n  - child\n\nBody';
    const childMarker = source.indexOf('- child');
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenMarkerPositions()).toEqual([0, childMarker]);

    window.editor.dispatch({ selection: { anchor: source.indexOf('child') } });
    expect(hiddenMarkerPositions()).toEqual([0, childMarker]);

    window.editor.dispatch({ selection: { anchor: childMarker + 1 } });
    expect(hiddenMarkerPositions()).toEqual([0]);

    window.editor.dispatch({ selection: { anchor: 1 } });
    expect(hiddenMarkerPositions()).toEqual([childMarker]);
  });

  test('keeps prefixes hidden from continuation text', () => {
    const source = '- first\n  continuation\n- second\n\nBody';
    const secondMarker = source.indexOf('- second');
    editor.setUp(source, hiddenSyntaxExtension);

    window.editor.dispatch({ selection: { anchor: source.indexOf('continuation') } });
    expect(hiddenMarkerPositions()).toEqual([0, secondMarker]);
  });

  test('replaces inactive task prefixes without drawing bullets', () => {
    const source = '- [ ] todo\n- [x] done\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(unorderedListBulletDescriptors(window.editor)).toEqual([]);
    expect(taskCheckboxDescriptors(window.editor).map(task => task.checked)).toEqual([false, true]);
    const inputs = window.editor.dom.querySelectorAll<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    expect(inputs).toHaveLength(2);
    expect(inputs[0].type).toBe('checkbox');
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenTaskCheckboxControl')).toHaveLength(2);
    expect([...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenTaskCheckboxMarker')]
      .map(marker => marker.textContent)).toEqual(['- ', '- ']);

    window.editor.dispatch({ selection: { anchor: source.indexOf('todo') } });
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenTaskCheckbox')).toHaveLength(2);

    window.editor.dispatch({ selection: { anchor: source.indexOf('[ ]') + 1 } });
    expect(window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenTaskCheckbox')).toHaveLength(1);
  });

  test('finds task prefixes and reveals only an active prefix', () => {
    const source = '- [ ] todo\n- [X] done\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    expect(taskCheckboxDescriptors(window.editor)).toEqual([
      { from: 0, to: 6, markerFrom: 2, listPrefix: '- ', checked: false, label: 'todo' },
      { from: 11, to: 17, markerFrom: 13, listPrefix: '- ', checked: true, label: 'done' },
    ]);

    window.editor.dispatch({ selection: { anchor: source.indexOf('todo') } });
    expect(taskCheckboxDescriptors(window.editor)).toHaveLength(2);

    window.editor.dispatch({ selection: { anchor: source.indexOf('[ ]') + 1 } });
    expect(taskCheckboxDescriptors(window.editor)).toEqual([
      { from: 11, to: 17, markerFrom: 13, listPrefix: '- ', checked: true, label: 'done' },
    ]);
  });

  test('reveals nested task items independently', () => {
    const source = '- [ ] parent\n  - [ ] child\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.indexOf('child') } });
    expect(taskCheckboxDescriptors(window.editor).map(task => task.label)).toEqual(['parent', 'child']);

    window.editor.dispatch({ selection: { anchor: source.lastIndexOf('[ ]') + 1 } });
    expect(taskCheckboxDescriptors(window.editor).map(task => task.label)).toEqual(['parent']);
  });

  test('changes only the task state and supports undo', () => {
    const source = '- [ ] todo\n\nBody';
    editor.setUp(source, [history(), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const input = window.editor.dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    if (input === null) {
      throw new Error('Expected task checkbox');
    }

    const scrollSnapshot = vi.spyOn(window.editor, 'scrollSnapshot');
    expect(input.getAttribute('aria-label')).toBe('todo');
    input.click();
    expect(window.editor.state.doc.toString()).toBe('- [x] todo\n\nBody');
    expect(window.editor.state.selection.main.head).toBe(source.length);
    expect(scrollSnapshot).toHaveBeenCalledTimes(1);

    expect(undo(window.editor)).toBe(true);
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('preserves checkbox focus after toggling', () => {
    editor.setUp('- [ ] todo\n\nBody', hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });

    const input = window.editor.dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    if (input === null) {
      throw new Error('Expected task checkbox');
    }

    input.focus();
    input.click();

    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenTaskCheckbox')).toBe(input);
    expect(document.activeElement).toBe(input);
    expect(input.checked).toBe(true);
  });

  test('disables rendered task checkboxes in read-only state', () => {
    const source = '- [ ] todo\n\nBody';
    editor.setUp(source, [EditorState.readOnly.of(true), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const input = window.editor.dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    expect(input?.disabled).toBe(true);
    input?.dispatchEvent(new Event('change'));
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('disables rendered task checkboxes in a non-editable view', () => {
    const source = '- [ ] todo\n\nBody';
    editor.setUp(source, [EditorView.editable.of(false), hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const input = window.editor.dom.querySelector<HTMLInputElement>('.cm-md-syntaxHiddenTaskCheckbox');
    expect(input?.disabled).toBe(true);
    input?.click();
    expect(window.editor.state.doc.toString()).toBe(source);
  });

  test('keeps incomplete item markers visible', () => {
    const source = '-\n\n- item\n\nBody';
    const completeMarker = source.indexOf('- item');
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(hiddenMarkerPositions()).toEqual([completeMarker]);
  });

  test('leaves ordered list markers unchanged', () => {
    const source = '1. one\n2. two\n\nBody';
    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenListMark')).toBeNull();
  });

  test('combines with line numbers', () => {
    const source = '- item\n\nBody';
    editor.setUp(source, [
      lineNumbers(),
      hiddenSyntaxExtension,
    ]);

    window.editor.dispatch({ selection: { anchor: source.length } });
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenBulletMark')).not.toBeNull();
    expect(window.editor.dom.querySelector('.cm-lineNumbers')).not.toBeNull();

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    const listRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenListMark')) as CSSStyleRule;
    expect(listRule.style.getPropertyValue('font-size')).toBe('inherit');
    expect(listRule.style.getPropertyPriority('font-size')).toBe('important');
    expect(listRule.style.getPropertyValue('visibility')).toBe('hidden');

    const bulletRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenListBullet')) as CSSStyleRule;
    expect(bulletRule.style.getPropertyValue('display')).toBe('flex');
    expect(bulletRule.style.getPropertyValue('align-items')).toBe('center');
    expect(bulletRule.style.getPropertyValue('justify-content')).toBe('center');
    const layerRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenListBulletLayer')) as CSSStyleRule;
    expect(layerRule.style.getPropertyValue('z-index')).toBe('0');
    expect(layerRule.style.getPropertyPriority('z-index')).toBe('important');
    expect(window.editor.dom.querySelector('.cm-md-syntaxHiddenListBulletLayer')?.getAttribute('aria-hidden')).toBe('true');
  });

  test('centers task checkboxes in a fixed control slot', () => {
    const hangingIndent = EditorView.decorations.of(Decoration.set([
      Decoration.line({ attributes: { style: 'text-indent: -2em; margin-inline-start: 2em' } }).range(0),
    ]));

    editor.setUp('- [ ] task\n\nBody', [EditorView.lineWrapping, hangingIndent, hiddenSyntaxExtension]);
    window.editor.dispatch({ selection: { anchor: window.editor.state.doc.length } });

    const cssRules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    const frameRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenTaskCheckboxFrame')) as CSSStyleRule;
    const controlRule = cssRules.find(rule => rule.cssText.includes('.cm-md-syntaxHiddenTaskCheckboxControl')) as CSSStyleRule;
    expect(frameRule.style.getPropertyValue('text-indent')).toBe('0px');
    expect(controlRule.style.getPropertyValue('display')).toBe('grid');
    expect(controlRule.style.getPropertyValue('place-items')).toBe('center');
    expect(controlRule.style.getPropertyValue('width')).toBe('1em');
    expect(controlRule.style.getPropertyValue('inset-inline-start')).toBe('-0.15em');
  });

  test('plans bullets and tasks only for visible ranges', () => {
    const lineCount = 500;
    const source = Array.from({ length: lineCount }, (_, index) => index % 2 === 0
      ? `- item ${index}`
      : `- [ ] task ${index}`,
    ).join('\n');

    editor.setUp(source, hiddenSyntaxExtension);
    window.editor.dispatch({ selection: { anchor: source.length } });

    const bullets = unorderedListBulletDescriptors(window.editor);
    const tasks = taskCheckboxDescriptors(window.editor);
    const isVisible = (position: number) => window.editor.visibleRanges.some(range => position >= range.from && position <= range.to);

    expect(bullets.length + tasks.length).toBeLessThan(lineCount);
    expect(bullets.every(descriptor => isVisible(descriptor.from))).toBe(true);
    expect(tasks.every(descriptor => isVisible(descriptor.from))).toBe(true);
  });
});
