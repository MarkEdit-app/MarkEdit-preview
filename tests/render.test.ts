import { describe, it, expect } from 'vitest';
import { renderMarkdown, renderMermaid } from '../src/render';

describe('renderMarkdown', () => {
  describe('code blocks without language specifier', () => {
    it('should NOT apply syntax highlighting classes', async () => {
      const md = '```\nNATURAL ENGLAND\n```';
      const html = await renderMarkdown(md);
      // Should NOT contain hljs classes
      expect(html).not.toMatch(/class="[^"]*hljs/);
    });

    it('should render plain text without keyword highlighting', async () => {
      const md = '```\nOR trigger within\n```';
      const html = await renderMarkdown(md);
      // Should NOT contain hljs-keyword or similar
      expect(html).not.toMatch(/hljs-keyword|hljs-built_in|hljs-type/);
    });

    it('should properly escape HTML in plain code blocks', async () => {
      const md = '```\n<script>alert("xss")</script>\n```';
      const html = await renderMarkdown(md);
      // Should NOT have hljs classes when no language specified
      expect(html).not.toMatch(/class="[^"]*hljs/);
      // Should still escape HTML properly (not execute scripts)
      expect(html).not.toContain('<script>alert("xss")</script>');
    });
  });

  describe('code blocks WITH language specifier', () => {
    it('should apply syntax highlighting for javascript', async () => {
      const md = '```javascript\nconst x = 1;\n```';
      const html = await renderMarkdown(md);
      // Should contain hljs classes
      expect(html).toMatch(/class="[^"]*hljs/);
    });

    it('should apply syntax highlighting for python', async () => {
      const md = '```python\ndef foo():\n    pass\n```';
      const html = await renderMarkdown(md);
      // Should contain hljs classes
      expect(html).toMatch(/class="[^"]*hljs/);
    });
  });

  describe('mermaid blocks', () => {
    it('should render as mermaid div', async () => {
      const md = '```mermaid\ngraph TD\n```';
      const html = await renderMarkdown(md);
      expect(html).toContain('<div class="mermaid"');
    });

    it('should not apply hljs classes to mermaid blocks', async () => {
      const md = '```mermaid\ngraph TD\n    A --> B\n```';
      const html = await renderMarkdown(md);
      expect(html).not.toMatch(/class="[^"]*hljs/);
    });
  });
});

describe('renderMermaid', () => {
  it('should wrap content in a mermaid div', () => {
    const content = 'graph TD\n    A --> B';
    const html = renderMermaid(content);
    expect(html).toContain('<div class="mermaid">');
    expect(html).toContain('</div>');
    expect(html).toContain('graph TD');
  });

  it('should escape HTML in mermaid content', () => {
    const content = '<script>alert("xss")</script>';
    const html = renderMermaid(content);
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('should trim whitespace from content', () => {
    const content = '  graph TD\n    A --> B  \n';
    const html = renderMermaid(content);
    expect(html).toBe('<div class="mermaid">graph TD\n    A --&gt; B</div>');
  });

  it('should not affect markdown mermaid rendering', async () => {
    const md = '```mermaid\ngraph TD\n```';
    const html = await renderMarkdown(md);
    expect(html).toContain('<div class="mermaid"');
  });
});
