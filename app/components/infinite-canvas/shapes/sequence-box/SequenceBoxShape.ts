import type { TLShape } from '@tldraw/core';

export interface SequenceBoxShape extends TLShape {
    type: 'sequence-box',
    title: string,
    steps: string[],
}
