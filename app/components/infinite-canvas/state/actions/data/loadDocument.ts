import { current } from 'immer'
import type { Action, DrawingAppData } from '../../constants'
import { makeHistory } from '../../history'
import { mutables } from '../../mutables'

export const loadDocument: Action = (data, payload: { doc: DrawingAppData }) => {
  Object.assign(data, payload.doc)

  const snapshot = current(data)

  Object.assign(mutables, {
    history: makeHistory(payload.doc.id),
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
