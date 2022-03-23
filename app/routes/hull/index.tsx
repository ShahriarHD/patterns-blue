import { Fragment, useEffect, useState } from "react";
import { LoaderFunction, Link, useLoaderData, Outlet, ActionFunction, Form, useTransition } from "remix";
import invariant from "tiny-invariant";
import { useLayoutContext } from "~/components/Layout";
import { Ornament } from "~/components/ornament";
import { deleteHullById, getHulls, Hull } from "~/models/hulls.server";

export const action: ActionFunction = async ({ request }) => {
    const form = await request.clone().formData();

    const deletingId = form.get('delete-id')?.toString();

    invariant(deletingId, 'did not send any deleting id');
    const deleted = await deleteHullById(parseInt(deletingId))

    return { deleted }
}

export const loader: LoaderFunction = async () => {

    return await getHulls();
}

export default function Hulls() {
    const data = useLoaderData<Hull[]>();
    const { toggleHeader } = useLayoutContext();

    useEffect(() => {
        console.log('wpw')
        toggleHeader('expand');
    }, [toggleHeader]);


    return (
        <section className="flex flex-col w-full items-center">
            <h2 className="text-3xl font-display font-bold">Hulls</h2>
            <Form method="post" className="hulls-container">
                {
                    data.map(({ title, id, description }, index) => (
                        <Fragment key={`hull-${index}`}>
                            <Ornament.Link
                                decoration="add"
                                to={`/hull/new/${index}`}
                                size="md"
                            />
                            <div className="hull-card">
                                <Link to={`${id}`} prefetch="intent">
                                    <img src="/img/mock/centers.jpg" className="" alt="" />
                                    <h4>{title}</h4>
                                    <p className="px-4 pb-8 pointer-events-none">
                                        {description}
                                    </p>
                                </Link>
                                <div className="flex gap-4 flex-row items-center">
                                    <Ornament.Button
                                        decoration="loading"
                                        size="sm"
                                    />
                                    <Ornament.Button
                                        decoration="error"
                                        size="sm"
                                        type="submit"
                                        value={id}
                                        name="delete-id"
                                    />
                                </div>
                            </div>
                        </Fragment>
                    ))
                }
                <Ornament.Link
                    decoration="add"
                    to={`/hull/new/${data.length}`}
                    size="md"
                    key="last-ornament"
                />
            </Form>

        </section>
    )
};