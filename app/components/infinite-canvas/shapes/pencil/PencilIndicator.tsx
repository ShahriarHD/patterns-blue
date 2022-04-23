import { TLShapeUtil } from '@tldraw/core';
import { getIndicatorSvgPath } from './pencil-helpers';
import type { PencilShape } from './PencilShape';

// eslint-disable-next-line new-cap
export const PencilIndicator = TLShapeUtil.Indicator<PencilShape>(({ shape }) => (
    <path
        d={getIndicatorSvgPath(shape.points)}
        pointerEvents="none"
        fill="none"
        stroke="tl-selectedStroke"
        strokeWidth={1}
        rx={4}
    />
));
