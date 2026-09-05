// @vitest-environment happy-dom
import { afterAll, bench, describe } from 'vitest';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { yamlFrontmatter as frontMatter } from '@codemirror/lang-yaml';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { hiddenSyntaxExtension } from '../../src/hiddenSyntax';
import { markdownExtensions } from '../support/markdown';

const section = [
  '# Heading',
  '',
  '> Quote with **strong**, *emphasis*, `code`, and [link](https://example.com).',
  '[reference][shared]',
  '- item',
  '- [ ] task',
  '',
  '---',
  '[shared]: https://example.com',
  '',
].join('\n');

const smallSource = section.repeat(20);
const largeSource = section.repeat(2_000);

function createEditor(source: string, extensions: Extension = []) {
  const content = markdown({ base: markdownLanguage, extensions: markdownExtensions });
  return new EditorView({
    doc: source,
    parent: document.createElement('div'),
    extensions: [extensions, frontMatter({ content: content.language })],
  });
}

describe('Hidden syntax selection performance', () => {
  const editView = createEditor(largeSource);
  const smallMixedView = createEditor(smallSource, hiddenSyntaxExtension);
  const largeMixedView = createEditor(largeSource, hiddenSyntaxExtension);
  const positions = [largeSource.indexOf('Heading'), largeSource.indexOf('strong')];
  let editUpdate = 0;
  let smallMixedUpdate = 0;
  let largeMixedUpdate = 0;

  afterAll(() => {
    editView.destroy();
    smallMixedView.destroy();
    largeMixedView.destroy();
  });

  bench('Edit mode', () => {
    editView.dispatch({ selection: { anchor: positions[editUpdate++ % positions.length] } });
  });

  bench('Mixed mode (20 sections)', () => {
    smallMixedView.dispatch({ selection: { anchor: positions[smallMixedUpdate++ % positions.length] } });
  });

  bench('Mixed mode (2,000 sections)', () => {
    largeMixedView.dispatch({ selection: { anchor: positions[largeMixedUpdate++ % positions.length] } });
  });
});
