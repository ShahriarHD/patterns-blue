import * as z from 'zod';
import { BlockSize, BlockSize, BlockAlignment } from '@prisma/client';
import { CompleteProject, RelatedProjectModel, CompleteColor, RelatedColorModel, CompleteImage, RelatedImageModel, CompleteSequence, RelatedSequenceModel, CompleteText, RelatedTextModel } from './index';

export const BlockModel = z.object({
    /**
   * The unique identifier for the post
   * @default {Generated by database}
   */
    uuid: z.string(),
    /**
   * Index of the Block inside a project
   */
    index: z.number().int().min(0),
    /**
   * width of the block
   */
    width: z.nativeEnum(BlockSize),
    /**
   * height of the block
   */
    height: z.nativeEnum(BlockSize),
    /**
   * alignment of the blocke
   */
    alignment: z.nativeEnum(BlockAlignment),
    projectId: z.string(),
});

export interface CompleteBlock extends z.infer<typeof BlockModel> {
    project: CompleteProject
    color?: CompleteColor | null
    image?: CompleteImage | null
    sequence?: CompleteSequence | null
    text?: CompleteText | null
}

/**
 * RelatedBlockModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBlockModel: z.ZodSchema<CompleteBlock> = z.lazy(() => BlockModel.extend({
    project: RelatedProjectModel,
    color: RelatedColorModel.nullish(),
    image: RelatedImageModel.nullish(),
    sequence: RelatedSequenceModel.nullish(),
    text: RelatedTextModel.nullish(),
}));
