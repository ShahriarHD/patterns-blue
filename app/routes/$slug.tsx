import { Dispatch, Fragment, useCallback, useMemo } from 'react';
import { json, Link, LinksFunction, LoaderFunction, Outlet, useLoaderData, useOutletContext } from 'remix';
import invariant from 'tiny-invariant';
import { Reducer, useImmerReducer } from 'use-immer';
import Block, { BlockMode, BlockProps } from '~/components/living-centers/Block';
import CreateBlock from '~/components/living-centers/CreateBlock';
import { Ornament } from '~/components/ornament';
import { getProjectBySlug } from '~/models/project.server';
import { magicLinkStrategy } from '~/services/auth.server';

export const links:LinksFunction = () => [
    {
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
        rel: 'stylesheet'
    }
];

declare type ProjectWithBlocks = Exclude<Awaited<ReturnType<typeof getProjectBySlug>>, null>;
declare type LoadedBlockType = ProjectWithBlocks['blocks'][0]
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


declare type BlockState = {
    mode: BlockMode,
    block: LoadedBlockType,
}

declare type BlocksManagerState = {
    activeBlockId?: string,

    createBlockIndex: number,

    blocksStateEssence: Record<string, BlockState>
}

declare type BlockActions = {
    actionType: 'set-all-to-view-mode',
} | {
    actionType: 'set-all-link-to-edit'
} | {
    actionType: 'set-editing-block',
    uuid: string
} | {
    actionType: 'move-create-block',
    to: 'left' | 'right'
} | {
    actionType: 'patch-block',
    update: Partial<LoadedBlockType>,
    uuid: string,
};

const blocksManagerReducerFunction: Reducer<BlocksManagerState, BlockActions> =
    // eslint-disable-next-line complexity
    (draft, action) => {
        switch (action.actionType) {
            case 'set-all-to-view-mode': {
                const keys = Object.keys(draft.blocksStateEssence);
                for (const key of keys) {
                    draft.blocksStateEssence[key].mode = 'view';
                }
                break;
            }
            case 'set-all-link-to-edit': {
                const keys = Object.keys(draft.blocksStateEssence);
                for (const key of keys) {
                    draft.blocksStateEssence[key].mode = 'link-to-editing';
                }
                break;
            }
            case 'set-editing-block': {
                draft.activeBlockId = action.uuid;
                const keys = Object.keys(draft.blocksStateEssence);
                for (const key of keys) {
                    if (key === action.uuid) {
                        draft.blocksStateEssence[key].mode = 'is-editing';
                    } else {
                        draft.blocksStateEssence[key].mode = 'link-to-editing';
                    }
                }
                break;
            }
            case 'move-create-block': {
                const to = action.to;
                const blockLength = Object.keys(draft.blocksStateEssence).length;
                if (to === 'left' && draft.createBlockIndex > 0) {
                    draft.createBlockIndex --;
                } else if (to === 'right' && draft.createBlockIndex < blockLength) {
                    draft.createBlockIndex ++;
                }
                break;
            }
            case 'patch-block': {
                const { uuid, update } = action;
                const current = draft.blocksStateEssence[uuid].block;
                draft.blocksStateEssence[uuid].block = {
                    ...current,
                    ...update
                };
            }
        }
    };

function useBlocksManager(project: ProjectWithBlocks) {

    const initialState: BlocksManagerState = {
        createBlockIndex: project.blocks.length,
        blocksStateEssence:
            Object.fromEntries(project.blocks.map((block): [string, BlockState] => [block.uuid, { mode: 'view', block }]))
    };
    const [state, dispatch] = useImmerReducer(blocksManagerReducerFunction, initialState);

    return { state, dispatch };
}
export interface ProjectPageContextStructure {
    project: ProjectWithBlocks,
    isOwner: boolean,

    blocksManagerDispatch: Dispatch<BlockActions>,
    blockManagerState: BlocksManagerState
}

export function useProjectContext() {
    return useOutletContext<ProjectPageContextStructure>();
}

export default function ProjectPageLayout() {
    const { project, isOwner } = useLoaderData<ProjectLoaderData>();
    const { state, dispatch } = useBlocksManager(project);


    const context: ProjectPageContextStructure = {
        project,
        isOwner,

        blocksManagerDispatch: dispatch,
        blockManagerState: state
    };

    const increaseCreateBlockIndex = useCallback(() => dispatch({ actionType: 'move-create-block', to: 'right' }), [dispatch]);
    const decreaseCreateBlockIndex = useCallback(() => dispatch({ actionType: 'move-create-block', to: 'left' }), [dispatch]);
    const blocksLength = useMemo(() => Object.keys(state.blocksStateEssence).length, [state.blocksStateEssence]);

    const createBlock = isOwner && (
        <Block
            block={{
                height: 'MD',
                width: 'SM',
                index: -1,
                projectId: project.uuid,
                uuid: 'create-block-id'
            }}
            blockKind={{
                kind: 'create'
            }}
        >
            <CreateBlock
                newBlockFormData={{
                    createBlockIndex: state.createBlockIndex,
                    projectId: project.uuid,
                    projectSlug: project.slug
                }}
                increaseIndex={state.createBlockIndex !== blocksLength ? increaseCreateBlockIndex : undefined}
                decreaseIndex={state.createBlockIndex !== 0 ? decreaseCreateBlockIndex : undefined}
            />
        </Block>
    );

    const children = Object.entries(state.blocksStateEssence).map(([uuid, blockState]) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { color, image, text, ...block } = blockState.block;
        let blockKind: BlockProps['blockKind'];

        if (color) {
            blockKind = {
                kind: 'color',
                color
            };
        } else if (image) {
            blockKind = {
                kind: 'image',
                image
            };
        } else if (text) {
            blockKind = {
                kind: 'text',
                text
            };
        } else {
            blockKind = {
                kind: 'create'
            };
        }

        return (
            <Fragment
                key={uuid}
            >
                {
                    block.index === state.createBlockIndex && createBlock
                }
                <Block
                    block={block}
                    blockKind={blockKind}
                    blockActiveState={state.blocksStateEssence[block.uuid].mode}
                />
            </Fragment>
        );
    });

    return (
        <article className="flex flex-col gap-4 items-center">
            <img src={project.coverImage} alt="" className="w-56"/>
            <Link to={`/${project.slug}`}>
                <h1 className="text-7xl font-display font-bold">{project.name}</h1>
            </Link>
            <p className="pb-8 w-72">
                {project.description}
            </p>
            {
                isOwner &&
                <div className="grid grid-cols-3 gap-1 place-items-center
                            border-b pb-8 mb-8 border-black-alpha-500 dark:border-white-alpha-500">
                    <Ornament.Link
                        to="." state={{ scroll: false }}
                        decoration="eye"
                        size="md"
                    >
                    </Ornament.Link>
                    <Ornament.Link
                        to="edit" state={{ scroll: false }}
                        decoration="settings"
                        size="md"
                    >
                    </Ornament.Link>
                    <Ornament.Link
                        to="draw" state={{ scroll: false }}
                        decoration="brush"
                        size="md"
                    >
                    </Ornament.Link>
                    <p className="mx-4">view</p>
                    <p className="mx-4">edit</p>
                    <p className="mx-4">draw</p>
                </div>
            }
            <div className="blocks-grid mb-32">
                {children}
                {
                    state.createBlockIndex === project.blocks.length && createBlock
                }
            </div>
            <Outlet context={context}/>
        </article>
    );
}
