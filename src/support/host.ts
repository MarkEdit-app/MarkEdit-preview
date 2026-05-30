import { MarkEdit } from 'markedit-api';

/**
 * Whether the full MarkEdit CoreEditor host is available.
 */
export function hasFullHost(): boolean {
  return typeof MarkEdit.addExtension === 'function';
}
