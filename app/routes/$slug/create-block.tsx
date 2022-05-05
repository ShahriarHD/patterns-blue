import { Form, useTransition } from 'remix';
import { Ornament } from '~/components/ornament';
import { useProjectContext } from '../$slug';


export default function CreateBlockPage() {
    const transition = useTransition();
    const { project } = useProjectContext();

    if (!project) {
        return null;
    }

    return(
        <section className="fixed top-0 left-0 w-full h-full bg-black-alpha-100
                            flex flex-col gap-4 items-center justify-center">
            <Form
                className="box p-16 relative rounded-t-4xl rounded-b-xl shadow-2xl shadow-black-alpha-500
                             flex flex-col gap-1
                             animate__animated animate__backInUp animate__faster"
                method="post"
            >
                <input type="hidden" name="projectId" value={project.uuid} />
                <input type="hidden" name="blockIndex" value={project.blocks.length} />
                <h4 className="font-display text-2xl font-bold">Create a block </h4>
                <p className="w-64">Here is a list of available blocks you can add to your page now</p>
                <ol className="list-disc flex flex-col gap-4 mt-5">
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
                    <li>
                        <button
                            name="intent"
                            type="button"
                            className="button"
                            disabled
                        >
                            Document your sequence
                        </button>
                    </li>
                    <li>
                        <button
                            name="intent"
                            type="button"
                            className="button"
                            disabled
                        >
                            Create a pattern
                        </button>
                    </li>
                </ol>
                <div className="absolute top-4 left-4">
                    <Ornament.Button
                        decoration="loading"
                        size="sm"
                        behavior={transition.state === 'idle' ? 'idle' : 'spinning'}
                    />
                </div>
                <div className="absolute top-4 right-4">
                    <Ornament.Button
                        decoration="loading"
                        size="sm"
                        behavior={transition.state === 'idle' ? 'idle' : 'spinning'}
                    />
                </div>
            </Form>
        </section>
    );
}
