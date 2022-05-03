import { Project } from '@prisma/client';
import { Fragment, useEffect } from 'react';
import { json, Link, LoaderFunction, redirect, useFetcher, useLoaderData } from 'remix';
import { useLayoutContext } from '~/components/Layout';
import { Ornament } from '~/components/ornament';
import { getUserProjects } from '~/models/project.server';
import { magicLinkStrategy } from '~/services/auth.server';

interface ProjectsLoaderData {
    yourProjects: Project[]
}
export const loader: LoaderFunction = async({ request }) => {
    const session = await magicLinkStrategy.checkSession(request);

    if (!session) {
        return redirect('/login');
    } else if (session.user) {
        const yourProjects = await getUserProjects({ userId: session.user.id });

        return json({
            yourProjects,
        });
    }
};

export default function ProjectIndexPage() {
    const { yourProjects } = useLoaderData<ProjectsLoaderData>();

    const fetcher = useFetcher();
    const { toggleHeader } = useLayoutContext();
    useEffect(() => toggleHeader('minimize'), []);

    return (
        <main className="flex flex-col gap-16 items-stretch">
            <section className="flex flex-col items-center gap-4">
                <Link to="/projects">
                    <h2 className="text-3xl font-extrabold font-display">Your Projects</h2>
                </Link>

                <div className="projects-container">
                    {
                        yourProjects.map(({ name, slug, uuid, description }, index) => (
                            <Fragment key={`hull-${index}`}>
                                <Ornament.Link
                                    decoration="add"
                                    to={`new/${index}`}
                                    size="md"
                                    shouldRenderOutlet
                                />
                                <div className="project-card">
                                    <Link to={`/${slug}/`} prefetch="intent">
                                        <img src="/img/mock/centers.jpg" className="poster" alt="" />
                                        <h4>{name}</h4>
                                        <p className="px-4 pb-8 pointer-events-none">
                                            {description}
                                        </p>
                                    </Link>
                                    <div className="flex gap-4 flex-row items-center absolute -bottom-10">
                                        <fetcher.Form action="delete" method="post">
                                            <Ornament.Button
                                                decoration="loading"
                                                size="sm"
                                                type="submit"
                                                value={uuid}
                                                name="delete-id"
                                            />
                                        </fetcher.Form>
                                        <fetcher.Form action="delete" method="post">
                                            <Ornament.Button
                                                decoration="error"
                                                size="sm"
                                                type="submit"
                                                value={uuid}
                                                name="delete-id"
                                            />
                                        </fetcher.Form>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }
                    <Ornament.Link
                        decoration="add"
                        to={`new/${yourProjects.length}`}
                        size="md"
                        key="last-ornament"
                        shouldRenderOutlet
                    />
                </div>
            </section>

        </main>
    );
}
