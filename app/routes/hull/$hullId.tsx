import { useEffect, useLayoutEffect } from "react";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { useLayoutContext } from "~/components/Layout";
import { getHullById, Hull } from "~/modules/hull/hulls";

declare type LoaderData = {
    hull: Hull
}

export const loader: LoaderFunction = async ({ params }) => {
    const hullId = parseInt(params.hullId || 'NaN');
    invariant(hullId !== NaN, 'did not recognize that param');

    const hull = await getHullById(hullId);

    return {
        hull
    }
}

export default function () {

    const { toggleHeader } = useLayoutContext();
    useEffect(() => {
        toggleHeader('minimize');
    }, [toggleHeader]);

    const { hull } = useLoaderData<LoaderData>();
    console.log(hull);
    return (
        <section className="flex flex-col gap-2 items-center">
            <h2 className="text-3xl font-bold font-display">{hull.title}</h2>
            {/* <nav>
                <ul>
                    <li>
                        <Link to=".">
                            Canvases
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to=".">
                            Assets
                        </Link>
                    </li>
                </ul>
            </nav> */}
            <Outlet />
        </section>
    )
};
