import { afterEach, beforeEach, vi } from 'vitest';

const mermaidMocks = vi.hoisted(() => ({
  initialize: vi.fn(),
  render: vi.fn(async (_id: string, source: string) => ({ svg: `<svg><text>${source}</text></svg>` })),
}));

export { mermaidMocks };

vi.mock('mermaid', () => ({ default: mermaidMocks }));
beforeEach(() => {
  mermaidMocks.initialize.mockClear();
  mermaidMocks.render.mockReset();
  mermaidMocks.render.mockImplementation(async (_id, source) => ({ svg: `<svg><text>${source}</text></svg>` }));
});

afterEach(() => {
  vi.restoreAllMocks();
  window.editor.destroy();
  document.body.innerHTML = '';
});

export function hiddenText() {
  return window.editor.dom.querySelector('.cm-md-syntaxHiddenSource')?.textContent;
}

export function hiddenTexts() {
  return [...window.editor.dom.querySelectorAll('.cm-md-syntaxHiddenSource')].map(node => node.textContent);
}

export function editorText() {
  return [...window.editor.contentDOM.querySelectorAll('.cm-line')]
    .map(line => {
      const renderedLine = line.cloneNode(true) as HTMLElement;
      renderedLine.querySelectorAll('.cm-md-syntaxHiddenSource').forEach(source => source.remove());
      return renderedLine.textContent;
    })
    .join('\n');
}
