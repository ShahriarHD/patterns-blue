import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { getIndexPromptHTML, getSequences, Sequence } from "~/modules/sequence";

type IndexData = {
  prompt: string,
  sequences: Sequence[]
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async (): Promise<IndexData> => {

  const prompt = await getIndexPromptHTML();
  const sequences = await getSequences();

  // https://remix.run/api/remix#json
  return {
    prompt,
    sequences
  }
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Inner Light",
    description: "color related experiments"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <div className="flex flex-row items-stretch justify-center gap-8 mx-4 tablet:mx-8 desktop:mx-16">
      <main className="prompt grained"  dangerouslySetInnerHTML={{__html: data.prompt }} />
      <ul className="table-of-contents grained prose">
        <h3 className="text-center pb-1 border-b border-slate-700">Sequences</h3>
        {data.sequences.map(({title, slug}, index) => (
          <li key={`topic-${index}`}>
            <Link to={slug} prefetch="intent" >{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
