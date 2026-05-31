import { MarkEdit } from 'markedit-api';
import { updateBehavior } from './settings';
import { localized } from '../shared/strings';
import { currentViewMode, ViewMode } from '../view';
import { hasFilePathInfo } from '../shared/utils';
import { ClassNames } from '../shared/const';

/**
 * Based on GitHub Releases API.
 */
interface Release {
  name: string;
  body: string;
  tag_name: string;
  html_url: string;
}

export async function checkForUpdates() {
  if (updateBehavior === 'never') {
    return;
  }

  const release = await fetchLatestRelease();
  if (typeof release.tag_name !== 'string') {
    // Invalid response
    return;
  }

  if (release.name === __PKG_VERSION__) {
    // Up to date
    return;
  }

  if (skippedVersions().has(release.name)) {
    // Explicitly skipped
    return;
  }

  if (updateBehavior === 'automatic' && hasFilePathInfo()) {
    await downloadLatestBuild(release.tag_name);
  } else if (updateBehavior === 'quiet') {
    states.pendingRelease = release;
    renderUpdatePill(release);
  } else {
    presentUpdateAlert(release);
  }
}

export async function checkForUpdatesThrottled() {
  const currentTime = Date.now();
  const lastCheckTime = Number(localStorage.getItem(Constants.lastCheckCacheKey) ?? '0');

  // Checked within the last 3 days
  if (currentTime - lastCheckTime < 259200000) {
    return;
  }

  try {
    await checkForUpdates();
    localStorage.setItem(Constants.lastCheckCacheKey, String(currentTime));
  } catch (error) {
    console.error('Failed to check for updates:', error);
  }
}

/**
 * Fetches the latest release information from GitHub API.
 */
export async function fetchLatestRelease(): Promise<Release> {
  const response = await fetch(Constants.latestReleaseURL);
  return await response.json() as Release;
}

/**
 * Download the build for the given release tag matching the current variant
 * (lite or full) and overwrite the current script in place. Returns true on success.
 */
export async function downloadLatestBuild(tagName?: string): Promise<boolean> {
  if (typeof __FILE_PATH__ !== 'string') {
    console.error('Cannot download the latest build: unknown file path');
    return false;
  }

  try {
    const filePath = __FILE_PATH__;
    const variantPath = __FULL_BUILD__ ? '' : 'lite/';
    const branchPath = tagName === undefined ? 'main' : `refs/tags/${encodeURIComponent(tagName)}`;
    const downloadURL = `${Constants.rawBaseURL}${branchPath}/dist/${variantPath}markedit-preview.js`;
    const response = await fetch(downloadURL);

    if (!response.ok) {
      console.error(`Failed to download the latest build from ${downloadURL}`);
      return false;
    }

    const content = await response.text();
    return await MarkEdit.createFile({
      path: filePath,
      string: content,
      overwrites: true,
    });
  } catch (error) {
    console.error('Failed to download the latest build:', error);
    return false;
  }
}

export function renderUpdatePill(release = states.pendingRelease): HTMLButtonElement | undefined {
  if (release === undefined) {
    return undefined;
  }

  const existingPill = document.querySelector<HTMLButtonElement>(`.${ClassNames.updatePillClass}`);
  if (existingPill !== null) {
    if (existingPill.dataset.releaseName === release.name) {
      return existingPill;
    } else {
      existingPill.remove();
    }
  }

  const newPill = document.createElement('button');
  newPill.dataset.releaseName = release.name;
  newPill.className = ClassNames.updatePillClass;
  newPill.textContent = localized('update');
  newPill.style.display = currentViewMode() === ViewMode.edit ? 'none' : '';

  newPill.addEventListener('webkitmouseforcedown', event => {
    event.preventDefault();
  });

  newPill.addEventListener('click', () => {
    const { title, actions } = updateUserInfo(release, () => {
      states.pendingRelease = undefined;
      newPill.remove();
    });

    const [primaryAction, ...otherActions] = actions;
    const rect = newPill.getBoundingClientRect();
    const location = { x: rect.left, y: rect.bottom + 10 };

    MarkEdit.showContextMenu([
      { title },
      primaryAction,
      { separator: true },
      ...otherActions,
    ], location);
  });

  document.body.appendChild(newPill);
  return newPill;
}

async function presentUpdateAlert(release: Release) {
  const { title, actions } = updateUserInfo(release);
  const result = await MarkEdit.showAlert({
    title,
    message: release.body,
    buttons: actions.map(action => action.title),
  });

  actions[result]?.action?.();
}

function updateUserInfo(release: Release, onDismiss = () => {}) {
  const title = `MarkEdit-preview ${release.name} ${localized('newVersionAvailable')}`;
  const actions = [
    ...(hasFilePathInfo() ? [{
      title: localized('updateAndRelaunch'),
      action: async () => {
        if (await downloadLatestBuild(release.tag_name)) {
          MarkEdit.relaunchApp();
        } else {
          MarkEdit.showAlert(localized('failedToUpdate'));
        }

        onDismiss();
      },
    }] : []),
    {
      title: localized('viewReleasePage'),
      action: () => {
        open(release.html_url);
        onDismiss();
      },
    },
    {
      title: localized('remindMeLater'),
      action: onDismiss,
    },
    {
      title: localized('skipThisVersion'),
      action: () => {
        const skipped = skippedVersions();
        skipped.add(release.name);
        localStorage.setItem(Constants.skippedCacheKey, JSON.stringify([...skipped]));
        onDismiss();
      },
    },
  ];

  return { title, actions };
}

function skippedVersions(): Set<string> {
  const cachedData = localStorage.getItem(Constants.skippedCacheKey);
  return new Set(JSON.parse(cachedData ?? '[]'));
}

const Constants = {
  latestReleaseURL: 'https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest',
  rawBaseURL: 'https://raw.githubusercontent.com/MarkEdit-app/MarkEdit-preview/',
  lastCheckCacheKey: 'updater.last-check-time',
  skippedCacheKey: 'updater.skipped-versions',
};

const states: {
  pendingRelease: Release | undefined;
} = {
  pendingRelease: undefined,
};
