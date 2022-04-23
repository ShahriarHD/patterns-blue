import { Shape } from '~/components/infinite-canvas/shapes';
import type { Action } from '../../constants';

export const updateShapes: Action = (
    data,
    payload: { shapes: (Partial<Shape> & Pick<Shape, 'id'>)[] }
) => {
    try {
        payload.shapes.forEach(partial => {
            Object.assign(data.page.shapes[partial.id], partial);
        });
    } catch (error) {
        console.error('Could not update shapes:', error);
    }
};
