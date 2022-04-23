import { TLShapeUtil } from '@tldraw/core';
import type { SequenceBoxShape } from './SequenceBoxShape';

// eslint-disable-next-line new-cap
export const SequenceBoxIndicator = TLShapeUtil.Indicator<SequenceBoxShape>(() => (
    <div>indicator!</div>
));
