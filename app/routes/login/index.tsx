import { ActionFunction, Form, LoaderFunction, json, redirect, useActionData, useLoaderData, useTransition } from 'remix';
import { Ornament } from '~/components/ornament';
import { authenticator, magicLinkStrategy, sessionStorage } from '~/services/auth.server';
import { ApiError, supabaseAdmin } from '~/services/supabase/supabase.server';

type LoaderData = {
    error: { message: string } | null
}

type ActionData = {
    error: ApiError | null
}

export const loader: LoaderFunction = async({ request }) => {
    await magicLinkStrategy.checkSession(request, {
        successRedirect: '/login/profile',
    });

    const session = await sessionStorage.getSession(request.headers.get('Cookie'),);

    const error = session.get(authenticator.sessionErrorKey,) as LoaderData['error'];

    return json<LoaderData>({ error });
};

export const action: ActionFunction = async({ request }) => {
    const form = await request.clone().formData();
    const email = form?.get('email');

    if (!email) {
        return json({ error: { message: 'Email is required' } }, 400);
    }
    if (typeof email !== 'string') {
        return json({ error: { message: 'Email must be a string' } }, 400);
    }

    console.info(`${process.env.SERVER_URL}/login/callback`);
    const { error } = await supabaseAdmin.auth.api.sendMagicLinkEmail(
        email,
        { redirectTo: `${process.env.SERVER_URL}/login/callback` },
    );

    if (error) {
        return json({ error: { message: error.message } }, error.status);
    }

    return redirect('/login/check-your-email');
};

export default function Screen() {
    const transition = useTransition();
    const { error } = useActionData<ActionData>() || {};
    useLoaderData<LoaderData>();

    return (
        <Form method="post" className="">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Ornament.Button
                    decoration={error ? 'error' : 'loading'}
                    size="md"
                    behavior={transition.state === 'idle' ? 'idle' : 'spinning'}
                />
            </div>

            <section className="flex flex-col gap-4 prose prose-lg dark:prose-invert">


                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        className="text-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Type here ..."
                    />
                </div>

                <button className="button">{transition.submission ? 'Sending you a magic link' : 'Send Magic Link'}</button>

                <p className="text-center leading-6">
                    Write your email in the field above and click on the &quot;send magic link&quot; button.
                    You will receive a login link to enter.
                </p>
                {error && <div>{error.message}</div>}
                {error && <div>{error.message}</div>}
            </section>
        </Form>
    );
}
