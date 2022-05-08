import { Profile } from '@prisma/client';
import { ActionFunction, Form, json, LoaderFunction, redirect, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { Ornament } from '~/components/ornament';
import { createUserProfile, getUserProfile, updateUserProfile } from '~/models/profile.server';
import { magicLinkStrategy } from '~/services/auth.server';
import { GiForestCamp } from 'react-icons/gi';
import { Link } from 'react-router-dom';
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
                    email: email || '',
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
        <div className="flex flex-col items-center gap-12">
            <section className="flex flex-col gap-4 items-center box rounded-t-2xl rounded-b-lg max-w-xs m-auto p-6">
                <h3 className="flex gap-2 font-display text-2xl">
                    Hello {name}
                </h3>
                {
                    name &&
                    <nav>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link to="/projects" className="link">Go to your projects</Link>
                            </li>
                            <li>
                                <Link to="/" className="link">Explore community projects</Link>
                            </li>
                        </ul>
                    </nav>
                }
                <Form method="post" className={`flex gap-4 transition-transform ${name && 'scale-75'}`}>
                    <input
                        type="text"
                        name="name" id=" name"
                        className="text-input"
                        aria-label="your name"
                        placeholder={name ? 'Change your name?' : 'What should we call you?'}
                    />
                    <Ornament.Button type="submit" decoration="check" size="md" />
                </Form>
                { email && <p>your email is {email}</p> }
            </section>
            <Form method="post" action="logout" className="mx-auto">
                <button className="button flex gap-4">
                    Log Out
                    <GiForestCamp className="scale-125 origin-bottom translate-y-px" />
                </button>
            </Form>
        </div>
    );
}
