import { TLAsset, TLShape } from '@tldraw/core';

export interface ImageShape extends TLShape {
    type: 'image'
    size: number[]
    assetId: string
}

export interface ImageAsset extends TLAsset {
    type: 'image'
    src: string
    size: number[]
}
