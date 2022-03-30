import { TLBinding, TLPage, TLPageState, TLPerformanceMode, TLSnapLine } from '@tldraw/core';
import type { ImageAsset, Shape } from '../shapes';
import type { S } from '@state-designer/react';
import { z } from "zod";

export const VERSION = '1.0'
export const PERSIST_DATA = true
export const FIT_TO_SCREEN_PADDING = 100
export const BINDING_PADDING = 12
export const SNAP_DISTANCE = 5

export interface CustomBinding extends TLBinding {
    handleId: 'start' | 'end'
}

export type PageShape = TLPage<Shape, CustomBinding>;

const PageSchema: z.ZodType<PageShape> = z.object({
    id: z.string(),
    name: z.optional(z.string()),
    childIndex: z.optional(z.number()),
    shapes: z.record(z.any()),
    bindings: z.record(z.any())
})

export const INITIAL_PAGE: PageShape = {
    id: 'page1',
    shapes: {
        // sequence1: {
        //   id: 'sequence1',
        //   type: 'sequence-box',
        //   parentId: 'page1',
        //   childIndex: 1,
        //   name: 'sds',
        //   title: 'a sequence box',
        //   steps: ['hello', 'world'],
        //   point: [0, 0],
        // },
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

export type PageStateShape = TLPageState

const PageStateSchema: z.ZodType<PageStateShape> = z.object({
    id: z.string(),
    selectedIds: z.array(z.string()),
    camera: z.object({
        point: z.array(z.number()),
        zoom: z.number()
    }),
    brush: z.optional(z.nullable(
            z.object({
                minX: z.number(),
                minY: z.number(),
                maxX: z.number(),
                maxY: z.number(),
                width: z.number(),
                height: z.number(),
                rotation: z.optional(z.number()),
            })
    )),
    pointedId: z.optional(z.nullable(z.string())),
    hoveredId: z.optional(z.nullable(z.string())),
    editingId: z.optional(z.nullable(z.string())),
    bindingId: z.optional(z.nullable(z.string())),
})

export const INITIAL_PAGE_STATE: PageStateShape = {
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


export type DrawingAppData = {
    id: string,
    title?: string,
    version: string,
    page: PageShape,
    pageState: TLPageState,
    pageIndex: number,
    overlays: {
        snapLines: TLSnapLine[],
    },
    performanceMode?: TLPerformanceMode,
    assets: Record<string, ImageAsset>
}

export const DrawingAppDataSchema: z.ZodType<DrawingAppData> = z.object({
    id: z.string(),
    title: z.string(),
    version: z.string(),
    page: PageSchema,
    pageState: PageStateSchema,
    pageIndex: z.number().gte(0),
    overlays: z.object({
        snapLines: z.array(z.array(z.array(z.number())))
    }),
    performanceMode: z.optional(z.nativeEnum(TLPerformanceMode)),
    assets: z.object({})
})

export const INITIAL_DATA: DrawingAppData = {
    id: 'unique-id',
    title: 'New Canvas',
    version: VERSION,
    page: INITIAL_PAGE,
    pageState: INITIAL_PAGE_STATE,
    pageIndex: 0,
    overlays: {
        snapLines: [],
    },
    performanceMode: undefined,
    assets: {
        // test: {
        //   type: 'image',
        //   id: 'test',
        //   size: [100, 100],
        //   src: '/img/matisse.jpg',
        // }
    }
}

export type Action = S.Action<DrawingAppData>

export type Condition = S.Condition<DrawingAppData>
