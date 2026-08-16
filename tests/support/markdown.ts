import type { BlockContext, LeafBlock, MarkdownConfig } from '@lezer/markdown';
import { GFM } from '@lezer/markdown';

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

export const markdownExtensions: MarkdownConfig[] = [...GFM, linkDefinitionConfig];
