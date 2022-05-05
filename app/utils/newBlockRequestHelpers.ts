import { DataFunctionArgs } from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import { CreateBlockArgs } from '~/models/block.server';

declare type GetBlockDataFromRequestArgs = Pick<DataFunctionArgs, 'request'>;

export async function getBlockDataFromRequest({ request }: GetBlockDataFromRequestArgs): Promise<CreateBlockArgs> {
    const formData = await request.formData();
    const projectId = formData.get('projectId')?.toString();

    invariant(projectId, 'projectId is required');

    return {
        projectId,
        index: 0,
        width: 'MD',
        height: 'MD',
        alignment: 'END',
    };
}
