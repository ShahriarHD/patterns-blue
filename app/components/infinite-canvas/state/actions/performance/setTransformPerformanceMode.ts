import { TLPerformanceMode } from '@tldraw/core'
import type { Action } from '../../constants'

export const setTransformPerformanceMode: Action = (data) => {
  data.performanceMode = undefined
}
