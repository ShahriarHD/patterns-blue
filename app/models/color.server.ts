import { Color } from '@prisma/client';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { prisma } from '~/services/db.server';
import { createBlock, CreateBlockArgs } from './block.server';
import { ColorModel } from './schema';

export declare type NewColorArgs = Required<Pick<Color, 'hex' | 'meta' | 'name'>>;

declare type CreateColorBlockArgs = {
    color: NewColorArgs,
    block: CreateBlockArgs
}

export async function createColorBlock({ color, block }: CreateColorBlockArgs) {
    const parentBlock = await createBlock(block);

    const {
        hex,
        meta,
        name
    } = color;

    const newColor = await prisma.color.create({
        data: {
            hex,
            meta,
            name,
            block: {
                connect: {
                    uuid: parentBlock.uuid
                }
            },
        },
    });

    return newColor;
}

const updateColorByIdArgsValidator = ColorModel.pick({
    uuid: true,
    hex: true,
    name: true,
    meta: true
});

export declare type UpdateColorByIdArgs = z.infer<typeof updateColorByIdArgsValidator>;

export const updateColorByIdFormValidator = withZod(updateColorByIdArgsValidator);

export async function updateColorById({ uuid, ...color }: UpdateColorByIdArgs) {
    return await prisma.color.update({
        data: color,
        where: { uuid },
        include: {
            block: true
        }
    });
}
