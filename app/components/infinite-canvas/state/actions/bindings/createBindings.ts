import type { TLBinding } from '@tldraw/core';
import type { Action, CustomBinding } from '../../constants';
import { nanoid } from 'nanoid';

export const createBindings: Action = (
    data,
    payload: {
        bindings: (Partial<TLBinding> & Pick<CustomBinding, 'fromId' | 'toId' | 'handleId'>)[]
    }
) => {
    payload.bindings.forEach(partial => {
        const binding = {
            id: nanoid(),
            ...partial,
        };

        data.page.bindings[binding.id] = binding;
    });
};
