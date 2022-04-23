import { SVGContainer, TLShapeUtil } from '@tldraw/core';
import { getComponentSvgPath } from './pencil-helpers';
import type { PencilShape } from './PencilShape';

// eslint-disable-next-line new-cap
export const PencilComponent = TLShapeUtil.Component<PencilShape, SVGSVGElement>(({ shape, events, isGhost, }, ref) => {
    const { color, size, opacity } = shape;
    const pathData = getComponentSvgPath(shape.points, size);
    return (
        <SVGContainer ref={ref} {...events}>
            <path d={pathData} stroke="transparent" strokeWidth={6} opacity={0} pointerEvents="all" />
            <path d={pathData} fill={color} opacity={isGhost ? opacity / 2 : opacity} />
        </SVGContainer>
    );
});
