import { Link, LoaderFunction, NavLink, Outlet, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { getSequenceIndex, getSequences, getSequenceSteps, Sequence, SequenceStep } from "~/modules/sequence";

type SequenceIndexData = {
    sequenceIndex: Sequence,
}

export const loader: LoaderFunction = async ({ params }): Promise<SequenceIndexData> => {

    invariant(params.sequenceSlug, "expected params.sequenceSlug");

    const sequenceIndex = await getSequenceIndex(params.sequenceSlug);

    return {
        sequenceIndex,
    };
};

export default function SequenceIndexPage() {

    const data = useLoaderData<SequenceIndexData>()

    return (
        <article className="prose" dangerouslySetInnerHTML={{ __html: data.sequenceIndex.promptHtml }} />
    )
}