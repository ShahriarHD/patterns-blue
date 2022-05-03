import { Color } from '@prisma/client';
import { prisma } from '~/services/db.server';
import { createBlock, CreateBlockArgs } from './block.server';

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
