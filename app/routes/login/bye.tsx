import { ActionFunction, Form, LoaderFunction, json, useLoaderData } from 'remix';
import { authenticator, magicLinkStrategy } from '~/services/auth.server';

type LoaderData = { email?: string }

export const action: ActionFunction = async({ request }) => {
    await authenticator.logout(request, { redirectTo: '/login' });
};

export const loader: LoaderFunction = async({ request }) => {
    const session = await magicLinkStrategy.checkSession(request, {
        failureRedirect: '/login',
    });

    return json<LoaderData>({ email: session.user?.email });
};

export default function Screen() {
    const { email } = useLoaderData<LoaderData>();
    return (
        <Form method="post" className="flex flex-col gap-4">
            <h3>Hello {email}</h3>
            <button className="button">Log Out</button>
        </Form>
    );
}
