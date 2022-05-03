import { ColorMetaStates } from '@prisma/client';
import { useCallback } from 'react';
import { ActionFunction, redirect, useFetcher } from 'remix';
import invariant from 'tiny-invariant';
import { createColorBlock } from '~/models/color.server';
import { useProjectContext } from '../$slug';


export const action: ActionFunction = async({ request }) => {
    const formData = await request.formData();

    const hex = formData.get('hex')?.toString();
    const meta = formData.get('meta')?.toString();
    const name = formData.get('name')?.toString();
    const projectId = formData.get('projectId')?.toString();

    invariant(hex, 'fuck you');
    invariant(meta, 'fuck you');
    invariant(name, 'fuck you');
    invariant(projectId, 'fuck you');

    await createColorBlock({
        color: {
            hex,
            meta: meta as ColorMetaStates,
            name
        },
        block: {
            alignment: 'END',
            width: 'MD',
            height: 'MD',
            index: 0,
            projectId
        }
    });

    return redirect('..');
};

export default function CreateBlockPage() {
    const fetcher = useFetcher();
    const { project } = useProjectContext();
    const submitNewColor = useCallback(() => {
        const data = {
            projectId: project?.uuid || '',
            hex: '#00000000',
            meta: 'JUST_A_BEAUTIFUL_COLOR',
            name: 'Transparent'
        };
        fetcher.submit(data, { method: 'post' });
    }, [project]);

    return(
        <ol>
            <li>
                <button
                    type="button"
                    className="button"
                    onClick={submitNewColor}
                >
                    Create New Color
                </button>
            </li>
        </ol>
    );
}
