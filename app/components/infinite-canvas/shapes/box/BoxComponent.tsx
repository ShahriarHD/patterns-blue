import { SVGContainer, TLShapeUtil } from '@tldraw/core';
import type { BoxShape } from './BoxShape';

// eslint-disable-next-line new-cap
export const BoxComponent = TLShapeUtil.Component<BoxShape, SVGSVGElement>(({ shape, events, isGhost }, ref) => (
    <SVGContainer ref={ref} {...events}>
        <rect
            width={shape.size[0]}
            height={shape.size[1]}
            stroke="black"
            strokeWidth={3}
            strokeLinejoin="round"
            fill="none"
            rx={4}
            opacity={isGhost ? 0.3 : 1}
            pointerEvents="all"
        />
    </SVGContainer>
));
