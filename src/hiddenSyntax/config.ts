import { Facet } from '@codemirror/state';
import { inlineRendering, type InlineRenderingType } from '../support/settings';

export const inlineRenderingConfig = Facet.define<readonly InlineRenderingType[], readonly InlineRenderingType[]>({
  combine: values => values[values.length - 1] ?? inlineRendering,
});
