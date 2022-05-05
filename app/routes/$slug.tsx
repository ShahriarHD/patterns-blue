import { createContext, useContext } from 'react';
import { json, Link, LinksFunction, LoaderFunction, Outlet, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import Block from '~/components/living-centers/Block';
import ColorBlock from '~/components/living-centers/ColorBlock';
import CreateBlock from '~/components/living-centers/CreateBlock';
import ImageBlock from '~/components/living-centers/ImageBlock';
import TextBlock from '~/components/living-centers/TextBlock';
import { getProjectBySlug } from '~/models/project.server';
import { supabaseAdmin } from '~/services/supabase/supabase.server';

export const links:LinksFunction = () => [
    {
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        rel: 'stylesheet'
    }
];

declare type ProjectWithBlocks = Exclude<Awaited<ReturnType<typeof getProjectBySlug>>, null>;

interface ProjectLoaderData {
    project: ProjectWithBlocks
}
export const loader:LoaderFunction = async({ params }) => {
    const projectSlug = params['slug'];
    invariant(projectSlug, 'this page needs a valid slug');

    const project = await getProjectBySlug(projectSlug);

    if (project) {
        const bucketName = `project-${project.uuid}`;
        const buckets = await supabaseAdmin.storage.listBuckets();
        const bucketExists = buckets.data?.find(bucket => bucket.id === bucketName);

        if (!bucketExists) {
            const { error: creationError } = await supabaseAdmin.storage.createBucket(bucketName, { public: true });

            if (creationError) {
                return json({ message: 'failed to create bucket for project' }, 500);
            }
        }

        return json<ProjectLoaderData>({ project });
    } else {
        return json({
            message: 'Project not found'
        }, 404);
    }
};

interface ProjectPageContextStructure {
    project?: ProjectWithBlocks,
    // isOwner: boolean,
    // hideEveryoneExceptId(id: string): void;
}

const ProjectPageContext = createContext<ProjectPageContextStructure>({});

export function useProjectContext() {
    return useContext(ProjectPageContext);
}


export default function ProjectPageLayout() {
    const { project } = useLoaderData<ProjectLoaderData>();

    const children = project.blocks.map(blockInfo => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { color, text, image, sequence, ...block } = blockInfo;
        let child;

        if (color) {
            child = (
                <ColorBlock {...color} />
            );
        }

        if (text) {
            child = (
                <TextBlock {...text} />
            );
        }

        if (image) {
            child = (
                <ImageBlock {...image} isFullWidth={block.width === 'COVER'} />
            );
        }

        if (!child) {
            return null;
        }

        return (
            <Block key={block.uuid} {...block} isEditable>
                {child}
            </Block>
        );
    });

    return (
        <ProjectPageContext.Provider value={{ project }}>
            <article className="flex flex-col gap-4 items-center">
                <Link to={`/${project.slug}`}>
                    <h1 className="text-3xl font-display font-bold">{project.name}</h1>
                </Link>
                <div className="flex gap-3 tablet:gap-8 flex-row flex-wrap items-end justify-center">
                    {children}
                    <Block width="SM" height="SM" alignment="END" index={-1} >
                        <CreateBlock />
                    </Block>
                </div>
            </article>
            <Outlet />
        </ProjectPageContext.Provider>
    );
}
