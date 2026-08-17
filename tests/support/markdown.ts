import type { BlockContext, LeafBlock, Line, MarkdownConfig } from '@lezer/markdown';
import { GFM } from '@lezer/markdown';

const blockMathConfig: MarkdownConfig = {
  defineNodes: ['BlockMath', 'BlockMathContent'],
  parseBlock: [{
    name: 'BlockMath',
    before: 'Blockquote',
    parse(context: BlockContext, line: Line) {
      const startMatch = /^\s*(?:[>]\s*)?\$\$/.exec(line.text);
      if (startMatch === null) {
        return false;
      }

      const start = context.lineStart + startMatch[0].length;
      let endMatch = /\$\$\s*$/.exec(line.text.substring(startMatch[0].length));
      let stop: number;
      if (endMatch !== null) {
        stop = context.lineStart + line.text.length - endMatch[0].length;
      } else {
        let hasNextLine: boolean;
        do {
          hasNextLine = context.nextLine();
          endMatch = hasNextLine ? /^\s*(?:[>]\s*)?(\$\$\s*)$/.exec(line.text) : null;
        } while (hasNextLine && endMatch === null);
        stop = hasNextLine && endMatch !== null
          ? context.lineStart + line.text.length - endMatch[1].length
          : context.lineStart;
      }

      const lineEnd = context.lineStart + line.text.length;
      context.addElement(context.elt('BlockMath', start - 2, Math.min(lineEnd, stop + 2), [
        context.elt('BlockMathContent', start, stop),
      ]));

      context.nextLine();
      return true;
    },
    endLeaf(_context: BlockContext, line: Line) {
      return /^\s*(?:[>]\s*)?\$\$/.test(line.text);
    },
  }],
};

const linkDefinitionConfig: MarkdownConfig = {
  defineNodes: [
    'LinkDefinition',
    'LinkDefinitionID',
    'LinkDefinitionMark',
  ],
  parseBlock: [
    {
      name: 'LinkDefinition',
      leaf(_, leaf) {
        const match = /^\[([^\]]+)\]:/.exec(leaf.content);
        if (match === null) {
          return null;
        }

        const startPos = leaf.start;
        const endPos = startPos + match[0].length - 1;
        const finish = (context: BlockContext, block: LeafBlock) => {
          context.addLeafElement(
            block,
            context.elt(
              'LinkDefinition', startPos, endPos,
              [
                context.elt('LinkDefinitionMark', startPos, startPos + 1),
                context.elt('LinkDefinitionID', startPos + 1, endPos - 1),
                context.elt('LinkDefinitionMark', endPos - 1, endPos),
              ],
            ),
          );

          return true;
        };

        return { finish, nextLine: (context, _line, block) => finish(context, block) };
      },
      before: 'LinkReference',
    },
  ],
};

export const markdownExtensions: MarkdownConfig[] = [...GFM, linkDefinitionConfig, blockMathConfig];
