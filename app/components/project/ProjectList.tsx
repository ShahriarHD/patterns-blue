import { Project } from '@prisma/client';
import { Fragment } from 'react';
import { Ornament } from '~/components/ornament';
import ProjectCard from './ProjectCard';

declare type ProjectListProps = {
    projects: Project[],
    showAddButton?: boolean
}

export default function ProjectList(props: ProjectListProps) {
    const { projects, showAddButton = false } = props;

    const projectCards = projects.map((project, index) => (
        <Fragment key={`project-${project.uuid}`}>
            {
                showAddButton &&
                <Ornament.Link
                    decoration="add"
                    to={`new/${index}`}
                    size="md"
                    shouldRenderOutlet
                />
            }
            <ProjectCard {...project} isEditable />
        </Fragment>
    ));

    return (
        <>
            {projectCards}
            {
                showAddButton &&
                <Ornament.Link
                    decoration="add"
                    to={`new/${projects.length}`}
                    size="md"
                    key="last-ornament"
                    shouldRenderOutlet
                />
            }
        </>
    );
}
