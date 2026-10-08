// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { handlePostRender } from '../src/render';

const mocks = vi.hoisted(() => ({
  run: vi.fn<(options: { nodes: HTMLElement[] }) => Promise<void>>(),
  error: vi.fn(),
}));

vi.mock('mermaid', () => ({
  default: { initialize: vi.fn(), run: mocks.run },
}));

beforeEach(() => {
  document.body.innerHTML = '';
  mocks.error.mockReset();
  vi.spyOn(console, 'error').mockImplementation(mocks.error);
  mocks.run.mockReset();
  mocks.run.mockImplementation(async ({ nodes }) => {
    nodes.forEach(node => {
      node.setAttribute('data-processed', 'true');
      node.innerHTML = '<svg><text>preview</text></svg>';
    });
  });
});

afterEach(() => {
  try {
    expect(mocks.error).not.toHaveBeenCalled();
  } finally {
    vi.restoreAllMocks();
  }
});

function createPreview(zoom = '0.8') {
  const pane = document.createElement('div');
  pane.className = 'markdown-body';
  pane.style.zoom = zoom;
  pane.innerHTML = '<div class="mermaid" data-line-from="3">flowchart TB\nA[preview]</div>';
  document.body.appendChild(pane);
  return pane;
}

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>(complete => { resolve = complete; });
  return { promise, resolve };
}

describe('Mermaid preview measurement', () => {
  test.each(['0.8', '1', '1.5'])('renders outside preview zoom %s and retains bindings and metadata', async zoom => {
    const pane = createPreview(zoom);
    const clicked = vi.fn();
    const source = pane.firstElementChild;
    Object.defineProperty(source, 'clientWidth', { value: 420 });

    mocks.run.mockImplementation(async ({ nodes }) => {
      expect(nodes).toHaveLength(1);
      const diagram = nodes[0];
      expect(pane.contains(diagram)).toBe(false);
      expect(diagram.isConnected).toBe(true);
      expect(diagram.closest('.markdown-body')?.parentElement).toBe(document.body);
      expect(diagram.parentElement?.style.width).toBe('420px');
      expect(diagram.getAttribute('data-processed')).toBeNull();
      expect(pane.style.zoom).toBe(zoom);
      diagram.innerHTML = '<svg><text>preview</text></svg>';
      diagram.setAttribute('data-processed', 'true');
      diagram.addEventListener('click', clicked);
    });

    const finished = vi.fn(() => {
      expect(pane.style.zoom).toBe(zoom);
      expect(document.body.children).toHaveLength(1);
    });

    handlePostRender(finished, pane);
    await vi.waitFor(() => expect(finished).toHaveBeenCalledOnce());
    const diagram = pane.querySelector<HTMLElement>('.mermaid');
    expect(diagram?.getAttribute('data-line-from')).toBe('3');
    expect(diagram?.querySelector('svg')).not.toBeNull();
    diagram?.click();
    expect(clicked).toHaveBeenCalledOnce();
  });

  test('overrides custom markdown-body zoom only in the staging container', async () => {
    const pane = createPreview('');
    pane.insertAdjacentHTML('afterbegin', '<style>.markdown-body { zoom: 0.8; }</style>');
    let measuredZoom: string | undefined;
    mocks.run.mockImplementation(async ({ nodes }) => {
      const staging = nodes[0].closest<HTMLElement>('.markdown-body')!;
      measuredZoom = getComputedStyle(staging).zoom;
      expect(staging).not.toBe(pane);
      expect(getComputedStyle(pane).zoom).toBe('0.8');
      nodes[0].innerHTML = '<svg></svg>';
    });

    const finished = vi.fn();
    handlePostRender(finished, pane);
    await vi.waitFor(() => expect(finished).toHaveBeenCalledOnce());
    expect(measuredZoom).toBe('1');
    expect(pane.style.zoom).toBe('');
    expect(getComputedStyle(pane).zoom).toBe('0.8');
    expect(pane.querySelector('svg')).not.toBeNull();
    expect(document.body.children).toHaveLength(1);
  });

  test('keeps stylesheet-defined Quick Look zoom outside measurement', async () => {
    const pane = createPreview('');
    pane.innerHTML = '<style>.quicklook-content { zoom: 0.9; }</style><div class="quicklook-content"><div class="mermaid">flowchart TB\nA[preview]</div></div>';

    const inner = pane.querySelector<HTMLElement>('.quicklook-content')!;
    mocks.run.mockImplementation(async ({ nodes }) => {
      expect(getComputedStyle(inner).zoom).toBe('0.9');
      expect(inner.style.zoom).toBe('');
      expect(nodes[0].closest('.quicklook-content')).toBeNull();
      expect(nodes[0].closest('.markdown-body')).not.toBe(pane);
    });

    const finished = vi.fn();
    handlePostRender(finished, pane);
    await vi.waitFor(() => expect(finished).toHaveBeenCalledOnce());
    expect(inner.style.zoom).toBe('');
    expect(getComputedStyle(inner).zoom).toBe('0.9');
  });

  test('leaves zoom changes untouched throughout an asynchronous render', async () => {
    const pane = createPreview();
    const pending = deferred();

    mocks.run.mockImplementation(async ({ nodes }) => {
      expect(pane.style.zoom).toBe('0.8');
      await pending.promise;
      expect(nodes[0].closest('.markdown-body')).not.toBe(pane);
      nodes[0].innerHTML = '<svg></svg>';
    });

    const finished = vi.fn();
    handlePostRender(finished, pane);
    await vi.waitFor(() => expect(mocks.run).toHaveBeenCalledOnce());
    pane.style.zoom = String(Number(pane.style.zoom) - 0.1);
    expect(Number(pane.style.zoom)).toBeCloseTo(0.7);
    pending.resolve();
    await vi.waitFor(() => expect(finished).toHaveBeenCalledOnce());
    expect(Number(pane.style.zoom)).toBeCloseTo(0.7);
  });

  test('renders multiple diagrams together and aligns only after insertion', async () => {
    const pane = createPreview();
    pane.insertAdjacentHTML('beforeend', '<div class="mermaid">flowchart TB\nB[second]</div>');

    const finished = vi.fn(() => expect(pane.querySelectorAll('svg')).toHaveLength(2));
    handlePostRender(finished, pane);
    handlePostRender(vi.fn(), pane);
    await vi.waitFor(() => expect(finished).toHaveBeenCalledOnce());
    expect(mocks.run).toHaveBeenCalledOnce();
    expect(mocks.run.mock.calls[0][0].nodes).toHaveLength(2);
    handlePostRender(vi.fn(), pane);
    expect(mocks.run).toHaveBeenCalledOnce();
  });

  test('discards an obsolete render without replacing newer content or aligning it', async () => {
    const pane = createPreview();
    const pending = deferred();
    mocks.run.mockImplementationOnce(async ({ nodes }) => {
      await pending.promise;
      nodes[0].innerHTML = '<svg><text>obsolete</text></svg>';
    });

    const obsoleteFinished = vi.fn();
    const finished = vi.fn();

    handlePostRender(obsoleteFinished, pane);
    await vi.waitFor(() => expect(mocks.run).toHaveBeenCalledOnce());
    pane.innerHTML = '<div class="mermaid">flowchart TB\nB[new]</div>';
    handlePostRender(finished, pane);
    await vi.waitFor(() => expect(finished).toHaveBeenCalledOnce());
    pending.resolve();
    await vi.waitFor(() => expect(document.body.children).toHaveLength(1));
    expect(pane.textContent).toBe('preview');
    expect(obsoleteFinished).not.toHaveBeenCalled();
    expect(pane.style.zoom).toBe('0.8');
  });

  test('retains Mermaid error output, reports the failure, and cleans up', async () => {
    const pane = createPreview();
    const error = new Error('Invalid diagram');
    mocks.run.mockImplementationOnce(async ({ nodes }) => {
      nodes[0].innerHTML = '<svg><text>Syntax error</text></svg>';
      throw error;
    });

    const finished = vi.fn();
    handlePostRender(finished, pane);
    await vi.waitFor(() => expect(finished).toHaveBeenCalledOnce());
    expect(mocks.error).toHaveBeenCalledExactlyOnceWith(error);
    mocks.error.mockClear();
    expect(pane.textContent).toBe('Syntax error');
    expect(pane.style.zoom).toBe('0.8');
    expect(document.body.children).toHaveLength(1);
  });

  test('does not load Mermaid or create a staging container without diagrams', () => {
    const pane = createPreview();
    pane.innerHTML = '<p>Plain text</p>';
    handlePostRender(vi.fn(), pane);
    expect(mocks.run).not.toHaveBeenCalled();
    expect(document.body.children).toHaveLength(1);
  });
});
