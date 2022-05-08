import { BlockSize } from '@prisma/client';
import { ActionFunction, json, LoaderFunction, useLoaderData } from 'remix';
import { validationError } from 'remix-validated-form';
import invariant from 'tiny-invariant';
import GoodOldForm, { useField, useIsSubmitting } from '~/components/GoodOldForm';
import ColorBlockEditor from '~/components/living-centers/ColorBlockEditor';
import ImageBlockEditor from '~/components/living-centers/ImageBlockEditor';
import TextBlockEditor from '~/components/living-centers/TextBlockEditor';
import { Ornament } from '~/components/ornament';
import { updateBlockById, UpdateBlockByIdArgs, updateBlockFormValidator } from '~/models/block.server';
import { useProjectContext } from '../$slug';


export const action: ActionFunction = async({ request, }) => {
    const formData = await request.formData();

    const { error, data } = await updateBlockFormValidator.validate(formData);

    if (error) {
        return validationError(error);
    }

    const updatedBlock = await updateBlockById(data);

    return json({ updatedBlock }, 200);
};


export const loader: LoaderFunction = ({ params }) => {
    const indexString = params.index;

    if (!indexString) {
        throw json('block not found', 404);
    }

    const index = parseInt(indexString);

    invariant(!isNaN(index), 'expected index to be a number');

    return index;
};

function useEditingContext() {
    const index = useLoaderData();
    const { project } = useProjectContext();

    if (!project) {
        return null;
    }

    const block = project.blocks.find(block => block.index === index);
    if (!block) {
        return null;
    }
    return {
        block,
        projectSlug: project.slug
    };
}

export default function EditBlockPage() {
    const editingContext = useEditingContext();

    if (!editingContext) {
        return null;
    }

    const { block } = editingContext;

    let contentEditor;
    if (block.color) {
        contentEditor = (
            <ColorBlockEditor key={block.uuid} {...block.color} />
        );
    }

    if (block.text) {
        contentEditor = (
            <TextBlockEditor key={block.uuid} {...block.text} />
        );
    }

    if (block.image) {
        contentEditor = (
            <ImageBlockEditor key={block.uuid} {...block.image} />
        );
    }

    if (!contentEditor) {
        return null;
    }

    return (
        <aside className="w-full desktop:w-96 h-144 desktop:h-screen box
                          fixed right-0 bottom-0 desktop:top-0 z-menu
                          flex flex-col gap-4 items-center p-6 pt-12
                          ring-2 ring-black-alpha-500 ring-offset-2 ring-offset-white-alpha-500
                          rounded-t-3xl desktop:rounded-l-6xl desktop:rounded-tr-none shadow-2xl
                          animate__animated animate__slideInRight animate__faster
                         ">
            <section className="flex flex-col items-center border-b border-black-alpha-500 pb-4">
                <h4 className="text-xl font-bold pb-4">Content Settings</h4>
                {contentEditor}
            </section>
            <section className="flex flex-col items-center">
                <h4 className="text-xl font-bold">Block Settings</h4>
                <GoodOldForm
                    key={block.uuid}
                    method="post"
                    initialValues={{
                        uuid: block.uuid,
                        width: block.width,
                        height: block.height,
                    }}

                    className="w-full flex flex-col gap-4"
                >
                    <UUIDField />
                    <WidthField />
                    <HeightField />
                    <SubmitButton />
                </GoodOldForm>
            </section>
            <section className="flex flex-col items-center pt-8 gap-1">
                <h4>Delete Block</h4>
                <Ornament.Button decoration="error" size="md" />
            </section>
        </aside>
    );
}


function SubmitButton() {
    const isSubmitting = useIsSubmitting();
    return (
        <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
    );
}


function WidthField() {
    const inputProps = useField<UpdateBlockByIdArgs>('width');


    const options: Array<BlockSize> = ['SM', 'MD', 'LG', 'COVER'];
    return (
        <select {...inputProps} className="dropdown">
            {options.map((value, index) =>
                <option key={`width-option-${index}`} value={value}>
                    {value.toLowerCase()}
                </option>)
            }
        </select>
    );
}

function HeightField() {
    const inputProps = useField<UpdateBlockByIdArgs>('height');

    const options: Array<BlockSize> = ['SM', 'MD', 'LG', 'AUTO'];
    return (
        <select {...inputProps} className="dropdown">
            {options.map((value, index) =>
                <option key={`width-option-${index}`} value={value}>
                    {value.toLowerCase()}
                </option>)
            }
        </select>
    );
}

function UUIDField() {
    const inputProps = useField<UpdateBlockByIdArgs>('uuid');
    return <input {...inputProps} type="hidden" aria-hidden readOnly/>;
}
