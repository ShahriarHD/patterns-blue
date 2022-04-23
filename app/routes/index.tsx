import { LoaderFunction, MetaFunction, redirect } from 'remix';
import { magicLinkStrategy } from '~/services/auth.server';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => ({
    title: 'Inner Light',
    description: 'color related experiments',
});

export const loader: LoaderFunction = async({ request }) => {
    const session = await magicLinkStrategy.checkSession(request);

    if (!session) {
        return redirect('/login');
    } else {
        return redirect('/hull');
    }
};

// https://remix.run/guides/routing#index-routes
export default function Index() {


    return (
        <div className="overflow-scroll p-8 flex flex-col items-stretch w-full h-full m-auto gap-8">
            Index page

        </div>
    );
}
