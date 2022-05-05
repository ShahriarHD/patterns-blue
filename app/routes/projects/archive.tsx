import { Project } from '@prisma/client';
import { ActionFunction, json, Link, LoaderFunction, redirect, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { Ornament } from '~/components/ornament';
import ProjectList from '~/components/project/ProjectList';
import { archiveProjectById, getUserProjects } from '~/models/project.server';
import { magicLinkStrategy } from '~/services/auth.server';


interface ProjectsLoaderData {
    projects: Project[]
}
export const loader: LoaderFunction = async({ request }) => {
    const session = await magicLinkStrategy.checkSession(request, {
        failureRedirect: '/login'
    });

    invariant(session.user, 'user not found in session');


    const projects = await getUserProjects({ userId: session.user.id, isArchived: true });

    return json({
        projects,
    });
};

export const action: ActionFunction = async({ request }) => {
    const form = await request.clone().formData();

    const projectId = form.get('projectId')?.toString();

    invariant(projectId, 'did not send any projectId');
    await archiveProjectById(projectId);

    return redirect('/projects');
};

export default function ArchivedProjectsPage() {
    const { projects } = useLoaderData<ProjectsLoaderData>();

    return (
        <div className="flex flex-col gap-16 items-stretch">
            <section className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-extrabold font-display">Archived Projects</h2>
                <div className="projects-container">
                    <ProjectList projects={projects} />
                </div>
            </section>
            <footer className="flex items-center justify-center gap-12">
                <Link className="link text-lg font-medium flex-1 text-right" to="/profile" prefetch="intent">
                    Your Profile
                </Link>
                <Ornament.Link to="/" decoration="home" size="md" />
                <Link className="link text-lg font-medium flex-1 text-left" to="/projects/" prefetch="intent">
                    Your Projects
                </Link>
            </footer>
        </div>
    );
}
