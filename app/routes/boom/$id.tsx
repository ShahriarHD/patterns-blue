import { useEffect } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import Boom from "~/modules/boom/Boom";
import { makeHistory } from "~/modules/boom/state/history";
import { mutables } from "~/modules/boom/state/mutables";

export const loader: LoaderFunction = ({ params }) => {
    return { id: params.id }
}

export default function BoomPage() {
    const { id } = useLoaderData();

    if (typeof window === "undefined" || !(window?.document)) {
        return null;
    }

    return (
        <div className="w-full h-full rounded-3xl shadow-2xl relative overflow-hidden text-center">
            <Boom drawingId={id} />
        </div>
    )
}