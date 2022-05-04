import * as z from 'zod';
import { CompleteProject, RelatedProjectModel } from './index';

export const ProfileModel = z.object({
    uuid: z.string(),
    email: z.string().nullish(),
    name: z.string().nullish(),
});

export interface CompleteProfile extends z.infer<typeof ProfileModel> {
    projects: CompleteProject[]
}

/**
 * RelatedProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProfileModel: z.ZodSchema<CompleteProfile> = z.lazy(() => ProfileModel.extend({
    projects: RelatedProjectModel.array(),
}));
