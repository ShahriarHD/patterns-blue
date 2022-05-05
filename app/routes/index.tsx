import { Project } from '@prisma/client';
import { useEffect } from 'react';
import { json, LoaderFunction, MetaFunction, redirect, useLoaderData } from 'remix';
import { useLayoutContext } from '~/components/Layout';
import ProjectCard from '~/components/project/ProjectCard';
import { getPublicProjects } from '~/models/project.server';

export const meta: MetaFunction = () => ({
    title: 'Inner Light',
    description: 'color related experiments',
});

interface LoaderData {
    projects: Project[]
}

export const loader: LoaderFunction = async({ request }) => {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '';

    const pageNumber = parseInt(page);

    if (!page || isNaN(pageNumber)) {
        return redirect('/?page=1');
    }

    const projects = await getPublicProjects(pageNumber);

    return json({
        projects
    });
};

export default function Index() {
    const { toggleHeader } = useLayoutContext();
    useEffect(() => toggleHeader('expand'), []);

    const { projects } = useLoaderData<LoaderData>();

    const projectCards = projects.map(project => (
        <ProjectCard key={`project-${project.uuid}`} {...project} />
    ));

    return (
        <div className="grid grid-cols-1 tablet:grid-cols-3 container mx-auto items-center">
            {projectCards}
        </div>
    );
}
