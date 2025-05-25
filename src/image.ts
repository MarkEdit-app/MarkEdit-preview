const parser = new DOMParser();
const scheme = 'image-loader';

/**
 * Replace localhost urls with a url scheme that can be used in the client.
 *
 * We don't use a markdown-it rule here because it's hard to handle inline html.
 */
export function replaceImageURLs(html: string) {
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll<HTMLImageElement>('img');

  images.forEach(image => {
    // Don't use image.src, which includes the host
    const url = image.getAttribute('src');
    if (url === null) {
      return;
    }

    // Image with a remote url or base64 data
    if (url.includes('://') || url.startsWith('data:image/')) {
      return;
    }

    // Image with a local file path
    image.src = `${scheme}://${url}`;
  });

  return doc.body.innerHTML;
}
