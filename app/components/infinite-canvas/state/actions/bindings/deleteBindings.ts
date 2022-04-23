import type { Action } from '../../constants';

export const deleteBindings: Action = (data, payload: { ids: string[] }) => {
    try {
        payload.ids.forEach(id => {
            delete data.page.bindings[id];
        });
    } catch (error) {
        console.error('Could not delete bindings:', error);
    }
};
