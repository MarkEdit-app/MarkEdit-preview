import { scrollToElement } from '../shared/utils';
import { findAnchorTarget } from './anchors';

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

  const targets = [...container.querySelectorAll<HTMLElement>('[id]')];
  const target = findAnchorTarget(targets, destination, (element, name) => element.getAttribute(name));
  if (target === undefined) {
    return false;
  }

  scrollToElement(container, target, 0, false);
  return true;
}
