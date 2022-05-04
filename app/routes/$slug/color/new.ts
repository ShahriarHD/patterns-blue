import { ColorMetaStates } from '@prisma/client';
import { ActionFunction, redirect } from 'remix';
import invariant from 'tiny-invariant';
import { createColorBlock } from '~/models/color.server';

export const action: ActionFunction = async({ request }) => {
    const formData = await request.formData();
    console.log('injaaa');

    const hex = formData.get('hex')?.toString();
    const meta = formData.get('meta')?.toString();
    const name = formData.get('name')?.toString();
    const projectId = formData.get('projectId')?.toString();
    const projectSlug = formData.get('projectSlug')?.toString();

    invariant(hex, 'fuck you');
    invariant(meta, 'fuck you');
    invariant(name, 'fuck you');
    invariant(projectId, 'fuck you');
    invariant(projectSlug, 'fuck you');

    await createColorBlock({
        color: {
            hex,
            meta: meta as ColorMetaStates,
            name
        },
        block: {
            alignment: 'END',
            width: 'SM',
            height: 'SM',
            index: 0,
            projectId
        }
    });

    return redirect(`/${projectSlug}/edit/0`);
};
