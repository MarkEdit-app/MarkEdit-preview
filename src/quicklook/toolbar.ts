import { localized } from '../shared/strings';

// Compact-mode icons: `#` for source, an eye for preview.
// Artwork is nudged up (translate y) so it renders optically centered in the box.
const sourceIcon = '<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>';
const previewIcon = '<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';

export function createToolbar(): {
  toolbar: HTMLElement;
  sourceButton: HTMLButtonElement;
  previewButton: HTMLButtonElement;
} {
  const sourceButton = createButton(localized('source'), sourceIcon);
  const previewButton = createButton(localized('preview'), previewIcon);

  const segmented = document.createElement('div');
  segmented.className = 'quicklook-segmented';
  segmented.setAttribute('role', 'tablist');
  segmented.append(sourceButton, previewButton);

  const toolbar = document.createElement('div');
  toolbar.className = 'quicklook-toolbar';
  toolbar.appendChild(segmented);

  return { toolbar, sourceButton, previewButton };
}

function createButton(label: string, icon: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.title = label;
  button.type = 'button';
  button.className = 'quicklook-segment';
  button.setAttribute('role', 'tab');
  button.setAttribute('aria-label', label);

  const labelText = document.createElement('span');
  labelText.textContent = label;
  labelText.className = 'quicklook-segment-label';

  const iconWrapper = document.createElement('span');
  iconWrapper.innerHTML = icon;
  iconWrapper.className = 'quicklook-segment-icon';

  button.append(labelText, iconWrapper);
  return button;
}
