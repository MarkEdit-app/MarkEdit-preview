import type { SearchOptions, SearchCounterInfo } from '../src/search';

declare global {
  interface Window {
    __markeditPreviewInitialized__: boolean;
    __markeditPreviewSPI__?: {
      performSearch(options: SearchOptions): void;
      setSearchMatchIndex(index: number): void;
      clearSearch(): void;
      searchCounterInfo(): SearchCounterInfo | undefined;
    };
    MarkEditGetHtml: (styled: boolean) => Promise<string>;
  }
}

export {};
