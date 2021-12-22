import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { getSequenceIndex, getSequenceStep, SequenceStep } from "~/modules/sequence";

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, "expected params.slug");
    invariant(params.sequenceSlug, "expected params.slug");

    return getSequenceStep(params.sequenceSlug, params.slug);
  };

export default function PostSlug() {
    const post = useLoaderData<SequenceStep>();

    return (
        <article className="prose" dangerouslySetInnerHTML={{ __html: post.promptHtml}} />
    );
}