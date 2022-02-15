import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";

type VirtualSpace = {
  title: string,
  link: string,
}

type IndexData = {
  pages: VirtualSpace[];
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async (): Promise<IndexData> => {
  // https://remix.run/api/remix#json
  return {
    pages: [
      {
        title: 'login',
        link: '/login'
      },
      {
        title: 'boom',
        link: '/boom'
      },
    ]
  }
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Inner Light",
    description: "color related experiments",
  };
};


// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <div className="flex flex-row items-stretch bg-white w-96 h-96 rounded-3xl m-auto gap-8">
      <ul className="prose p-8">
        <h3 className="text-center pb-1 border-b border-slate-700">Links</h3>
        {data.pages.map(({title, link}, index) => (
          <li key={`topic-${index}`}>
            <Link to={link} prefetch="intent" >{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
