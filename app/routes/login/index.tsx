import { ActionFunction, LoaderFunction, redirect, useActionData, useTransition } from 'remix'
import { Form, json, useLoaderData, useSearchParams } from 'remix'
import { supabaseAdmin, ApiError } from '~/modules/supabase/supabase.server'
import { authenticator, sessionStorage, magicLinkStrategy } from '~/services/auth.server'

type LoaderData = {
    error: { message: string } | null
}

type ActionData = {
    error: ApiError | null
}

export const loader: LoaderFunction = async ({ request }) => {
    await magicLinkStrategy.checkSession(request, {
        successRedirect: '/private',
    })

    const session = await sessionStorage.getSession(
        request.headers.get('Cookie'),
    )

    const error = session.get(
        authenticator.sessionErrorKey,
    ) as LoaderData['error']

    return json<LoaderData>({ error })
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.clone().formData()
    const email = form?.get('email')

    if (!email) return json({ error: { message: 'Email is required' } }, 400)
    if (typeof email !== 'string') return json({ error: { message: 'Email must be a string' } }, 400)

    console.log(`${process.env.SERVER_URL}/login/callback`);
    const { error } = await supabaseAdmin.auth.api.sendMagicLinkEmail(email, { redirectTo: `${process.env.SERVER_URL}/login/callback` })

    if (error) return json({ error: { message: error.message } }, error.status)

    return redirect('/login/check-your-email')
}

export default function Screen() {
    const transition = useTransition()
    const { error } = useActionData<ActionData>() || {}
    const {error: loaderError} = useLoaderData<LoaderData>();

    return (
        <Form method="post" className="box w-96 p-10 mx-auto flex flex-col gap-4">
            <h2 className='text-3xl text-center'>Login</h2>
            {error && <div>{error.message}</div>}
            {error && <div>{error.message}</div>}

            <div className='flex flex-col gap-1'>
                <label className='font-semibold' htmlFor="email">Email</label>
                <input className="rounded-xl" type="email" name="email" id="email" />
            </div>

            <button className='button'>{transition.submission ? 'Sending you a magic link' : 'Send Magic Link'}</button>
        </Form>
    )
}