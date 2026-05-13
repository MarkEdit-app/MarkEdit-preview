import { describe, it, expect, vi } from 'vitest';
import { renderMarkdown } from '../src/render';
import { resolveTaskToggle } from '../src/task';

vi.mock('markedit-api', () => ({ MarkEdit: {} }));

describe('task list rendering', () => {
  it('renders enabled checkboxes (not disabled)', async () => {
    const html = await renderMarkdown('- [ ] todo\n- [x] done\n');
    expect(html).toContain('class="task-list-item-checkbox"');
    expect(html).not.toContain('disabled');
  });

  it('marks list items with task-list-item class and line info', async () => {
    const html = await renderMarkdown('- [ ] todo\n');
    expect(html).toMatch(/class="task-list-item enabled"[^>]*data-line-from="0"/);
  });

  it('preserves checked state in HTML', async () => {
    const html = await renderMarkdown('- [x] done\n');
    expect(html).toContain('checked=""');
  });
});

describe('resolveTaskToggle', () => {
  it('returns offset and toggles unchecked to checked', () => {
    expect(resolveTaskToggle('- [ ] todo')).toEqual({ offset: 3, replacement: 'x' });
  });

  it('toggles checked to unchecked', () => {
    expect(resolveTaskToggle('- [x] done')).toEqual({ offset: 3, replacement: ' ' });
    expect(resolveTaskToggle('- [X] done')).toEqual({ offset: 3, replacement: ' ' });
  });

  it('handles indented items', () => {
    expect(resolveTaskToggle('    - [ ] nested')).toEqual({ offset: 7, replacement: 'x' });
  });

  it('handles ordered list markers', () => {
    expect(resolveTaskToggle('1. [ ] item')).toEqual({ offset: 4, replacement: 'x' });
    expect(resolveTaskToggle('2) [x] item')).toEqual({ offset: 4, replacement: ' ' });
  });

  it('handles different bullet markers', () => {
    expect(resolveTaskToggle('* [ ] todo')).toEqual({ offset: 3, replacement: 'x' });
    expect(resolveTaskToggle('+ [ ] todo')).toEqual({ offset: 3, replacement: 'x' });
  });

  it('handles blockquoted task items', () => {
    expect(resolveTaskToggle('> - [ ] todo')).toEqual({ offset: 5, replacement: 'x' });
    expect(resolveTaskToggle('> > - [x] nested')).toEqual({ offset: 7, replacement: ' ' });
  });

  it('returns null for non-task lines', () => {
    expect(resolveTaskToggle('- regular item')).toBeNull();
    expect(resolveTaskToggle('plain text')).toBeNull();
    expect(resolveTaskToggle('- [y] not a task')).toBeNull();
    expect(resolveTaskToggle('-[ ] missing space')).toBeNull();
    expect(resolveTaskToggle('- [ ]missing space after bracket')).toBeNull();
    expect(resolveTaskToggle('- [ ]\ttab after bracket')).toBeNull();
  });

  // Lock in alignment with the renderer: every line it renders as a task must parse.
  it('accepts every line that the renderer renders as a task', async () => {
    const cases = [
      '- [ ] todo', '- [x] done', '- [X] done',
      '* [ ] x', '+ [ ] x',
      '1. [ ] x', '2) [x] x', '10. [ ] x',
      '-  [ ] x', '- [ ]  x', '-\t[ ] x',
      ' - [ ] x', '  - [ ] x', '   - [ ] x',
      '> - [ ] x', '>- [ ] x', '>  - [ ] x', '> > - [ ] x', '>>- [ ] x',
      '   > - [ ] x',
      '- [ ] [more]',
    ];
    for (const line of cases) {
      const html = await renderMarkdown(line + '\n');
      expect(html, `renderer should produce checkbox for ${JSON.stringify(line)}`)
        .toContain('task-list-item-checkbox');
      expect(resolveTaskToggle(line), `parser should accept ${JSON.stringify(line)}`)
        .not.toBeNull();
    }
  });
});
