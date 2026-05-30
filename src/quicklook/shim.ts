/**
 * Stub `require` for hosts that don't provide one (Quick Look, `@light`).
 * Compiled to an IIFE and injected as the Rollup banner so it runs before the
 * bundle's top-level `require(...)` calls.
 */

import type { MarkEdit as RealMarkEdit } from 'markedit-api';
import type { EditorView as RealEditorView } from '@codemirror/view';
import type { Annotation as RealAnnotation } from '@codemirror/state';

type Globals = {
  MarkEdit?: RealMarkEdit;
  require?: (id: string) => unknown;
};

const host = globalThis as unknown as Globals;
if (typeof host.require === 'undefined') {
  type MarkEditModule = { MarkEdit: RealMarkEdit };
  type ViewModule = { EditorView: Pick<typeof RealEditorView, 'updateListener'> };
  type StateModule = { Annotation: Pick<typeof RealAnnotation, 'define'> };

  const markeditApi: MarkEditModule = {
    MarkEdit: host.MarkEdit ?? (Object.freeze({}) as RealMarkEdit),
  };

  const codemirrorView: ViewModule = {
    EditorView: {
      updateListener: { of: () => ({}) },
    } as unknown as ViewModule['EditorView'],
  };

  const codemirrorState: StateModule = {
    Annotation: {
      define: () => ({ of: () => ({}) }),
    } as unknown as StateModule['Annotation'],
  };

  const stubs: Record<string, unknown> = {
    'markedit-api': markeditApi,
    '@codemirror/view': codemirrorView,
    '@codemirror/state': codemirrorState,
  };

  host.require = (id: string) => stubs[id] ?? {};
}
