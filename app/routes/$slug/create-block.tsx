import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Form } from 'remix';
import { useProjectContext } from '../$slug';

export default function CreateBlockPage() {
    const { project, createBlockIndex: index, createBlockRef } = useProjectContext();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setForceRerender] = useState({});
    const forceRerender = useCallback(() => setForceRerender({}), []);
    useEffect(() => {
        forceRerender();
    }, [createBlockRef.current, index]);


    if (!createBlockRef.current) {
        return <div>loading...</div>;
    }

    const child =
        <Form
            className="flex flex-col items-center gap-1"
            method="post"
        >
            <input type="hidden" name="projectId" value={project.uuid} />
            <input type="hidden" name="blockIndex" value={index} />
            <h4 className="font-display text-2xl font-bold">Create a block </h4>
            <p>Living blocks you can add to your page now</p>
            <ol className="flex flex-col gap-4 mt-5">
                <li>
                    <button
                        name="intent"
                        type="submit"
                        formAction={`/${project.slug}/color/new`}
                        className="button"
                        value="color"
                    >
                        Create a new color
                    </button>
                </li>
                <li>
                    <button
                        name="intent"
                        type="submit"
                        formAction={`/${project.slug}/text/new`}
                        className="button"
                        value="text"
                    >
                        Write some text
                    </button>
                </li>
                <li>
                    <button
                        name="intent"
                        type="submit"
                        formAction={`/${project.slug}/image/new`}
                        className="button"
                        value="image"
                    >
                        Upload a photo
                    </button>
                </li>
            </ol>
        </Form>;

    return createPortal(child, createBlockRef.current);
}
