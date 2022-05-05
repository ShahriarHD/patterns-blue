import { Project } from '@prisma/client';
import { useEffect } from 'react';
import { json, Link, LoaderFunction, Outlet, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { useLayoutContext } from '~/components/Layout';
import { Ornament } from '~/components/ornament';
import ProjectList from '~/components/project/ProjectList';
import { getUserProjects } from '~/models/project.server';
import { magicLinkStrategy } from '~/services/auth.server';

interface ProjectsLoaderData {
    isArchivesPage: boolean
    projects: Project[]
}
export const loader: LoaderFunction = async({ request }) => {
    const isArchivesPage = request.url.includes('archive');

    if (isArchivesPage) {
        return { isArchivesPage };
    }

    const session = await magicLinkStrategy.checkSession(request, {
        failureRedirect: '/login'
    });

    invariant(session.user, 'user not found in session');

    const projects = await getUserProjects({ userId: session.user.id, isArchived: false });

    return json({
        projects,
        isArchivesPage
    });
};

export default function ProjectIndexPage() {
    const { projects, isArchivesPage } = useLoaderData<ProjectsLoaderData>();

    const { toggleHeader } = useLayoutContext();
    useEffect(() => {
        toggleHeader('minimize');

        return () => toggleHeader('expand');
    }, []);

    if (isArchivesPage) {
        return (
            <Outlet />
        );
    }

    return (
        <div className="flex flex-col gap-16 items-stretch">
            <section className="flex flex-col items-center gap-4">
                <Link to="/projects">
                    <h2 className="text-3xl font-extrabold font-display">Your Projects</h2>
                </Link>
                <div className="projects-container">
                    <ProjectList projects={projects} showAddButton />
                </div>
            </section>
            <footer className="flex items-center justify-center gap-12">
                <Link className="link text-lg font-medium flex-1 text-right" to="/profile" prefetch="intent">
                    Your Profile
                </Link>
                <Ornament.Link to="/" decoration="home" size="md" />
                <Link className="link text-lg font-medium flex-1 text-left" to="/projects/archive" prefetch="intent">
                    Archived Projects
                </Link>
            </footer>
        </div>
    );
}
