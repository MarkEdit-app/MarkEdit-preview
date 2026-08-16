import { syntaxTree } from '@codemirror/language';
import { Facet, type Range } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView, ViewPlugin, type ViewUpdate } from '@codemirror/view';
import { blockquoteSyntaxRange } from './blockquote';
import { blockquoteBars } from './components/bar';
import { unorderedListBullets } from './components/bullet';
import { taskCheckboxes } from './components/task';
import { LinkIconWidget } from './components/icon';
import { InlineImageWidget } from './components/image';
import { atxHeadingSyntaxRange, setextHeadingSyntaxLine } from './heading';
import { horizontalRuleDecoration } from './horizontalRule';
import { inlineSyntaxDecorations } from './inline';
import { linkSyntax, referenceDestinationResolver } from './link';
import { hiddenSyntaxTheme } from './theme';
import { unorderedListSyntax } from './unorderedList';
import { inlineImages } from '../support/settings';

const hiddenSyntax = Decoration.mark({ class: 'cm-md-syntaxHiddenSource' });
const hiddenQuoteSyntax = Decoration.mark({ class: 'cm-md-syntaxHiddenSource cm-md-syntaxHiddenQuoteMark' });
const hiddenBulletSyntax = Decoration.mark({ class: 'cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenBulletMark' });
const hiddenTaskListSyntax = Decoration.mark({ class: 'cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenTaskMark' });
const hiddenLine = Decoration.line({ class: 'cm-md-syntaxHiddenSetextUnderline' });
const hiddenLinkLabel = Decoration.mark({ class: 'cm-md-syntaxHiddenLinkLabel' });
const hiddenImageLabel = Decoration.mark({ class: 'cm-md-syntaxHiddenImageLabel' });
const inlineImagesConfig = Facet.define<boolean, boolean>({ combine: values => values[values.length - 1] ?? inlineImages });

const hiddenSyntaxBaseExtension = [
  EditorView.editorAttributes.of({
    class: 'cm-md-syntaxHiddenMode',
  }),
  ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;
      constructor(view: EditorView) {
        this.decorations = hiddenSyntaxDecorations(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged
          || update.selectionSet
          || update.viewportChanged
          || update.geometryChanged
          || update.transactions.some(transaction => transaction.reconfigured)) {
          this.decorations = hiddenSyntaxDecorations(update.view);
        }
      }
    },
    { decorations: plugin => plugin.decorations },
  ),
  blockquoteBars,
  unorderedListBullets,
  taskCheckboxes,
  hiddenSyntaxTheme,
];

export function createHiddenSyntaxExtension(renderInlineImages = inlineImages) {
  return [inlineImagesConfig.of(renderInlineImages), hiddenSyntaxBaseExtension];
}

export const hiddenSyntaxExtension = createHiddenSyntaxExtension();

function hiddenSyntaxDecorations(view: EditorView) {
  const ranges: Range<Decoration>[] = [];
  const renderInlineImages = view.state.facet(inlineImagesConfig);
  const resolveReferenceDestination = referenceDestinationResolver(view.state);

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: node => {
        // > Blockquote
        const blockquote = blockquoteSyntaxRange(node, view.state);
        if (blockquote !== undefined) {
          ranges.push(hiddenQuoteSyntax.range(blockquote.from, blockquote.to));
        }

        // - Unordered List
        const unorderedList = unorderedListSyntax(node, view.state);
        if (unorderedList !== undefined) {
          const decoration = unorderedList.task ? hiddenTaskListSyntax : hiddenBulletSyntax;
          ranges.push(decoration.range(unorderedList.from, unorderedList.to));
        }

        // [Link](url) or ![Image](url)
        const link = linkSyntax(node, view.state, resolveReferenceDestination);
        if (link !== undefined) {
          const labelText = view.state.sliceDoc(link.label.from, link.label.to);
          if (renderInlineImages && link.image && link.destination !== '') {
            ranges.push(Decoration.replace({
              widget: new InlineImageWidget(link.destination, labelText),
            }).range(node.from, node.to));
          } else {
            link.hidden.forEach(range => ranges.push(hiddenSyntax.range(range.from, range.to)));
            const label = link.image ? hiddenImageLabel : hiddenLinkLabel;
            ranges.push(label.range(link.label.from, link.label.to));
            ranges.push(Decoration.widget({
              widget: new LinkIconWidget(
                link.image ? 'image' : 'link',
                view.state,
                link.destination,
                labelText,
                link.highlightTags,
              ),
              side: -1,
            }).range(link.label.to));
          }
        }

        // Inline syntax (emphasis, strong emphasis, strikethrough, inline code)
        const inlineDecorations = inlineSyntaxDecorations(node, view.state);
        ranges.push(...inlineDecorations);

        // --- Horizontal Rule
        const horizontalRule = horizontalRuleDecoration(node, view.state);
        if (horizontalRule !== undefined) {
          ranges.push(horizontalRule);
        }

        // # ATX Heading
        const atxHeading = atxHeadingSyntaxRange(node, view.state);
        if (atxHeading !== undefined) {
          ranges.push(hiddenSyntax.range(atxHeading.from, atxHeading.to));
        }

        // Setext Heading
        // ===
        const setextHeading = setextHeadingSyntaxLine(node, view.state);
        if (setextHeading !== undefined) {
          ranges.push(hiddenLine.range(setextHeading));
        }
      },
    });
  }

  return Decoration.set(ranges, true);
}
