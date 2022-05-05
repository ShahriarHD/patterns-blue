import { ActionFunction, redirect } from 'remix';
import { createImageBlock } from '~/models/image.server';
import { getBlockDataFromRequest } from '~/utils/newBlockRequestHelpers';

export const action: ActionFunction = async({ params, request }) => {
    const block = await getBlockDataFromRequest({ request });

    await createImageBlock({
        block,
        image: {
            url: ''
        }
    });

    return redirect(`/${params.slug}/edit/${block.index}`);
};
