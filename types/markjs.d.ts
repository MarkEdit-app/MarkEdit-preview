// Partial type declarations for mark.js (https://github.com/julmot/mark.js).
declare module 'mark.js' {
  export default class Mark {
    constructor(context: Element | string);

    mark(keyword: string, options?: {
      className?: string;
      caseSensitive?: boolean;
      separateWordSearch?: boolean;
      accuracy?: 'partially' | 'complementary' | 'exactly';
      diacritics?: boolean;
      done?: (totalMatches: number) => void;
    }): void;

    markRegExp(regexp: RegExp, options?: {
      className?: string;
      done?: (totalMatches: number) => void;
    }): void;

    unmark(options?: {
      done?: () => void;
    }): void;
  }
}
