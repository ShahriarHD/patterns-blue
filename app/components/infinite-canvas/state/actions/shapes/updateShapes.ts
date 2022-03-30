import { Shape } from '~/components/infinite-canvas/shapes'
import type { Action } from '../../constants'

export const updateShapes: Action = (
  data,
  payload: { shapes: (Partial<Shape> & Pick<Shape, 'id'>)[] }
) => {
  try {
    payload.shapes.forEach((partial, i) => {
      Object.assign(data.page.shapes[partial.id], partial)
    })
  } catch (e: any) {
    e.message = 'Could not update shapes: ' + e.message
    console.error(e)
  }
}
