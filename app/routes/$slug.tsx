import { Fragment, RefObject, useMemo, useRef, useState } from 'react';
import { json, Link, LinksFunction, LoaderFunction, Outlet, useLoaderData, useOutletContext } from 'remix';
import invariant from 'tiny-invariant';
import Block, { BlockActiveMode } from '~/components/living-centers/Block';
import ColorBlock from '~/components/living-centers/ColorBlock';
import CreateBlock from '~/components/living-centers/CreateBlock';
import ImageBlock from '~/components/living-centers/ImageBlock';
import TextBlock from '~/components/living-centers/TextBlock';
import { getProjectBySlug } from '~/models/project.server';
import { magicLinkStrategy } from '~/services/auth.server';

export const links:LinksFunction = () => [
    {
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        rel: 'stylesheet'
    }
];

declare type ProjectWithBlocks = Exclude<Awaited<ReturnType<typeof getProjectBySlug>>, null>;

interface ProjectLoaderData {
    project: ProjectWithBlocks,
    isOwner: boolean
}
export const loader:LoaderFunction = async({ request, params }) => {
    const projectSlug = params['slug'];
    invariant(projectSlug, 'this page needs a valid slug');

    const project = await getProjectBySlug(projectSlug);
    const session = await magicLinkStrategy.checkSession(request);

    if (project) {

        const isOwner = session?.user?.id === project.ownerId;

        return json<ProjectLoaderData>({ project, isOwner });
    } else {
        return json({
            message: 'Project not found'
        }, 404);
    }
};

declare type ActiveBlockState = {
    mode: BlockActiveMode,
    uuid: string,
}
export interface ProjectPageContextStructure {
    project: ProjectWithBlocks,
    isOwner: boolean,
    layoutContext: {
        activeBlock?: ActiveBlockState,
        activateBlock(state: ActiveBlockState): void,
        restore(): void
    },
    createBlockIndex: number,
    createBlockRef: RefObject<HTMLDivElement>
    // hideEveryoneExceptId(id: string): void;
}

export function useProjectContext() {
    return useOutletContext<ProjectPageContextStructure>();
}

function useCreateBlockPositioning(project: ProjectWithBlocks) {
    const [createBlockIndex, setCreateBlockIndex] = useState(project.blocks.length);
    const increaseCreateBlockIndex = useMemo(() => {
        if (createBlockIndex < project.blocks.length) {
            return () => setCreateBlockIndex(createBlockIndex + 1);
        }
        return undefined;
    }, [createBlockIndex, project.blocks.length]);

    const decreaseCreateBlockIndex = useMemo(() => {
        if (createBlockIndex > 0) {
            return () => setCreateBlockIndex(createBlockIndex - 1);
        }
        return undefined;
    }, [createBlockIndex, project.blocks.length]);

    return {
        createBlockIndex,
        increaseCreateBlockIndex,
        decreaseCreateBlockIndex,
    };
}

export default function ProjectPageLayout() {
    const { project, isOwner } = useLoaderData<ProjectLoaderData>();
    const [activeBlock, setActiveBlock ] = useState<ActiveBlockState | undefined>();
    const {
        createBlockIndex,
        decreaseCreateBlockIndex, increaseCreateBlockIndex
    } = useCreateBlockPositioning(project);

    const createBlockRef = useRef<HTMLDivElement>(null);

    const context: ProjectPageContextStructure = {
        project,
        isOwner,
        layoutContext: {
            activeBlock,
            activateBlock: info => setActiveBlock(info),
            restore: () => setActiveBlock(undefined)
        },
        createBlockIndex,
        createBlockRef,
    };


    const createBlock = (
        <Block width="MD" height="MD" index={-1} ref={createBlockRef}>
            <CreateBlock
                index={createBlockIndex}
                decreaseIndex={decreaseCreateBlockIndex}
                increaseIndex={increaseCreateBlockIndex}
            />
        </Block>
    );

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
            <Fragment
                key={block.uuid}
            >
                {
                    block.index === createBlockIndex && isOwner && createBlock
                }
                <Block
                    {...block}
                    blockActiveState={activeBlock?.uuid === block.uuid ? activeBlock.mode : undefined}
                    isEditable={isOwner}
                >
                    {child}
                </Block>
            </Fragment>
        );
    });

    return (
        <article className="flex flex-col gap-4 items-center">
            <Link to={`/${project.slug}`}>
                <h1 className="text-3xl font-display font-bold">{project.name}</h1>
            </Link>
            <div className="flex gap-3 tablet:gap-8 flex-row flex-wrap items-end justify-center">
                {children}
                {
                    isOwner && createBlockIndex === project.blocks.length && createBlock
                }
            </div>
            <Outlet context={context}/>
        </article>
    );
}
