import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { prisma } from '~/services/db.server';
import { BlockModel } from './schema';

export const createBlockArgsValidator = BlockModel.omit({
    uuid: true,
});

export declare type CreateBlockArgs = z.infer<typeof createBlockArgsValidator>;

export const createBlockFormValidator = withZod(createBlockArgsValidator);

export async function createBlock(block: CreateBlockArgs) {
    await prisma.block.updateMany({
        data: {
            index: {
                increment: 1
            }
        },
        where: {
            projectId: block.projectId,
            index: {
                gte: block.index
            }
        }
    });

    const newBlock = await prisma.block.create({
        data: block,
    });

    return newBlock;
}


const updateBlockByIdArgsValidator = BlockModel.pick({
    alignment: true,
    height: true,
    width:true,
    uuid: true,
});

export declare type UpdateBlockByIdArgs = z.infer<typeof updateBlockByIdArgsValidator>;

export const updateBlockFormValidator = withZod(updateBlockByIdArgsValidator);

export async function updateBlockById(args: UpdateBlockByIdArgs) {
    const { alignment, height, uuid, width } = args;

    const updatedBlock = await prisma.block.update({
        data: {
            width,
            height,
            alignment
        },
        where: {
            uuid,
        }
    });

    return updatedBlock;
}
