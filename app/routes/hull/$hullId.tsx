import { useEffect } from "react";
import { json, LoaderFunction, NavLink, Outlet, useFetcher, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import Boom from "~/components/Boom";
import { useLayoutContext } from "~/components/Layout";
import { Ornament } from "~/components/ornament";
import { getHullById, ValidatedHullData } from "~/models/hulls.server";

declare type LoaderData = {
    hull: ValidatedHullData
}

export const loader: LoaderFunction = async ({ params }): Promise<LoaderData> => {
    const hullId = parseInt(params.hullId || 'NaN');
    invariant(hullId !== NaN, 'did not recognize that param');

    try {
        const hull = await getHullById(hullId);
        if (hull === null) {
            throw json({ message: `${hullId} not found` }, 404)
        }

        return {
            hull
        }

    } catch (error) {
        throw json({ message: `Could not load hull data ${hullId}` }, 500);
    }
}


export default function Screen() {

    const { toggleHeader } = useLayoutContext();
    useEffect(() => {
        toggleHeader('minimize');
    }, [toggleHeader]);

    const { hull } = useLoaderData<LoaderData>();
    const newPageFetcher = useFetcher();

    return (
        <section className="flex flex-col gap-2 items-center">
            <h2 className="text-3xl font-bold font-display z-route10">{hull.title}</h2>
            {/* <Ornament.Outlet to="mind" decoration="moon" size="sm" className="z-route10" /> */}
            <Boom>
                <Outlet />
            </Boom>
            <aside className="absolute top-0 left-0 h-screen z-route10 grid place-items-center">
                <nav className="">
                    <ul className="flex flex-col gap-5 px-2">
                        <li className="p-3 border-4 rounded-2xl text-sm text-center flex gap-2 justify-center items-center">
                            <NavLink
                                to={`/hull/${hull.id}/`}
                                className={({ isActive }) => (isActive ? 'text-blue-500 font-bold' : "")}
                            >
                                Canvas Guide
                            </NavLink>
                        </li>
                        {
                            Object.entries(hull.pages)
                                .sort(([_, { pageIndex: firstPageIndex }], [__, { pageIndex: secondPageIndex }]) => {
                                    return firstPageIndex < secondPageIndex ? -1 : 1
                                })
                                .map(([id, drawingAppData]) => {
                                    return (
                                        <li key={`canvas-${id}`}
                                            className="p-3 border-4 rounded-2xl text-sm text-center flex gap-2 justify-center items-center">
                                            <NavLink
                                                to={`canvas/${id}`}
                                                className={({ isActive }) => (isActive ? 'text-blue-500 font-bold' : "")}
                                            >
                                                {drawingAppData.title || `Canvas ${drawingAppData.pageIndex}`}
                                            </NavLink>
                                        </li>
                                    )
                                })
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
                                    onKeyDown={e => e.stopPropagation()}
                                    onKeyUp={e => e.stopPropagation()}
                                    onKeyPress={e => e.stopPropagation()}
                                />
                                <Ornament.Button
                                    decoration="add"
                                    size="sm"
                                    type="submit"
                                    value={hull.id.toString()}
                                    name="hull-id"
                                    id="add-new-canvas"
                                />
                            </newPageFetcher.Form>
                        </li>
                    </ul>
                </nav>
            </aside>
        </section>
    )
};
