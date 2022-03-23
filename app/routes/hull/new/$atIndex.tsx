import { ActionFunction, Form, json, LoaderFunction, redirect, useActionData, useLoaderData, useTransition } from "remix"
import invariant from "tiny-invariant"
import { Ornament } from "~/components/ornament"
import { createHull } from "~/models/hulls.server"

declare type LoaderData = {
    at: number
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.clone().formData();
    const title = form.get('title')?.toString();
    const description = form.get('description')?.toString();

    invariant(title, 'title is required');
    invariant(description, 'description is required');

    try {
        const res = await createHull({ title, description });
        return redirect('/hull');
    } catch (error) {
        throw json(error, 500);
    }
}

export const loader: LoaderFunction = ({ params }): LoaderData => {
    const atParam = parseInt(params.atIndex || '0');
    invariant(atParam !== NaN, 'did not recognize that param');

    return {
        at: atParam
    }
}

export default function () {
    const { at } = useLoaderData<LoaderData>();
    const { error } = useActionData() || {}
    const transition = useTransition()


    return (
        <section className="box relative w-full tablet:w-96 p-10 mx-auto mt-16 rounded-t-6xl rounded-b-xl pt-16">
            <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Ornament.Button
                    decoration={error ? 'error' : 'loading'}
                    size="md"
                    behavior={transition.state === 'idle' ? 'idle' : 'spinning'}
                />
            </div>
            <h2 className='font-display text-center text-3xl font-semibold pb-8'>Create a new hull</h2>
            <Form className="flex flex-col gap-4" method="post">
                <fieldset className="flex flex-col gap-1">
                    <label htmlFor="title">
                        Title
                    </label>
                    <input
                        className="text-input"
                        placeholder="Choose a title"
                        id="title"
                        name="title"
                    />

                </fieldset>
                <fieldset className="flex flex-col gap-1">
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="text-input"
                        placeholder="A short description of what this is for."
                    />
                </fieldset>
                {/* <fieldset className="flex flex-col gap-1">
                    <label>Cover Image</label>
                    <input type="file" accept="img/*" />
                </fieldset> */}
                <button className="button">{transition.state === 'submitting' ? 'Creating': 'Create'} </button>
            </Form>
        </section>
    )
}