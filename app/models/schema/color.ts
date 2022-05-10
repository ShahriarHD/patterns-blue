import * as z from 'zod';
import { CompleteBlock, RelatedBlockModel } from './index';

export const ColorModel = z.object({
    uuid: z.string(),
    hex: z.string(),
    name: z.string(),
    blockId: z.string(),
});

export interface CompleteColor extends z.infer<typeof ColorModel> {
    block: CompleteBlock
}

/**
 * RelatedColorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedColorModel: z.ZodSchema<CompleteColor> = z.lazy(() => ColorModel.extend({
    block: RelatedBlockModel,
}));
