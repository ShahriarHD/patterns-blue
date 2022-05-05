import { Project } from '@prisma/client';
import { Link, useFetcher } from 'remix';
import { Ornament } from '../ornament';

declare type ProjectCardProps = Project & {
    isEditable?: boolean;
}

export default function ProjectCard(props: ProjectCardProps){
    const fetcher = useFetcher();
    const { name, slug, uuid, description, isEditable = false } = props;
    return (
        <div className="project-card">
            <Link to={`/${slug}/`} prefetch="intent">
                <img src="/img/mock/centers.jpg" className="poster" alt="" />
                <h4>{name}</h4>
                <p className="px-4 pb-8 pointer-events-none">
                    {description}
                </p>
            </Link>
            {
                isEditable &&
                <div className="flex gap-4 flex-row items-center absolute -bottom-10">
                    <fetcher.Form action="archive" method="post">
                        <Ornament.Button
                            decoration="error"
                            size="sm"
                            type="submit"
                            value={uuid}
                            name="projectId"
                        />
                    </fetcher.Form>
                </div>
            }
        </div>
    );
}
