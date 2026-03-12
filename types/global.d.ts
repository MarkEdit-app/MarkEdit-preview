declare global {
  interface Window {
    __markeditPreviewInitialized__: boolean;
    MarkEditGetHtml: (styled: boolean) => Promise<string>;
  }
}

export {};
