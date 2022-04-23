import { getShapeUtils } from '~/components/infinite-canvas/shapes';
import type { Action } from '../../constants';
import { mutables } from '../../mutables';

export const eraseShapes: Action = data => {
    const { previousPoint } = mutables;

    Object.values(data.page.shapes)
        .filter(shape => !shape.isGhost)
        .forEach(shape => {
            if (getShapeUtils(shape).hitTestLineSegment(shape, previousPoint, mutables.currentPoint)) {
                shape.isGhost = true;
            }
        });
};
