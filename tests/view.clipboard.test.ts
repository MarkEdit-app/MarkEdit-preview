// @vitest-environment happy-dom
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type * as SharedUtils from '../src/shared/utils';

const mocks = vi.hoisted(() => ({
  getText: vi.fn(() => 'current markdown'),
  renderMarkdown: vi.fn(),
  showAlert: vi.fn(),
  write: vi.fn(),
}));

vi.mock('markedit-api', () => ({
  MarkEdit: {
    editorAPI: { getText: mocks.getText },
    showAlert: mocks.showAlert,
  },
}));

vi.mock('../src/render', () => ({
  applyStyles: vi.fn(),
  handlePostRender: vi.fn(),
  renderKatex: vi.fn(),
  renderMarkdown: mocks.renderMarkdown,
  renderMermaid: vi.fn(),
}));

vi.mock('../src/shared/utils', async importOriginal => ({
  ...await importOriginal<typeof SharedUtils>(),
  appendStyle: vi.fn(() => ({ disabled: true })),
}));

vi.mock('../src/support/settings', () => ({
  hidePreviewButtons: false,
  viewModes: ['edit', 'side-by-side', 'preview', 'syntax-hidden'],
}));

vi.mock('../src/styling', () => ({
  codeCopyCss: vi.fn(),
  hljsCss: vi.fn(),
  previewThemeCss: vi.fn(),
}));

type ClipboardData = Record<string, Blob | Promise<Blob>>;
class ClipboardItemMock {
  constructor(readonly data: ClipboardData) {}
}

beforeEach(() => {
  vi.resetModules();
  mocks.getText.mockClear();
  mocks.renderMarkdown.mockReset();
  mocks.showAlert.mockReset();
  mocks.write.mockReset().mockResolvedValue(undefined);
  vi.stubGlobal('ClipboardItem', ClipboardItemMock);

  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { write: mocks.write },
  });

  document.body.innerHTML = '';
});

describe('clipboard actions', () => {
  test('starts a rich-text write synchronously and derives both flavors from the current render', async () => {
    let resolveRender: (html: string) => void = () => {};
    mocks.renderMarkdown.mockReturnValue(new Promise(resolve => {
      resolveRender = resolve;
    }));

    const { copyRichText, getPreviewPane } = await import('../src/view');
    getPreviewPane().innerHTML = '<p>stale preview</p>';

    const write = copyRichText();
    expect(mocks.write).toHaveBeenCalledTimes(1);

    const item = mocks.write.mock.calls[0][0][0] as ClipboardItemMock;
    resolveRender('<p>current <strong>content</strong></p>');
    await write;

    const html = await item.data['text/html'];
    const text = await item.data['text/plain'];
    expect(await html.text()).toBe('<p>current <strong>content</strong></p>');
    expect(await text.text()).toBe('current content');
  });

  test('starts an HTML write synchronously and surfaces failures', async () => {
    const error = new DOMException('Not allowed', 'NotAllowedError');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    mocks.renderMarkdown.mockReturnValue(new Promise(() => {}));
    mocks.write.mockRejectedValue(error);

    const { copyHtml } = await import('../src/view');
    const write = copyHtml();
    expect(mocks.write).toHaveBeenCalledTimes(1);
    await write;

    expect(consoleError).toHaveBeenCalledWith('Failed to copy:', error);
    expect(mocks.showAlert).toHaveBeenCalledWith('Failed to copy. Please try again.');
    consoleError.mockRestore();
  });
});
