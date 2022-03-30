import { CustomShapeUtil } from "../CustomShapeUtil";
import { ImageShape } from "./ImageShape";
import { ImageComponent } from './ImageComponent'
import { ImageIndicator } from "./ImageIndicator";
import { TLBounds, Utils } from "@tldraw/core";
import { nanoid } from "nanoid";
import { intersectLineSegmentBounds } from "@tldraw/intersect";

export class ImageUtil extends CustomShapeUtil<ImageShape, HTMLDivElement> {

    Component = ImageComponent
    Indicator = ImageIndicator
    canBind = false;
    showCloneHandles = true;
    hideResizeHandles = false;

    getShape = (props: Partial<ImageShape>) => {
        return Utils.deepMerge<ImageShape>(
            {
                id: nanoid(),
                type: 'image',
                name: 'Image',
                parentId: 'page1',
                childIndex: 1,
                point: [0, 0],
                size: [1, 1],
                rotation: 0,
                assetId: 'asset-default'
            }
            , props
        )
    }

    getBounds = (shape: ImageShape) => {
        const bounds = Utils.getFromCache(this.boundsCache, shape, () => {
            const [width, height] = shape.size

            return {
                minX: 0,
                maxX: width,
                minY: 0,
                maxY: height,
                width,
                height,
            } as TLBounds
        })

        return Utils.translateBounds(bounds, shape.point)
    }

    shouldRender = (prev: ImageShape, next: ImageShape) => {
        return next.size !== prev.size;
    }


    getCenter = (shape: ImageShape) => {
        return Utils.getBoundsCenter(this.getBounds(shape))
    }

    hitTestPoint = (shape: ImageShape, point: number[]) => {
        return Utils.pointInBounds(point, this.getBounds(shape))
    }

    hitTestLineSegment = (shape: ImageShape, A: number[], B: number[]) => {
        return intersectLineSegmentBounds(A, B, this.getBounds(shape)).length > 0
    }

    transform = (shape: ImageShape, bounds: TLBounds, initialShape: ImageShape, scale: number[]) => {
        shape.point = [bounds.minX, bounds.minY]
        shape.size = [bounds.width, bounds.height]
    }
}