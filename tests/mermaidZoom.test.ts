// @vitest-environment happy-dom
import { beforeEach, describe, expect, test, vi } from 'vitest';

const mermaidRun = vi.fn(async () => {});

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn(async () => ({ svg: '<svg></svg>' })),
    run: mermaidRun,
  },
}));

import { handlePostRender, invalidateCssZoomSuspend, suspendCssZoom } from '../src/render';

beforeEach(() => {
  mermaidRun.mockReset();
  mermaidRun.mockResolvedValue(undefined);
  document.body.innerHTML = '';
});

describe('suspendCssZoom', () => {
  test('restores a non-1 zoom after measurement', () => {
    const pane = document.createElement('div');
    pane.style.zoom = '0.8';
    const restore = suspendCssZoom(pane);

    expect(pane.style.zoom).toBe('1');
    restore();
    expect(pane.style.zoom).toBe('0.8');
  });

  test.each(['', '1'])('leaves zoom %j untouched', zoom => {
    const pane = document.createElement('div');
    pane.style.zoom = zoom;
    const restore = suspendCssZoom(pane);

    expect(pane.style.zoom).toBe(zoom);
    restore();
    expect(pane.style.zoom).toBe(zoom);
  });

  test('a later zoom write wins over the restore', () => {
    const pane = document.createElement('div');
    pane.style.zoom = '0.8';
    const restore = suspendCssZoom(pane);

    invalidateCssZoomSuspend(pane);
    pane.style.zoom = '1';
    restore();
    expect(pane.style.zoom).toBe('1');
  });
});

function previewPane(): HTMLElement {
  const pane = document.querySelector('.markdown-body');
  if (!(pane instanceof HTMLElement)) {
    throw new Error('missing preview pane');
  }
  return pane;
}

describe('handlePostRender', () => {
  test('runs Mermaid at zoom 1 and restores the pane afterwards', async () => {
    document.body.innerHTML = '<div class="markdown-body" style="zoom: 0.8"><div class="mermaid">flowchart TB\nA[preview]</div></div>';
    const pane = previewPane();
    let zoomDuringRun = '';
    mermaidRun.mockImplementation(async () => {
      zoomDuringRun = pane.style.zoom;
    });

    let finished = false;
    handlePostRender(() => {
      finished = true;
    });

    await vi.waitUntil(() => finished);
    expect(zoomDuringRun).toBe('1');
    expect(pane.style.zoom).toBe('0.8');
    expect(mermaidRun).toHaveBeenCalledWith({ querySelector: '.mermaid' });
  });

  test('keeps a zoom change that lands while Mermaid is running', async () => {
    document.body.innerHTML = '<div class="markdown-body" style="zoom: 0.8"><div class="mermaid">flowchart TB\nA[preview]</div></div>';
    const pane = previewPane();
    mermaidRun.mockImplementation(async () => {
      invalidateCssZoomSuspend(pane);
      pane.style.zoom = '1';
    });

    let finished = false;
    handlePostRender(() => {
      finished = true;
    });

    await vi.waitUntil(() => finished);
    expect(pane.style.zoom).toBe('1');
  });

  test('does not change zoom when the preview has no diagram', async () => {
    document.body.innerHTML = '<div class="markdown-body" style="zoom: 0.8"><p>No diagram</p></div>';
    const pane = previewPane();

    let finished = false;
    handlePostRender(() => {
      finished = true;
    });

    await vi.waitUntil(() => finished);
    expect(pane.style.zoom).toBe('0.8');
  });
});
