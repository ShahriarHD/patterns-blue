import { useCallback } from 'react';
import { useFetcher } from 'remix';
import { Ornament } from '~/components/ornament';
import { useProjectContext } from '../$slug';

export default function CreateBlockPage() {
    const fetcher = useFetcher();
    const { project } = useProjectContext();
    const submitNewColor = useCallback(() => {
        if (project) {
            const data = {
                projectId: project.uuid,
                projectSlug: project.slug || '',
                hex: '#00000000',
                meta: 'JUST_A_BEAUTIFUL_COLOR',
                name: 'Transparent'
            };
            fetcher.submit(data, {
                method: 'post',
                action: `/${project.slug}/color/new`
            });
        }
    }, [project, fetcher]);

    return(
        <section className="fixed top-0 left-0 w-full h-full bg-black-alpha-100
                            flex flex-col gap-4 items-center justify-center">
            <main className="box p-16 relative rounded-t-4xl rounded-b-xl shadow-2xl shadow-black-alpha-500
                             flex flex-col gap-1
                             animate__animated animate__backInUp animate__faster
                            ">

                <h4 className="font-display text-2xl font-bold">Create a block </h4>
                <p className="w-64">Here is a list of available blocks you can add to your page now</p>
                <ol className="list-disc flex flex-col gap-4 mt-5">
                    <li>
                        <button
                            type="button"
                            className="button"
                            onClick={submitNewColor}
                        >
                            Create a new color
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="button"
                            onClick={submitNewColor}
                        >
                            Write some text
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="button"
                            onClick={submitNewColor}
                        >
                            Upload a photo
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="button"
                            onClick={submitNewColor}
                        >
                            Document your sequence
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="button"
                            onClick={submitNewColor}
                        >
                            Create a pattern
                        </button>
                    </li>
                </ol>
                <div className="absolute top-4 left-4">
                    <Ornament.Button
                        decoration="loading"
                        size="sm"
                        behavior={fetcher.state === 'idle' ? 'idle' : 'spinning'}
                    />
                </div>
                <div className="absolute top-4 right-4">
                    <Ornament.Button
                        decoration="loading"
                        size="sm"
                        behavior={fetcher.state === 'idle' ? 'idle' : 'spinning'}
                    />
                </div>
            </main>
        </section>
    );
}
