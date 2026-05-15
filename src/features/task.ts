/**
 * Parse a task list line and return how to flip its checkbox.
 *
 * Mirrors `markdown-it-task-lists` syntax. Acts as a safety net against stale clicks.
 *
 * @returns `offset` of the marker character (` `, `x`, or `X`) within the line,
 * and the `replacement` character to write there. `null` if the line is not a task item.
 */
export function resolveTaskToggle(lineText: string): { offset: number; replacement: string } | null {
  const match = lineText.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);
  if (match === null) {
    return null;
  }

  return {
    offset: match[1].length,
    replacement: match[2] === ' ' ? 'x' : ' ',
  };
}
