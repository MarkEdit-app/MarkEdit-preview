/**
 * Stub `require` for hosts that don't provide one (Quick Look, `@light`).
 * Compiled to an IIFE and injected as the Rollup banner so it runs before the
 * bundle's top-level `require(...)` calls.
 */

import type { MarkEdit as RealMarkEdit } from 'markedit-api';
import type * as CodeMirrorView from '@codemirror/view';
import type * as CodeMirrorState from '@codemirror/state';

type Globals = {
  MarkEdit?: RealMarkEdit;
  require?: (id: string) => unknown;
};

const host = globalThis as unknown as Globals;
if (typeof host.require === 'undefined') {
  type MarkEditModule = { MarkEdit: RealMarkEdit };
  type ViewModule = typeof CodeMirrorView;
  type StateModule = typeof CodeMirrorState;

  const markeditApi: MarkEditModule = {
    MarkEdit: host.MarkEdit ?? (Object.freeze({}) as RealMarkEdit),
  };

  const inertFacet = { of: () => ({}) };
  const inertDecoration = () => ({ range: () => ({}) });
  class InertBase {}

  const codemirrorView = {
    EditorView: {
      updateListener: inertFacet,
      mouseSelectionStyle: inertFacet,
      editorAttributes: inertFacet,
      baseTheme: () => ({}),
    },
    Decoration: {
      mark: inertDecoration,
      line: inertDecoration,
    },
    ViewPlugin: { fromClass: () => ({}) },
    WidgetType: InertBase,
    RectangleMarker: InertBase,
    layer: () => ({}),
  } as unknown as ViewModule;

  const codemirrorState = {
    Annotation: {
      define: () => ({ of: () => ({}) }),
    },
    Compartment: class {
      of() { return {}; }
      reconfigure() { return {}; }
    },
    Facet: { define: () => inertFacet },
    StateField: { define: () => ({}) },
  } as unknown as StateModule;

  const stubs: Record<string, unknown> = {
    'markedit-api': markeditApi,
    '@codemirror/view': codemirrorView,
    '@codemirror/state': codemirrorState,
  };

  host.require = (id: string) => stubs[id] ?? {};
}
