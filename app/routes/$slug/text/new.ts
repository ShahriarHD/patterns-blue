import { ActionFunction, redirect } from 'remix';
import { createTextBlock } from '~/models/text.server';
import { getBlockDataFromRequest } from '~/utils/newBlockRequestHelpers';

export const action: ActionFunction = async({ params, request }) => {
    const block = await getBlockDataFromRequest({ request });

    await createTextBlock({
        block,
        text: {
            content: ''
        }
    });

    return redirect(`/${params.slug}/edit/${block.index}`);
};
