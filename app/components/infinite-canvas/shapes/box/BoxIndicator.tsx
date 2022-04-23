import { TLShapeUtil } from '@tldraw/core';
import type { BoxShape } from './BoxShape';

// eslint-disable-next-line new-cap
export const BoxIndicator = TLShapeUtil.Indicator<BoxShape>(({ shape }) => (
    <rect
        pointerEvents="none"
        width={shape.size[0]}
        height={shape.size[1]}
        fill="none"
        stroke="tl-selectedStroke"
        strokeWidth={1}
        rx={4}
    />
));
