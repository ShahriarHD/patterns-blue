import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { prisma } from '~/services/db.server';
import { createBlock, createBlockArgsValidator } from './block.server';
import { ImageModel } from './schema';

const createImageArgsValidator = z.object({
    image: ImageModel.pick({
        url: true,
    }),
    block: createBlockArgsValidator
});

export declare type CreateImageArgs = z.infer<typeof createImageArgsValidator>;

export const createImageFormValidator = withZod(createImageArgsValidator);

export async function createImageBlock({ image, block }: CreateImageArgs) {
    const parentBlock = await createBlock(block);

    const {
        url,
    } = image;

    const newImage = await prisma.image.create({
        data: {
            url,
            block: {
                connect: {
                    uuid: parentBlock.uuid
                }
            },
        },
    });

    return newImage;
}

const updateImageByIdArgsValidator = ImageModel.pick({
    uuid: true,
    url: true,
});

export declare type UpdateImageByIdArgs = z.infer<typeof updateImageByIdArgsValidator>;

export const updateImageByIdFormValidator = withZod(updateImageByIdArgsValidator);

export async function updateImageById({ uuid, ...image }: UpdateImageByIdArgs) {
    return await prisma.image.update({
        data: image,
        where: { uuid },
        include: {
            block: true
        }
    });
}
