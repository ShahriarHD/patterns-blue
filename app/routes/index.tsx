import { Project } from '@prisma/client';
import { useEffect } from 'react';
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { useLayoutContext } from '~/components/Layout';
import ProjectCard from '~/components/project/ProjectCard';
import { getProjectsBySlugs } from '~/models/project.server';

export const meta: MetaFunction = () => ({
    title: 'Inner Light',
    description: 'color related experiments',
});

interface LoaderData {
    projects: Project[]
}

const firstPageProjectSlugs = [
    'project-apbmmYHX0y5PvslLm-NPw',
    'project-N0sKZqS2K60S8X5YR9Qvy',
    'project-r44pXM6kCmEBCjQ5_rW47',
    'project-IDcIltYqhcinBphtWZtOp',

    // local-dev
    'project-cL2cgf4NjVVuScQF5qSIR',
    'project-brFE6llffVwM5GyztEdWf',
    'project--6-UIy5gsszV9YiT4Lao2',
    'project-HU6Vvvn3zP1QPrCq-2HF8'
];

export const loader: LoaderFunction = async() => {
    // const { searchParams } = new URL(request.url);
    // const page = searchParams.get('page') || '';

    // const pageNumber = parseInt(page);

    // if (!page || isNaN(pageNumber)) {
    //     return redirect('/?page=1');
    // }

    const projects = await getProjectsBySlugs(firstPageProjectSlugs);

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
        <div className="grid grid-cols-1 items-stretch gap-16 tablet:grid-cols-3 desktop:grid-cols-4 mx-auto p-8">
            {projectCards}
        </div>
    );
}
