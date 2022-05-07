import { createCookieSessionStorage } from 'remix';
import { Authenticator, AuthorizationError } from 'remix-auth';
import { SupabaseStrategy } from 'remix-auth-supabase';
import { Session, supabaseAdmin } from '~/services/supabase/supabase.server';

if (!process.env.COOKIE_SECRET) {
    throw new Error('ENV: COOKIE_SECRET is required');
}

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: 'sb',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.COOKIE_SECRET],
        secure: process.env.NODE_ENV === 'production',
    },
});

export const magicLinkStrategy = new SupabaseStrategy(
    {
        supabaseClient: supabaseAdmin,
        sessionStorage,
        sessionKey: 'sb:session',
        sessionErrorKey: 'sb:error',
    },
    async({ req }) => {
        const form = await req.formData();
        const session = form?.get('session');

        if (typeof session !== 'string') {
            throw new AuthorizationError('session not found');
        }

        const parsedSession = JSON.parse(session);
        return parsedSession;
    },
);

export const authenticator = new Authenticator<Session>(sessionStorage, {
    sessionKey: magicLinkStrategy.sessionKey,
    sessionErrorKey: magicLinkStrategy.sessionErrorKey,
});

authenticator.use(magicLinkStrategy, 'sb-magic-link');

