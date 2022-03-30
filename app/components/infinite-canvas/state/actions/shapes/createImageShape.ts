import { TLBoundsCorner, TLPointerInfo } from '@tldraw/core'
import { shapeUtils } from '~/components/infinite-canvas/shapes'
import type { Action } from '../../constants'
import { getPagePoint } from '../../helpers'
import { mutables } from '../../mutables'

export const createImageShape: Action = (data, payload: TLPointerInfo) => {
  const shape = shapeUtils.image.getShape({
    parentId: 'page1',
    point: mutables.currentPoint,
    size: [1, 1],
    childIndex: Object.values(data.page.shapes).length,

  })

  data.page.shapes[shape.id] = shape
  data.pageState.selectedIds = [shape.id]

  mutables.pointedBoundsHandleId = TLBoundsCorner.BottomRight
}
