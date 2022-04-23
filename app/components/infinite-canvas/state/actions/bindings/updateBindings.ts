import type { TLBinding } from '@tldraw/core';
import type { Action } from '../../constants';

export const updateBindings: Action = (
    data,
    payload: { bindings: (Partial<TLBinding> & Pick<TLBinding, 'id'>)[] }
) => {
    try {
        payload.bindings.forEach(partial => {
            Object.assign(data.page.bindings[partial.id], partial);
        });
    } catch (error) {
        console.error('Could not update shapes:', error);
    }
};
