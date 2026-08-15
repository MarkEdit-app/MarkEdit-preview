import { scrollToElement } from '../shared/utils';

export function handlePreviewLinkClick(container: HTMLElement, event: MouseEvent) {
  const anchor = event.target instanceof Element ? event.target.closest('a') : null;
  const destination = anchor?.getAttribute('href') ?? '';
  if (!destination.startsWith('#')) {
    return false;
  }

  const followed = followPreviewLinkAnchor(container, destination);
  if (followed) {
    event.preventDefault();
  }

  return followed;
}

export function followPreviewLinkAnchor(container: HTMLElement, destination: string) {
  if (!destination.startsWith('#')) {
    return false;
  }

  const id = decodeAnchor(destination.substring(1));
  const target = [...container.querySelectorAll<HTMLElement>('[id]')].find(element => element.id === id);
  if (target === undefined) {
    return false;
  }

  scrollToElement(container, target, 0, false);
  return true;
}

function decodeAnchor(anchor: string) {
  try {
    return decodeURIComponent(anchor);
  } catch {
    return anchor;
  }
}
