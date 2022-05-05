import { Profile } from '@prisma/client';
import { ActionFunction, Form, json, LoaderFunction, redirect, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { Ornament } from '~/components/ornament';
import { createUserProfile, getUserProfile, updateUserProfile } from '~/models/profile.server';
import { magicLinkStrategy } from '~/services/auth.server';

type ProfilePageLoaderData = {
    userProfile: Profile
}

export const action: ActionFunction = async({ request }) => {
    const formData = await request.formData();
    const session = await magicLinkStrategy.checkSession(request, {
        failureRedirect: '/login',
    });

    invariant(session.user, 'user does not exist in session');

    const name = formData.get('name');

    if (name && typeof name === 'string') {
        const userProfile = await updateUserProfile({ uuid: session.user.id, name });
        return json({ userProfile });
    } else {
        return json({ message: 'invalid parameter name' }, 400);
    }
};

export const loader: LoaderFunction = async({ request }) => {
    const session = await magicLinkStrategy.checkSession(request, {
        failureRedirect: '/login',
    });

    if (session.user) {
        const { id, email } = session.user;
        try {
            let userProfile: Profile;
            const profile = await getUserProfile({ uuid: id });
            if (profile) {
                userProfile = profile;
            } else {
                const newProfile = await createUserProfile({
                    email: email || null,
                    uuid: id
                });

                userProfile = newProfile;
            }
            return json<ProfilePageLoaderData>({ userProfile });
        } catch (error) {

            console.error(error);

            return json({
                error,
                message: 'failed to load user profile'
            }, 500);
        }
    } else {
        return redirect('/login');
    }
};


export default function ProfilePage() {
    const { userProfile } = useLoaderData<ProfilePageLoaderData>();
    const { name, email } = userProfile;

    return (
        <section className="flex flex-col gap-4 items-center box rounded-t-2xl rounded-b-lg max-w-xs m-auto p-6">
            <h3 className="flex gap-2 font-display text-2xl">
                Hello {name}
            </h3>
            <Form method="post" className="flex gap-4">
                <input
                    type="text"
                    name="name" id=" name"
                    className="text-input"
                    aria-label="your name"
                    placeholder={name ? 'Change your name?' : 'What should we call you?'}
                />
                <Ornament.Button type="submit" decoration="check" size="md" />
            </Form>
            <p>your email is {email}</p>
            <Form method="post" action="logout">
                <button className="button">Log Out</button>
            </Form>
        </section>
    );
}
