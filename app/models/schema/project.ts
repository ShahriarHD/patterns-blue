import * as z from 'zod';
import { CompleteProfile, RelatedProfileModel, CompleteBlock, RelatedBlockModel } from './index';

export const ProjectModel = z.object({
    uuid: z.string(),
    createdAt: z.date(),
    name: z.string().nullish(),
    description: z.string().nullish(),
    slug: z.string().nullish(),
    index: z.number().int(),
    ownerId: z.string(),
    isPublic: z.boolean(),
    isArchived: z.boolean(),
});

export interface CompleteProject extends z.infer<typeof ProjectModel> {
    owner: CompleteProfile
    blocks: CompleteBlock[]
}

/**
 * RelatedProjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectModel: z.ZodSchema<CompleteProject> = z.lazy(() => ProjectModel.extend({
    owner: RelatedProfileModel,
    blocks: RelatedBlockModel.array(),
}));
