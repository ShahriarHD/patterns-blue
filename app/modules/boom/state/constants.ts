import type { TLBinding, TLPage, TLPageState, TLPerformanceMode, TLSnapLine } from '@tldraw/core'
import type { ImageAsset, Shape } from '../shapes'
import type { S } from '@state-designer/react'

export const VERSION = 1
export const PERSIST_DATA = true
export const FIT_TO_SCREEN_PADDING = 100
export const BINDING_PADDING = 12
export const SNAP_DISTANCE = 5

export interface CustomBinding extends TLBinding {
  handleId: 'start' | 'end'
}

export const INITIAL_PAGE: TLPage<Shape, CustomBinding> = {
  id: 'page1',
  shapes: {
    sequence1: {
      id: 'sequence1',
      type: 'sequence-box',
      parentId: 'page1',
      childIndex: 1,
      name: 'sds',
      title: 'a sequence box',
      steps: ['hello', 'world'],
      point: [0, 0],
    }
    // image1: {
    //   id: 'image1',
    //   type: 'image',
    //   parentId: 'page1',
    //   assetId: 'test',
    //   point: [100, 100],
    //   size: [100, 100],
    //   childIndex: 1,
    //   name: 'imaaage',
    // },
  },
  bindings: {
  },
}

export const INITIAL_PAGE_STATE: TLPageState = {
  id: 'page1',
  selectedIds: [],
  camera: {
    point: [0, 0],
    zoom: 1,
  },
  brush: null,
  pointedId: null,
  hoveredId: null,
  editingId: null,
  bindingId: null,
}

export const INITIAL_DATA = {
  id: 'myDocument',
  version: VERSION,
  page: INITIAL_PAGE,
  pageState: INITIAL_PAGE_STATE,
  overlays: {
    snapLines: [] as TLSnapLine[],
  },
  meta: {
    isDarkMode: false,
  },
  performanceMode: undefined as TLPerformanceMode | undefined,
  assets: {
    test: {
      type: 'image',
      id: 'test',
      size: [100,100],
      src: '/img/matisse.jpg',
    }
  } as Record<string,ImageAsset>
}

export type DrawingAppDocument = {
  id: string
  page: TLPage<Shape>
}

export type DrawingAppData = typeof INITIAL_DATA

export type Action = S.Action<DrawingAppData>

export type Condition = S.Condition<DrawingAppData>
