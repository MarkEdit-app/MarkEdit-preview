import { MarkEdit } from 'markedit-api';
import { viewModeToolbarItemID } from '../shared/const';

/**
 * Whether the full MarkEdit CoreEditor host is available.
 */
export function hasFullHost(): boolean {
  return typeof MarkEdit.addExtension === 'function';
}

export function invalidateViewModeToolbar() {
  if (typeof MarkEdit.invalidateToolbarItem === 'function') {
    MarkEdit.invalidateToolbarItem(viewModeToolbarItemID);
  }
}
