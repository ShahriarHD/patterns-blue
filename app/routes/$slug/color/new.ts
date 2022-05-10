import { ActionFunction, redirect } from 'remix';
import { createColorBlock } from '~/models/color.server';
import { getBlockDataFromRequest } from '~/utils/newBlockRequestHelpers';

export const action: ActionFunction = async({ params, request }) => {
    const block = await getBlockDataFromRequest({ request });

    await createColorBlock({
        block,
        color: {
            hex: '#01010110',
            name: '',
        }
    });

    return redirect(`/${params.slug}/edit/${block.index}`);
};
