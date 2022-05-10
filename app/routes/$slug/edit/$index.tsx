import { BlockSize } from '@prisma/client';
import { useEffect } from 'react';
import { json, LoaderFunction, useLoaderData, useTransition } from 'remix';
import invariant from 'tiny-invariant';
import { useEditingContext } from '../edit';

export const loader: LoaderFunction = ({ params }) => {
    const indexString = params.index;

    if (!indexString) {
        throw json('block not found', 404);
    }

    const index = parseInt(indexString);

    invariant(!isNaN(index), 'expected index to be a number');

    return index;
};

export default function Screen() {
    const index = useLoaderData();

    const { setEditModeForIndex, patchBlock } = useEditingContext();
    useEffect(() => {
        setEditModeForIndex(index);
    }, [index, setEditModeForIndex]);

    const transition = useTransition();

    useEffect(() => {
        if (transition.state === 'submitting' && transition.location.pathname.includes('block/update')) {
            const formData = transition.submission.formData;

            const width = formData.get('width')?.toString() as BlockSize | undefined;
            const height = formData.get('height')?.toString() as BlockSize | undefined;
            const uuid = formData.get('uuid')?.toString();

            invariant(width, 'this submission expects width');
            invariant(height, 'this submission expects height');
            invariant(uuid, 'this submission expects uuid');

            patchBlock(uuid, [width, height]);
        }
    }, [transition.state]);

    return null;
}

