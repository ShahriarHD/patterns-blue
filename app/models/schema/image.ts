import * as z from 'zod';
import { CompleteBlock, RelatedBlockModel } from './index';

export const ImageModel = z.object({
    uuid: z.string(),
    url: z.string(),
    blockId: z.string(),
});

export interface CompleteImage extends z.infer<typeof ImageModel> {
    block: CompleteBlock
}

/**
 * RelatedImageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedImageModel: z.ZodSchema<CompleteImage> = z.lazy(() => ImageModel.extend({
    block: RelatedBlockModel,
}));
