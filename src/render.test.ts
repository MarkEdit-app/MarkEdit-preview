import { describe, it, expect, beforeAll } from 'vitest';
import { renderMarkdown } from './render';

// Wait for async imports to complete (highlight.js, katex)
beforeAll(async () => {
  // Give time for dynamic imports to resolve
  await new Promise(resolve => setTimeout(resolve, 500));
});

describe('renderMarkdown', () => {
  describe('code blocks without language specifier', () => {
    it('should NOT apply syntax highlighting classes', () => {
      const md = '```\nNATURAL ENGLAND\n```';
      const html = renderMarkdown(md);
      // Should NOT contain hljs classes
      expect(html).not.toMatch(/class="[^"]*hljs/);
    });

    it('should render plain text without keyword highlighting', () => {
      const md = '```\nOR trigger within\n```';
      const html = renderMarkdown(md);
      // Should NOT contain hljs-keyword or similar
      expect(html).not.toMatch(/hljs-keyword|hljs-built_in|hljs-type/);
    });

    it('should properly escape HTML in plain code blocks', () => {
      const md = '```\n<script>alert("xss")</script>\n```';
      const html = renderMarkdown(md);
      // Should NOT have hljs classes when no language specified
      expect(html).not.toMatch(/class="[^"]*hljs/);
      // Should still escape HTML properly (not execute scripts)
      expect(html).not.toContain('<script>alert("xss")</script>');
    });
  });

  describe('code blocks WITH language specifier', () => {
    it('should apply syntax highlighting for javascript', () => {
      const md = '```javascript\nconst x = 1;\n```';
      const html = renderMarkdown(md);
      // Should contain hljs classes
      expect(html).toMatch(/class="[^"]*hljs/);
    });

    it('should apply syntax highlighting for python', () => {
      const md = '```python\ndef foo():\n    pass\n```';
      const html = renderMarkdown(md);
      // Should contain hljs classes
      expect(html).toMatch(/class="[^"]*hljs/);
    });
  });

  describe('mermaid blocks', () => {
    it('should render as mermaid div', () => {
      const md = '```mermaid\ngraph TD\n```';
      const html = renderMarkdown(md);
      expect(html).toContain('<div class="mermaid">');
    });

    it('should not apply hljs classes to mermaid blocks', () => {
      const md = '```mermaid\ngraph TD\n    A --> B\n```';
      const html = renderMarkdown(md);
      expect(html).not.toMatch(/class="[^"]*hljs/);
    });
  });
});
