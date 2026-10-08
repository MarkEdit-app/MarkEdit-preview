export async function loadMermaid() {
  const mermaid = await (mermaidAPI ??= importMermaid());
  const isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkMode !== mermaidDarkMode) {
    mermaid.initialize({ theme: isDarkMode ? 'dark' : undefined });
    mermaidDarkMode = isDarkMode;
  }

  return mermaid;
}

export function renderMermaidDiagrams(container: HTMLElement, process: () => void) {
  const nodes = [...container.querySelectorAll<HTMLElement>('.mermaid')]
    .filter(node => !node.getAttribute('data-processed'));
  if (nodes.length === 0) {
    return;
  }

  // Mermaid measures HTML labels in viewport pixels. Keep its layout outside
  // the zoomed preview, but retain the markdown styles and available width.
  const staging = document.createElement('div');
  staging.className = 'markdown-body';
  staging.setAttribute('aria-hidden', 'true');
  staging.style.cssText = 'position: fixed; inset: 0 0 auto; visibility: hidden; pointer-events: none; display: block; padding: 0; margin: 0; zoom: 1;';

  const diagrams = nodes.map(node => {
    const diagram = node.cloneNode(true) as HTMLElement;
    const layout = document.createElement('div');
    layout.style.width = node.clientWidth > 0 ? `${node.clientWidth}px` : '100%';
    layout.appendChild(diagram);
    staging.appendChild(layout);
    node.setAttribute('data-processed', 'true');
    return diagram;
  });

  document.body.appendChild(staging);
  void loadMermaid().then(mermaid => mermaid.run({ nodes: diagrams })).catch(error => {
    console.error(error);
  }).finally(() => {
    let updated = false;
    nodes.forEach((node, index) => {
      if (container.isConnected && container.contains(node)) {
        // Move the rendered element, including Mermaid's event listeners and
        // any error diagram, rather than serializing it again.
        node.replaceWith(diagrams[index]);
        updated = true;
      }
    });

    staging.remove();
    if (updated) {
      process();
    }
  });
}

// MARK: - Internal functions

const importMermaid = __FULL_BUILD__
  ? () => import('mermaid').then(mod => mod.default)
  : async () => ({
    initialize: () => {},
    render: async () => ({ svg: '' }),
    run: async ({ postRenderCallback }: { postRenderCallback?: () => void }) => postRenderCallback?.(),
  });

let mermaidAPI: ReturnType<typeof importMermaid> | undefined;
let mermaidDarkMode: boolean | undefined;
