import { Block, BlockSize } from '@prisma/client';
import { useCallback } from 'react';
import { Outlet, useOutletContext } from 'remix';
import { useProjectContext } from '../$slug';

interface EditingContextShape {
    setEditModeForIndex(index: number): Block | undefined,
    resetEditMode(): void,
    patchBlock(uuid: string, update: [BlockSize, BlockSize]): void
}

export function useEditingContext() {
    return useOutletContext<EditingContextShape>();
}

export default function EditBlockPage() {
    const { blocksManagerDispatch, blockManagerState } = useProjectContext();

    const resetEditMode = useCallback(
        () => blocksManagerDispatch({ actionType: 'set-all-link-to-edit' })
        , [blocksManagerDispatch]
    );

    const setEditModeForIndex = useCallback(
        (index: number) => {
            const blockState =
                Object.values(blockManagerState.blocksStateEssence)
                    .find(({ block }) =>
                        block.index === index);
            if (blockState) {
                blocksManagerDispatch({ actionType: 'set-editing-block', uuid: blockState.block.uuid });
                return blockState.block;
            }
            return undefined;
        }
        , [blocksManagerDispatch, blockManagerState]
    );


    const patchBlock = useCallback((uuid: string, [width, height]: [BlockSize, BlockSize] ) => {
        blocksManagerDispatch({
            actionType: 'patch-block',
            update: {
                width, height
            },
            uuid
        });
    }, [blocksManagerDispatch]);

    const context: EditingContextShape = {
        resetEditMode,
        setEditModeForIndex,
        patchBlock
    };

    return <Outlet context={context}/>;
}
