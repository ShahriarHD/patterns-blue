import type { Action } from '../../constants';

export const deleteShapes: Action = (data, payload: { ids: string[] }) => {
    try {
        data.pageState.selectedIds = data.pageState.selectedIds.filter(id => !payload.ids.includes(id));

        payload.ids.forEach(id => {
            delete data.page.shapes[id];
        });
    } catch (error) {
        console.error('Could not delete shapes:', error);
    }
};
