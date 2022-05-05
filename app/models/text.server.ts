import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { prisma } from '~/services/db.server';
import { createBlock, createBlockArgsValidator } from './block.server';
import { TextModel } from './schema';

const createTextArgsValidator = z.object({
    text: TextModel.pick({
        content: true
    }),
    block: createBlockArgsValidator
});

export declare type CreateTextArgs = z.infer<typeof createTextArgsValidator>;

export const createTextFormValidator = withZod(createTextArgsValidator);

export async function createTextBlock({ text, block }: CreateTextArgs) {
    const parentBlock = await createBlock(block);

    const { content } = text;

    const newText = await prisma.text.create({
        data: {
            content,
            block: {
                connect: {
                    uuid: parentBlock.uuid
                }
            },
        },
    });

    return newText;
}

const updateTextByIdArgsValidator = TextModel.pick({
    uuid: true,
    content: true,
});

export declare type UpdateTextByIdArgs = z.infer<typeof updateTextByIdArgsValidator>;

export const updateTextByIdFormValidator = withZod(updateTextByIdArgsValidator);

export async function updateTextById({ uuid, ...text }: UpdateTextByIdArgs) {
    return await prisma.text.update({
        data: text,
        where: { uuid },
        include: {
            block: true
        }
    });
}
