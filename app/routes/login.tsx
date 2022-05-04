import { useEffect } from 'react';
import { Outlet } from 'remix';
import { useLayoutContext } from '~/components/Layout';

export default function LoginLayout() {
    const { toggleHeader } = useLayoutContext();
    useEffect(() => {
        toggleHeader('expand');
    }, [toggleHeader]);
    return (
        <section className="box relative w-full tablet:w-96 p-10 mx-auto mt-16 rounded-t-6xl rounded-b-xl pt-16">
            <h2 className="font-display text-center text-3xl font-semibold pb-8">Enter the gate</h2>
            <Outlet />
        </section>
    );
}
