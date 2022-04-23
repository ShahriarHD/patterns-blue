/* eslint-disable max-len */

import cx from 'classnames';
import { useEffect, useState } from 'react';
import { LoaderFunction, NavLink, Outlet, json, useFetcher, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import Boom from '~/components/Boom';
import { useLayoutContext } from '~/components/Layout';
import { Ornament } from '~/components/ornament';
import { ValidatedHullData, getHullById } from '~/models/hulls.server';

declare type LoaderData = {
    hull: ValidatedHullData
}

export const loader: LoaderFunction = async({ params }): Promise<LoaderData> => {
    const hullId = parseInt(params.hullId || 'NaN');
    invariant(!isNaN(hullId), 'did not recognize that param');

    try {
        const hull = await getHullById(hullId);
        if (hull === null) {
            throw json({ message: `${hullId} not found` }, 404);
        }

        return {
            hull
        };

    } catch (error) {
        throw json({ message: `Could not load hull data ${hullId}` }, 500);
    }
};


export default function Screen() {

    const { toggleHeader } = useLayoutContext();
    useEffect(() => {
        toggleHeader('minimize');
    }, [toggleHeader]);

    const { hull } = useLoaderData<LoaderData>();
    const newPageFetcher = useFetcher();

    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const toggleNavCollapseState = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const navClassName = cx('h-1/2 overflow-y-auto box rounded-lg p-4 relative transition-all', {
        '-translate-x-3/4 h-32': isNavCollapsed
    });

    return (
        <section className="flex flex-col gap-2 items-center">
            <h2 className="text-3xl font-bold font-display z-route10">{hull.title}</h2>
            {/* <Ornament.Outlet to="mind" decoration="moon" size="sm" className="z-route10" /> */}
            <Boom>
                <Outlet />
            </Boom>
            <aside className="absolute top-0 left-0 h-screen z-route10 grid place-items-center -transx">
                <nav className={navClassName}>
                    <button
                        className="w-3 h-3 rounded-full bg-red-400 absolute top-2 right-2 border-b border-black-alpha-500 shadow-sm"
                        onClick={() => toggleNavCollapseState()}
                    />
                    <ul className="flex flex-col gap-5 px-2">
                        <li className="border-4 rounded-2xl text-sm text-center flex gap-2 justify-center items-center">
                            <NavLink
                                to={`/hull/${hull.id}/`}
                                className={({ isActive }) => cx(
                                    'w-full h-full p-3 rounded-2xl border border-gray-500 hover:border-accent-500',
                                    {
                                        // eslint-disable-next-line max-len
                                        'underline underline-offset-4 decoration-dotted text-blue-500 font-bold decoration-4 border-blue-400 shadow-md': isActive
                                    },
                                )}
                            >
                                Canvas Guide
                            </NavLink>
                        </li>
                        {
                            Object.entries(hull.pages)
                                .sort(([, { pageIndex: firstPageIndex }], [, { pageIndex: secondPageIndex }]) => (firstPageIndex < secondPageIndex ? -1 : 1))
                                .map(([id, drawingAppData]) => (
                                    <li key={`canvas-${id}`}
                                        className="border-4 rounded-2xl text-sm text-center flex gap-2 justify-center items-center"
                                    >
                                        <NavLink
                                            to={`canvas/${id}`}
                                            className={({ isActive }) => cx('w-full h-full p-3 rounded-2xl border border-gray-500 hover:border-accent-500', {
                                                'text-blue-500 font-bold underline underline-offset-4 decoration-dotted decoration-4 border-blue-400 shadow-md': isActive
                                            })}
                                        >
                                            {drawingAppData.title || `Canvas ${drawingAppData.pageIndex}`}
                                        </NavLink>
                                    </li>
                                ))
                        }
                        <li className="p-3 border-4 border-dotted rounded-2xl text-sm text-center">
                            <newPageFetcher.Form
                                method="post"
                                action="canvas/add"
                                reloadDocument
                                className="flex gap-2 justify-center items-center"
                            >
                                <input
                                    type="text"
                                    placeholder="Create Canvas"
                                    name="new-canvas-name"
                                    required
                                    className="text-input"
                                    onKeyDown={error => error.stopPropagation()}
                                    onKeyUp={error => error.stopPropagation()}
                                    onKeyPress={error => error.stopPropagation()}
                                />
                                <Ornament.Button
                                    decoration="add"
                                    size="sm"
                                    type="submit"
                                    value={hull.id.toString()}
                                    name="hull-id"
                                    id="add-new-canvas"
                                    behavior={newPageFetcher.state === 'idle' ? 'idle' : 'spinning'}
                                />
                            </newPageFetcher.Form>
                        </li>
                    </ul>
                </nav>
            </aside>
        </section>
    );
}
