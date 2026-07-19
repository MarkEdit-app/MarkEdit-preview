/**
 * FEN chess board renderer for MarkEdit preview.
 *
 * Detects ```fen fenced code blocks and renders inline SVG chess boards
 * directly in the preview output, similar to how Mermaid diagrams work.
 *
 * FEN (Forsyth-Edwards Notation) is the standard notation for describing
 * chess positions. Example starting position:
 *   rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
 */

/// Piece Unicode characters (white: U+2654–U+2659, black: U+265A–U+265F).
/// Rendered as SVG <text> to bypass Safari's emoji rendering path for chess glyphs.
const PIECE_UNICODE: Record<string, string> = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
};

const LIGHT_SQUARE = '#f0d9b5';
const DARK_SQUARE  = '#b58863';
const COORD_COLOR  = '#7a7a7a';

const VALID_RANK = /^[KQRBNPkqrbnp1-8]+$/;

export interface FenOptions {
  size: number;
  float: 'left' | 'right' | 'none';
  coords: boolean;
  flip: boolean;
}

const defaults: FenOptions = {
  size: 400,
  float: 'none',
  coords: false,
  flip: false,
};

/**
 * Parse FEN display options from the fenced code info string.
 * The info string looks like "fen float-left size=300 coords flip"
 * where the first token is always "fen".
 */
function parseOptions(info: string): FenOptions {
  const opts = { ...defaults };
  for (const token of info.split(/\s+/).slice(1)) {
    switch (token) {
      case 'float-left':  opts.float = 'left';  break;
      case 'float-right': opts.float = 'right'; break;
      case 'float-none':  opts.float = 'none';  break;
      case 'coords':      opts.coords = true;   break;
      case 'flip':        opts.flip = true;     break;
      default: {
        const m = token.match(/^size=(\d+)$/);
        if (m) {
          const v = parseInt(m[1], 10);
          if (v >= 200 && v <= 800) opts.size = v;
        }
      }
    }
  }
  return opts;
}

/**
 * Parse the piece placement portion of a FEN into an 8×8 board array.
 * row 0 = rank 8 (top from white's view), row 7 = rank 1 (bottom).
 * Returns null if invalid.
 */
function parseBoard(placement: string): (string | null)[][] | null {
  const ranks = placement.split('/');
  if (ranks.length !== 8) return null;
  const board: (string | null)[][] = [];
  for (const rank of ranks) {
    if (!VALID_RANK.test(rank)) return null;
    const row: (string | null)[] = [];
    for (const ch of rank) {
      if (ch >= '1' && ch <= '8') {
        for (let i = 0; i < parseInt(ch, 10); i++) row.push(null);
      } else {
        row.push(ch);
      }
    }
    if (row.length !== 8) return null;
    board.push(row);
  }
  return board;
}

/**
 * Render a FEN string as an inline SVG chess board <figure> HTML string.
 * Returns empty string if the FEN is unparseable.
 */
export function renderFenBoard(fen: string, info: string): string {
  const fields = fen.trim().split(/\s+/);
  const board = parseBoard(fields[0]);
  if (!board) return ''; // invalid — leave raw code block

  const opts   = parseOptions(info);
  const sq     = Math.floor(opts.size / 8);
  const fSize  = Math.floor(sq * 0.72);
  const cSize  = Math.max(9, Math.floor(sq * 0.2));

  // Board orientation:
  //   row 0 = rank 8 (black's home, top), row 7 = rank 1 (white's home, bottom)
  // Standard convention: white always at bottom (ranks 8→1 top-to-bottom).
  // flip = true: black at bottom (ranks 1→8 top-to-bottom).
  const rows = opts.flip ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = opts.flip ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

  const padTop  = opts.coords ? cSize + 4 : 0;
  const padLeft = opts.coords ? cSize + 4 : 0;
  const totalW  = opts.size + padLeft;
  const totalH  = opts.size + padTop;

  // ── Build SVG ──────────────────────────────────────────────
  let svg = `<svg viewBox="0 0 ${totalW} ${totalH}" width="${totalW}" height="${totalH}" xmlns="http://www.w3.org/2000/svg">\n`;
  svg += `<g transform="translate(${padLeft}, ${padTop})">\n`;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isLight = (r + c) % 2 === 0;
      const fill = isLight ? LIGHT_SQUARE : DARK_SQUARE;
      svg += `  <rect x="${c * sq}" y="${r * sq}" width="${sq}" height="${sq}" fill="${fill}"/>\n`;

      const piece = board[rows[r]][cols[c]];
      if (piece) {
        const cx = c * sq + sq / 2;
        const cy = r * sq + sq / 2 + fSize * 0.35;
        svg += `  <text x="${cx}" y="${cy}" text-anchor="middle" font-size="${fSize}" font-family="system-ui,-apple-system,sans-serif">${PIECE_UNICODE[piece]}</text>\n`;
      }
    }
  }
  svg += `</g>\n`;

  // Coordinates
  if (opts.coords) {
    const fileOrder = opts.flip ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
    const rankLabels = opts.flip
      ? ['1', '2', '3', '4', '5', '6', '7', '8']
      : ['8', '7', '6', '5', '4', '3', '2', '1'];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let i = 0; i < 8; i++) {
      const x = padLeft + i * sq + sq / 2;
      const y = padTop + opts.size + cSize + 2;
      svg += `  <text x="${x}" y="${y}" text-anchor="middle" font-size="${cSize}" fill="${COORD_COLOR}" font-family="system-ui,-apple-system,sans-serif">${files[fileOrder[i]]}</text>\n`;
    }
    for (let i = 0; i < 8; i++) {
      const x = padLeft - 3;
      const y = padTop + i * sq + sq / 2 + cSize * 0.35;
      svg += `  <text x="${x}" y="${y}" text-anchor="end" font-size="${cSize}" fill="${COORD_COLOR}" font-family="system-ui,-apple-system,sans-serif">${rankLabels[i]}</text>\n`;
    }
  }
  svg += `</svg>`;

  // ── Figure wrapper with layout styles ──────────────────────
  const floatStyle = opts.float === 'left'  ? 'float:left;margin:0 1em .5em 0;'
    : opts.float === 'right' ? 'float:right;margin:0 0 .5em 1em;'
    : 'display:block;margin:1em auto;';

  return [
    `<figure class="fen-board" style="max-width:${totalW}px;${floatStyle}">`,
    svg,
    `<figcaption class="fen-caption"><code>${escapeHtml(fen)}</code></figcaption>`,
    `</figure>`,
  ].join('\n');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
