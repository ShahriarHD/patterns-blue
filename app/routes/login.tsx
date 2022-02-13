import netlifyIdentity from 'netlify-identity-widget';
import { useEffect } from 'react';
import { redirect } from 'remix';

export default function Login() {
    useEffect(() => {
        if (typeof document !== 'undefined'){
            netlifyIdentity.init({
                container: '#login',
                APIUrl: 'https://patterns.blue/.netlify/identity',
            })
        }
    }, [])
    return <div className="login">
    </div>
}