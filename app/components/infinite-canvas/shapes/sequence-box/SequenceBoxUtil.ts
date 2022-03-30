import { TLBounds, Utils } from '@tldraw/core'
import { intersectLineSegmentBounds } from '@tldraw/intersect'
import { nanoid } from 'nanoid'
import { CustomShapeUtil } from '../CustomShapeUtil'
import { SequenceBoxComponent } from './SequenceBoxComponent'
import { SequenceBoxIndicator } from './SequenceBoxIndicator'
import type { SequenceBoxShape } from './SequenceBoxShape'

type T = SequenceBoxShape
type E = HTMLDivElement

export class SequenceBoxUtil extends CustomShapeUtil<T, E> {
  Component = SequenceBoxComponent

  Indicator = SequenceBoxIndicator

  hideResizeHandles = false

  getBounds = (shape: T) => {
    const bounds = Utils.getFromCache(this.boundsCache, shape, () => {
      const [width, height] = [600, 400];

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

  /* ----------------- Custom Methods ----------------- */

  canBind = true

  getShape = (props: Partial<T>): T => {
    return {
      id: nanoid(),
      type: 'sequence-box',
      name: 'Sequence Box',
      parentId: 'page1',
      point: [0, 0],
      childIndex: 1,
      title: 'sample',
      steps: ['a', 'b'],
      ...props,
    }
  }

  shouldRender = (prev: T, next: T) => {
    return next.title !== prev.title // BUG: look at this :))
  }

  getCenter = (shape: T) => {
    return Utils.getBoundsCenter(this.getBounds(shape))
  }

  hitTestPoint = (shape: T, point: number[]) => {
    return Utils.pointInBounds(point, this.getBounds(shape))
  }

  hitTestLineSegment = (shape: T, A: number[], B: number[]) => {
    return intersectLineSegmentBounds(A, B, this.getBounds(shape)).length > 0
  }

  transform = (shape: T, bounds: TLBounds, initialShape: T, scale: number[]) => {
    shape.point = [bounds.minX, bounds.minY]
  }
}
