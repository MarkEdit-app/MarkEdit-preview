import { MarkEdit } from 'markedit-api';
import { autoUpdate } from './settings';
import { localized } from './strings';

export async function checkForUpdates() {
  if (!autoUpdate) {
    return;
  }

  const currentTime = Date.now();
  const lastCheckTime = Number(localStorage.getItem(Constants.lastCheckCacheKey) ?? '0');
  if (currentTime - lastCheckTime < 259200000) {
    // Checked within the last 3 days
    return;
  }

  localStorage.setItem(
    Constants.lastCheckCacheKey,
    String(currentTime),
  );

  const response = await fetch(Constants.latestReleaseURL);
  const release = await response.json();
  if (release.name === __PKG_VERSION__) {
    // Up to date
    return;
  }

  const skipped = new Set(JSON.parse(localStorage.getItem(Constants.skippedCacheKey) ?? '[]'));
  if (skipped.has(release.name)) {
    // Explicitly skipped
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
    skipped.add(release.name);
    localStorage.setItem(Constants.skippedCacheKey, JSON.stringify([...skipped]));
  }
}

const Constants = {
  latestReleaseURL: 'https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest',
  lastCheckCacheKey: 'updater.last-check-time',
  skippedCacheKey: 'updater.skipped-versions',
};
