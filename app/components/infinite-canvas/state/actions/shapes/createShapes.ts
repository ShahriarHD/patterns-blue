import { nanoid } from 'nanoid';
import { Shape, getShapeUtils } from '~/components/infinite-canvas/shapes';
import type { Action } from '../../constants';

export const createShapes: Action = (
    data,
    payload: { shapes: (Partial<Shape> & Pick<Shape, 'type'>)[] }
) => {
    try {
        payload.shapes.forEach(partial => {
            const shape = getShapeUtils(partial.type).getShape({
                id: nanoid(),
                childIndex: Object.values(data.page.shapes).length,
                ...partial,
                parentId: 'page1',
            });

            data.page.shapes[shape.id] = shape;
        });
    } catch (error) {
        console.error('Could not create shapes:', error);
    }
};
