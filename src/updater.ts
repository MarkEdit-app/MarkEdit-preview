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

  if (skippedVersions().has(release.name)) {
    return;
  }

  if (updateBehavior === 'quiet') {
    states.pendingRelease = release;
    const previewPane = document.querySelector<HTMLElement>('.markdown-body');
    const hasPreview = previewPane !== null && getComputedStyle(previewPane).display !== 'none';
    appendUpdateButton(hasPreview);
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

export function appendUpdateButton(visible: boolean) {
  if (!states.pendingRelease || document.body.querySelector('.markdown-update-pill')) {
    return;
  }

  const release = states.pendingRelease;
  const button = document.createElement('button');
  button.className = 'markdown-update-pill';
  button.textContent = localized('update');

  if (!visible) {
    button.style.display = 'none';
  }

  button.addEventListener('webkitmouseforcedown', e => e.preventDefault());
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
          skipVersionWithName(release.name);
          dismissUpdate(button);
        },
      },
    ], { x: rect.left, y: rect.bottom + 10 });
  });

  document.body.appendChild(button);
  requestAnimationFrame(() => { button.style.opacity = '1'; });
}

export function setUpdateButtonVisible(visible: boolean) {
  const button = document.body.querySelector<HTMLElement>('.markdown-update-pill');
  if (button) {
    button.style.display = visible ? '' : 'none';
  }
}

function dismissUpdate(button: HTMLElement) {
  states.pendingRelease = undefined;
  button.style.opacity = '0';
  button.addEventListener('transitionend', e => {
    if (e.propertyName === 'opacity') {
      button.remove();
    }
  }, { once: true });
}

function skippedVersions(): Set<string> {
  return new Set(JSON.parse(localStorage.getItem(Constants.skippedCacheKey) ?? '[]'));
}

function skipVersionWithName(name: string) {
  const skipped = skippedVersions();
  skipped.add(name);

  localStorage.setItem(
    Constants.skippedCacheKey,
    JSON.stringify([...skipped]),
  );
}

const Constants = {
  latestReleaseURL: 'https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest',
  lastCheckCacheKey: 'updater.last-check-time',
  skippedCacheKey: 'updater.skipped-versions',
};
