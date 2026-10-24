import type MarkdownIt from 'markdown-it';

export const appAnchorAttribute = 'data-markedit-anchor';

export function headingAnchors(markdown: ReturnType<typeof MarkdownIt>) {
  markdown.core.ruler.after('anchor', 'markedit_anchors', state => {
    const lines = state.src.split('\n');
    state.tokens.forEach((token, index) => {
      const inline = state.tokens[index + 1];
      if (token.type !== 'heading_open' || inline?.type !== 'inline' || token.map === null) {
        return;
      }

      const sourceLine = lines[token.map[0]];
      const title = token.markup.startsWith('#')
        ? sourceLine.slice(sourceLine.indexOf(token.markup)).replace(/ {0,3}#+ +/, '')
        : inline.content.split('\n')[0].trim();
      const appAnchor = (title.length > 64 ? title.substring(0, 64) + '...' : title)
        .normalize('NFKD')
        .trim()
        .toLowerCase()
        .replace(/[^\p{Letter}\p{Number}\s\-_]/gu, '')
        .replace(/\s+/g, '-');

      token.attrSet(appAnchorAttribute, appAnchor);
    });
  });
}

export function findAnchorTarget<T>(targets: readonly T[], destination: string, attribute: (target: T, name: string) => string | number | null) {
  if (!destination.startsWith('#')) {
    return undefined;
  }

  const id = decodeAnchor(destination.substring(1));
  const appID = id.toLowerCase();
  return targets.find(target => attribute(target, appAnchorAttribute) === null && attribute(target, 'id') === id)
    ?? targets.find(target => attribute(target, appAnchorAttribute) === appID)
    ?? targets.find(target => attribute(target, 'id') === id)
    ?? targets.find(target => {
      const rendererID = attribute(target, 'id');
      return rendererID !== null && decodeAnchor(String(rendererID)) === id;
    });
}

function decodeAnchor(anchor: string) {
  try {
    return decodeURIComponent(anchor);
  } catch {
    return anchor;
  }
}
