import { Form, json, LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import ColorBlockEditor from '~/components/living-centers/ColorBlockEditor';
import { Ornament } from '~/components/ornament';
import { useProjectContext } from '../$slug';

export const loader: LoaderFunction = ({ params }) => {
    const indexString = params.index;

    if (!indexString) {
        throw json('block not found', 404);
    }

    const index = parseInt(indexString);

    invariant(!isNaN(index), 'expected index to be a number');

    return index;
};

function useCurrentBlock() {
    const index = useLoaderData();
    const { project } = useProjectContext();

    if (!project) {
        return null;
    }

    return project.blocks.find(block => block.index === index);
}

export default function EditBlockPage() {
    const block = useCurrentBlock();

    if (!block) {
        return null;
    }

    let contentEditor;
    if (block.color) {
        contentEditor = (
            <ColorBlockEditor {...block.color} />
        );
    }

    if (!contentEditor) {
        return null;
    }

    return (
        <aside className="w-96 h-screen box absolute right-0 top-0 flex flex-col gap-4 items-center p-6 pt-12 ">
            <section>
                <h4 className="text-lg font-bold">Content Settings</h4>
                {contentEditor}
            </section>
            <section className="flex flex-col items-center">
                <h4 className="text-xl font-bold">Block Settings</h4>
                <Form action="update-block" className="w-full flex flex-col gap-4">
                    <fieldset name="alignment" className="grid grid-cols-3 place-items-center gap-2">
                        <legend className="col-span-3 p-2 text-center font-semibold text-lg">Alignment</legend>
                        <label htmlFor="align-start">
                            <Ornament.Button
                                size="sm"
                                decoration="align-start"
                                className="pointer-events-none"
                            />
                        </label>
                        <label htmlFor="align-center">
                            <Ornament.Button
                                size="sm"
                                decoration="align-center"
                                className="pointer-events-none"
                            />
                        </label>
                        <label htmlFor="align-end">
                            <Ornament.Button
                                size="sm"
                                decoration="align-end"
                                className="pointer-events-none"
                            />
                        </label>
                        <input type="radio" id="align-start" name="alignment"/>
                        <input type="radio" id="align-center" name="alignment"/>
                        <input type="radio" id="align-end" name="alignment"/>
                    </fieldset>
                    <fieldset name="width" className="flex flex-col gap-4">
                        <legend className="col-span-4 p-2 text-center font-semibold text-lg">Width</legend>
                        <input type="range" min={1} max={4} />
                    </fieldset>
                    <fieldset name="height" className="flex flex-col gap-4">
                        <legend className="col-span-3 p-2 text-center font-semibold text-lg">Height</legend>
                        <input type="range" min={1} max={3} />
                    </fieldset>
                </Form>
            </section>
        </aside>
    );
}
