import { Block } from '@prisma/client';
import { prisma, } from '~/services/db.server';

export declare type CreateBlockArgs = Omit<Block, 'uuid'>

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
