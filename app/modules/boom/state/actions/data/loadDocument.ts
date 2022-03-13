import { current } from 'immer'
import type { Action, DrawingAppDocument } from '../../constants'
import { mutables } from '../../mutables'

export const loadDocument: Action = (data, payload: { doc: DrawingAppDocument }) => {
  Object.assign(data, payload.doc)

  const snapshot = current(data)

  mutables.history.reset(snapshot)

  Object.assign(mutables, {
    snapshot,
    initialPoint: [0, 0],
    isCloning: false,
    pointedShapeId: undefined,
    pointedHandleId: undefined,
    pointedBoundsHandleId: undefined,
    initialCommonBounds: undefined,
    snapInfo: undefined,
  })
}
