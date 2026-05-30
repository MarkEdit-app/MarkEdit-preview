import { localized } from '../shared/strings';

export function createToolbar(): {
  toolbar: HTMLElement;
  sourceButton: HTMLButtonElement;
  previewButton: HTMLButtonElement;
} {
  const sourceButton = createButton(localized('source'));
  const previewButton = createButton(localized('preview'));

  const segmented = document.createElement('div');
  segmented.className = 'quicklook-segmented';
  segmented.setAttribute('role', 'tablist');
  segmented.append(sourceButton, previewButton);

  const toolbar = document.createElement('div');
  toolbar.className = 'quicklook-toolbar';
  toolbar.appendChild(segmented);

  return { toolbar, sourceButton, previewButton };
}

function createButton(label: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = label;
  button.type = 'button';
  button.className = 'quicklook-segment';
  button.setAttribute('role', 'tab');

  return button;
}
