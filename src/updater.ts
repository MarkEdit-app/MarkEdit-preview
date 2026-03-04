import { MarkEdit } from 'markedit-api';
import { updateBehavior } from './settings';
import { localized } from './strings';

interface Release {
  name: string;
  body: string;
  html_url: string;
}

const states: {
  pendingRelease: Release | undefined;
} = {
  pendingRelease: undefined,
};

export async function checkForUpdates() {
  if (updateBehavior === 'never') {
    return;
  }

  if (updateBehavior === 'notify') {
    const currentTime = Date.now();
    const lastCheckTime = Number(localStorage.getItem(Constants.lastCheckCacheKey) ?? '0');
    if (currentTime - lastCheckTime < 259200000) {
      return;
    }

    localStorage.setItem(Constants.lastCheckCacheKey, String(currentTime));
  }

  const response = await fetch(Constants.latestReleaseURL);
  const release: Release = await response.json();
  if (release.name === __PKG_VERSION__) {
    return;
  }

  const skipped = new Set(JSON.parse(localStorage.getItem(Constants.skippedCacheKey) ?? '[]'));
  if (skipped.has(release.name)) {
    return;
  }

  if (updateBehavior === 'quiet') {
    states.pendingRelease = release;
    const container = document.querySelector<HTMLElement>('.markdown-body');
    if (container) {
      appendUpdateButton(container);
    }

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

export function appendUpdateButton(container: HTMLElement) {
  if (!states.pendingRelease || container.querySelector('.markdown-update-pill')) {
    return;
  }

  const release = states.pendingRelease;
  const button = document.createElement('button');
  button.className = 'markdown-update-pill';
  button.textContent = localized('update');

  button.addEventListener('click', () => {
    const rect = button.getBoundingClientRect();
    MarkEdit.showContextMenu([
      {
        title: `${release.name} ${localized('newVersionAvailable')}`,
      },
      { separator: true },
      {
        title: localized('viewReleasePage'),
        action: () => {
          open(release.html_url);
          dismissUpdate(button);
        },
      },
      {
        title: localized('remindMeLater'),
        action: () => dismissUpdate(button),
      },
      {
        title: localized('skipThisVersion'),
        action: () => {
          const skipped = new Set(JSON.parse(localStorage.getItem(Constants.skippedCacheKey) ?? '[]'));
          skipped.add(release.name);
          localStorage.setItem(Constants.skippedCacheKey, JSON.stringify([...skipped]));
          dismissUpdate(button);
        },
      },
    ], { x: rect.left, y: rect.bottom + 10 });
  });

  container.prepend(button);
}

function dismissUpdate(button: HTMLElement) {
  states.pendingRelease = undefined;
  button.remove();
}

const Constants = {
  latestReleaseURL: 'https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest',
  lastCheckCacheKey: 'updater.last-check-time',
  skippedCacheKey: 'updater.skipped-versions',
};
