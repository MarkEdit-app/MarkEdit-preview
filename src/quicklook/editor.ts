interface LiteHost {
  editor?: LiteEditor;
  config?: { text?: string };
}

interface LiteEditor {
  state?: { doc: { toString(): string } };
}

export function getEditorText(): string {
  const host = window as unknown as LiteHost;
  const text = host.editor?.state?.doc.toString();
  if (typeof text === 'string') {
    return text;
  }

  console.error('Failed to get text from host editor state');
  return host.config?.text ?? '';
}
