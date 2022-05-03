import { useEffect } from 'react';
import { json, LoaderFunction, MetaFunction } from 'remix';
import { useLayoutContext } from '~/components/Layout';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => ({
    title: 'Inner Light',
    description: 'color related experiments',
});

export const loader: LoaderFunction = async() => json({
    communityProjects: []
});

// https://remix.run/guides/routing#index-routes
export default function Index() {
    const { toggleHeader } = useLayoutContext();
    useEffect(() => toggleHeader('expand'), []);

    return (
        <div className="">
            Index page

        </div>
    );
}
