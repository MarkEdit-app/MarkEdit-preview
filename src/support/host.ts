import { MarkEdit } from 'markedit-api';

/**
 * Whether the full MarkEdit CoreEditor host is available.
 */
export function hasFullHost(): boolean {
  return typeof MarkEdit.addExtension === 'function';
}

/**
 * Whether the host ships its own extension manager (MarkEdit 1.34.0+),
 * which makes this extension's self-update mechanism redundant.
 */
export function hasExtensionManager(): boolean {
  if (typeof MarkEdit.runtimeInfo !== 'function') {
    return false;
  }

  // appVersion is always 3 numeric segments, so numeric collation is a safe comparison
  const appVersion = MarkEdit.runtimeInfo().appVersion;
  return appVersion.localeCompare('1.34.0', undefined, { numeric: true }) >= 0;
}
