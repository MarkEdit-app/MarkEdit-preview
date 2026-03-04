import { MarkEdit } from 'markedit-api';
import { updateBehavior } from './settings';
import { localized } from './strings';
import { appendUpdateButton } from './view';

export async function checkForUpdates() {
  if (updateBehavior === 'never') {
    return;
  }

  const currentTime = Date.now();
  const lastCheckTime = Number(localStorage.getItem(Constants.lastCheckCacheKey) ?? '0');
  if (currentTime - lastCheckTime < 259200000) {
    return;
  }

  localStorage.setItem(
    Constants.lastCheckCacheKey,
    String(currentTime),
  );

  const response = await fetch(Constants.latestReleaseURL);
  const release = await response.json() as Release;
  if (release.name === __PKG_VERSION__) {
    return;
  }

  if (skippedVersions().has(release.name)) {
    return;
  }

  if (updateBehavior === 'quiet') {
    states.pendingRelease = release;
    appendUpdateButton();
    return;
  }

  const buttons = [
    localized('viewReleasePage'),
    localized('remindMeLater'),
    localized('skipThisVersion'),
  ];

  const result = await MarkEdit.showAlert({
    title: `MarkEdit-preview ${release.name} ${localized('newVersionAvailable')}`,
    message: release.body,
    buttons,
  });

  if (result === buttons.indexOf(localized('viewReleasePage'))) {
    open(release.html_url);
  }

  if (result === buttons.indexOf(localized('skipThisVersion'))) {
    skipVersionWithName(release.name);
  }
}

export function getPendingRelease() {
  return states.pendingRelease;
}

export function clearPendingRelease() {
  states.pendingRelease = undefined;
}

export function skipVersionWithName(name: string) {
  const skipped = skippedVersions();
  skipped.add(name);

  localStorage.setItem(
    Constants.skippedCacheKey,
    JSON.stringify([...skipped]),
  );
}

function skippedVersions(): Set<string> {
  return new Set(JSON.parse(localStorage.getItem(Constants.skippedCacheKey) ?? '[]'));
}

interface Release {
  name: string;
  body: string;
  html_url: string;
}

const Constants = {
  latestReleaseURL: 'https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest',
  lastCheckCacheKey: 'updater.last-check-time',
  skippedCacheKey: 'updater.skipped-versions',
};

const states: {
  pendingRelease: Release | undefined;
} = {
  pendingRelease: undefined,
};
