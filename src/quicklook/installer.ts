import { MarkEdit } from 'markedit-api';
import { joinPaths, parseJSON } from '../shared/utils';

const METADATA_KEY = 'markedit-preview';
const DEFAULT_FILE_NAME = `${METADATA_KEY}.js`;

/**
 * Decide whether the source bundle needs to be (re)written into the shared
 * container — true when the dest is missing, the version changed, or the
 * build variant (lite vs full) changed.
 */
export function shouldCopy(params: {
  destExists: boolean;
  bundleInfo: { version?: string; fullBuild?: boolean } | undefined;
  currentVersion: string;
}): boolean {
  const { destExists, bundleInfo, currentVersion } = params;
  const sameVersion = bundleInfo?.version === currentVersion;
  const sameVariant = bundleInfo?.fullBuild === __FULL_BUILD__;
  return !(destExists && sameVersion && sameVariant);
}

/**
 * Copy the deployed `markedit-preview.js` from the app's documents folder
 * to the App Group shared container, so the Quick Look Extension can load it.
 *
 * Skipped when the stored version matches `__PKG_VERSION__` and the deployed
 * build variant (lite vs full) is unchanged.
 */
export async function copyToSharedContainer() {
  try {
    const documentsDir = MarkEdit.getDirectoryPath('documents') as string | undefined;
    const sharedContainerDir = MarkEdit.getDirectoryPath('sharedContainer') as string | undefined;

    if (documentsDir === undefined || sharedContainerDir === undefined) {
      console.error('Required directories are not accessible');
      return;
    }

    const sourcePath = typeof __FILE_PATH__ === 'string'
      ? __FILE_PATH__
      : joinPaths(documentsDir, `scripts/${DEFAULT_FILE_NAME}`);
    const sourceInfo = await MarkEdit.getFileInfo(sourcePath);

    if (sourceInfo === undefined) {
      console.error(`Source file not found at ${sourcePath}`);
      return;
    }

    // For existence check
    const fileName = sourcePath.split('/').pop() ?? DEFAULT_FILE_NAME;
    const destDir = joinPaths(sharedContainerDir, 'Shared/scripts');
    const destPath = joinPaths(destDir, fileName);
    const destExists = (await MarkEdit.getFileInfo(destPath)) !== undefined;

    // For metadata check
    const metadataPath = joinPaths(sharedContainerDir, 'Shared/metadata.json');
    const metadataJSON = await parseJSON(metadataPath);
    const bundleInfo = metadataJSON[METADATA_KEY] as { version?: string; fullBuild?: boolean } | undefined;

    if (!shouldCopy({
      destExists,
      bundleInfo,
      currentVersion: __PKG_VERSION__,
    })) {
      return;
    }

    const sourceFile = await MarkEdit.getFileContent(sourcePath);
    if (sourceFile === undefined) {
      console.error(`Failed to read content from ${sourcePath}`);
      return;
    }

    // Shared/scripts folder
    await MarkEdit.createFile({
      path: destDir,
      isDirectory: true,
    });

    // markedit-preview.js file
    await MarkEdit.createFile({
      path: destPath,
      string: sourceFile,
      overwrites: true,
    });

    // metadata.json file
    await MarkEdit.createFile({
      path: metadataPath,
      string: JSON.stringify({
        ...metadataJSON,
        [METADATA_KEY]: {
          version: __PKG_VERSION__,
          fullBuild: __FULL_BUILD__,
        },
      }, null, 2),
      overwrites: true,
    });
  } catch (error) {
    console.error('Failed to copy the current file to shared container:', error);
  }
}
