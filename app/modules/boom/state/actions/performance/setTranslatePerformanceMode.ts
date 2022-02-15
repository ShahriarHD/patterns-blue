import { TLPerformanceMode } from '@tldraw/core'
import type { Action } from '../../constants'

export const setTranslatePerformanceMode: Action = (data) => {
  data.performanceMode = undefined
}
