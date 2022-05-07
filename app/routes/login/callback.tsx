import { useEffect } from 'react';
import { ActionFunction, useFetcher } from 'remix';
import { authenticator } from '~/services/auth.server';
import { supabaseClient } from '~/services/supabase/supabase.client';

export const action: ActionFunction = async({ request }) => {

    await authenticator.authenticate('sb-magic-link', request, {
        successRedirect: '/profile',
        failureRedirect: '/login',
    });
};

export default function LoginCallback() {
    const fetcher = useFetcher();
    useEffect(() => {
        const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const formData = new FormData();
                formData.append('session', JSON.stringify(session));
                supabaseClient.auth.setAuth(session.access_token);

                fetcher.submit(formData, { method: 'post' });
            }
        },);

        return () => {
            authListener?.unsubscribe();
        };
    }, [fetcher]);

    return null;
}
