import { useEffect } from 'react'
import type { ActionFunction } from 'remix'
import { useSubmit } from 'remix'
import { supabaseClient } from '~/modules/supabase/supabase.client'
import { authenticator } from '~/services/auth.server'

export const action: ActionFunction = async ({ request }) => {
    await authenticator.authenticate('sb-magic-link', request, {
        successRedirect: '/',
        failureRedirect: '/login',
    })
}

export default function LoginCallback() {
    const submit = useSubmit()
    console.log('injaaa dg')
    useEffect(() => {
        console.log('session');
        const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log('event');
            if (event === 'SIGNED_IN') {
                const formData = new FormData()
                formData.append('session', JSON.stringify(session))

                submit(formData, { method: 'post' })
            }
        },
        )

        return () => {
            authListener?.unsubscribe()
        }
    }, [submit])

    return null
}