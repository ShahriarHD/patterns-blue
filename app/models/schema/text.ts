import * as z from 'zod';
import { CompleteBlock, RelatedBlockModel } from './index';

export const TextModel = z.object({
    uuid: z.string(),
    content: z.string(),
    blockId: z.string(),
});

export interface CompleteText extends z.infer<typeof TextModel> {
    block: CompleteBlock
}

/**
 * RelatedTextModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTextModel: z.ZodSchema<CompleteText> = z.lazy(() => TextModel.extend({
    block: RelatedBlockModel,
}));
