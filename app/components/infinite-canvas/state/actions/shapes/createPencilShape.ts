import { shapeUtils } from '~/components/infinite-canvas/shapes';
import type { Action } from '../../constants';
import { mutables } from '../../mutables';

export const createPencilShape: Action = data => {
    const shape = shapeUtils.pencil.getShape({
        parentId: 'page1',
        point: mutables.currentPoint,
        points: [[0, 0]],
        color: mutables.activeColor,
        size: mutables.pencilStrokeWidth,
        opacity: mutables.pencilOpacity,
        childIndex: Object.values(data.page.shapes).length,
    });

    data.page.shapes[shape.id] = shape;
    data.pageState.selectedIds = [shape.id];

    mutables.rawPoints = [[0, 0]];
    mutables.pointedShapeId = shape.id;
};
