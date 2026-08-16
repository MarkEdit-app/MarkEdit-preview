import { Compartment, type Extension } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';

const extensionCompartment = new Compartment();
export const hiddenSyntaxModeExtension = extensionCompartment.of([]);

let modeChangeVersion = 0;
export async function setHiddenSyntaxMode(view: EditorView, enabled: boolean) {
  const change = ++modeChangeVersion;
  const extension = enabled ? await loadHiddenSyntaxExtension() : [];

  if (change !== modeChangeVersion) {
    return;
  }

  view.dispatch({
    effects: extensionCompartment.reconfigure(extension),
  });
}

let loadingExtensionPromise: Promise<Extension> | undefined;
function loadHiddenSyntaxExtension() {
  return loadingExtensionPromise ??= import('./index').then(module => module.hiddenSyntaxExtension);
}
