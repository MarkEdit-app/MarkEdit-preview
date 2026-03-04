import { MarkEdit } from 'markedit-api';
import { updateBehavior } from './settings';
import { localized } from './strings';
import { currentViewMode, ViewMode } from './view';
import { ClassNames } from './const';

/**
 * Based on GitHub Releases API.
 */
interface Release {
  name: string;
  body: string;
  html_url: string;
}

export async function checkForUpdates() {
  if (updateBehavior === 'never') {
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
  const release = await response.json() as Release;
  if (release.name === __PKG_VERSION__) {
    // Up to date
    return;
  }

  if (skippedVersions().has(release.name)) {
    // Explicitly skipped
    return;
  }

  if (updateBehavior === 'quiet') {
    states.pendingRelease = release;
    renderUpdatePill(release);
  } else {
    presentUpdateAlert(release);
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

    const rect = newPill.getBoundingClientRect();
    const location = { x: rect.left, y: rect.bottom + 10 };

    MarkEdit.showContextMenu([
      { title },
      { separator: true },
      ...actions,
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
  lastCheckCacheKey: 'updater.last-check-time',
  skippedCacheKey: 'updater.skipped-versions',
};

const states: {
  pendingRelease: Release | undefined;
} = {
  pendingRelease: undefined,
};
