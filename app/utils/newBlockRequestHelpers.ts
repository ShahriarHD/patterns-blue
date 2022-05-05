import { DataFunctionArgs } from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import { CreateBlockArgs } from '~/models/block.server';

declare type GetBlockDataFromRequestArgs = Pick<DataFunctionArgs, 'request'>;

export async function getBlockDataFromRequest({ request }: GetBlockDataFromRequestArgs): Promise<CreateBlockArgs> {
    const formData = await request.formData();
    const projectId = formData.get('projectId')?.toString();
    let blockIndex = parseInt(formData.get('blockIndex')?.toString() || '');

    invariant(projectId, 'projectId is required');

    if (isNaN(blockIndex)) {
        blockIndex = 0;
    }

    return {
        projectId,
        index: blockIndex,
        width: 'MD',
        height: 'MD',
        alignment: 'END',
    };
}
