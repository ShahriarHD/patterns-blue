import * as z from 'zod';
import { CompleteBlock, RelatedBlockModel } from './index';

export const SequenceModel = z.object({
    uuid: z.string(),
    title: z.string(),
    steps: z.string().array(),
    blockId: z.string(),
});

export interface CompleteSequence extends z.infer<typeof SequenceModel> {
    block: CompleteBlock
}

/**
 * RelatedSequenceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSequenceModel: z.ZodSchema<CompleteSequence> = z.lazy(() => SequenceModel.extend({
    block: RelatedBlockModel,
}));
