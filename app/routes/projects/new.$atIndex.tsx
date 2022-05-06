import { NodeOnDiskFile } from '@remix-run/node';
import { useEffect, useRef } from 'react';
import {
    ActionFunction, Form, json, LoaderFunction, redirect, unstable_parseMultipartFormData,
    useActionData, useLoaderData, useTransition
} from 'remix';
import invariant from 'tiny-invariant';
import { Ornament } from '~/components/ornament';
import UploadBox from '~/components/UploadBox';
import { createProject } from '~/models/project.server';
import { magicLinkStrategy } from '~/services/auth.server';
import { uploadHandler } from '~/utils/uploadHandler';

export const action: ActionFunction = async({ request }) => {
    const session = await magicLinkStrategy.checkSession(request, {
        failureRedirect: '/login',
    });

    if (session.user) {
        const formData = await unstable_parseMultipartFormData(request, uploadHandler);


        const name = formData.get('name')?.toString();
        const description = formData.get('description')?.toString();
        const index = parseInt(formData.get('index')?.toString() || '');
        const file = formData.get('coverImage') as NodeOnDiskFile | undefined;

        console.log(index);
        invariant(name, 'name is required');
        invariant(description, 'description is required');
        invariant(!isNaN(index), 'atIndex is required');

        try {
            await createProject({
                userId: session.user.id,
                project: {
                    index,
                    name,
                    description,
                    coverImage: (file && file.name) ? `/media/${file?.name}` : '/img/mock/centers.jpg'
                }
            });
            return redirect('/projects');
        } catch (error) {
            console.error(error);
            throw json(error, 500);
        }
    }
};

interface LoaderData {
    atIndex: number
}
export const loader: LoaderFunction = ({ params }): LoaderData => {
    const atParam = parseInt(params.atIndex || '0');
    invariant(!isNaN(atParam), 'did not recognize that param');

    return {
        atIndex: atParam
    };
};

export default function Screen() {
    const { error } = useActionData() || {};
    const transition = useTransition();
    const { atIndex } = useLoaderData<LoaderData>();

    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        sectionRef.current?.scrollIntoView({
            inline: 'center',
            behavior: 'smooth'
        });
    }, [sectionRef]);
    return (
        <section className="box w-64 tablet:w-80 shrink-0 relative p-6 snap-center" ref={sectionRef}>
            <Ornament.Button
                decoration={error ? 'error' : 'mandala'}
                size="md"
                behavior={transition.state === 'idle' ? 'idle' : 'spinning'}
                className="m-auto"
            />
            <h2 className="font-display text-center text-xl font-semibold pb-8">Create a new Project</h2>
            <Form encType="multipart/form-data" className="flex flex-col items-center gap-4" method="post">
                <UploadBox name="coverImage" />
                <input type="hidden" value={atIndex} name="index" />
                <fieldset className="flex flex-col gap-1">
                    {/* <label htmlFor="name">
                        name
                    </label> */}
                    <input
                        className="text-input"
                        placeholder="Choose a name"
                        id="name"
                        name="name"
                        required
                    />
                </fieldset>
                <fieldset className="flex flex-col gap-1">
                    {/* <label htmlFor="description">
                        Description
                    </label> */}
                    <textarea
                        id="description"
                        name="description"
                        className="text-input"
                        placeholder="A short description of what this is for."
                        required
                    />
                </fieldset>
                {/* <fieldset className="flex flex-col gap-1">
                    <label>Cover Image</label>
                    <input type="file" accept="img/*" />
                </fieldset> */}
                <button className="button w-48">
                    {transition.state === 'submitting' ? 'Creating' : 'Create'}
                </button>
            </Form>
        </section>
    );
}
