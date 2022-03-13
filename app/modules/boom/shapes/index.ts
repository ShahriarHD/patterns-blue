import type { CustomShapeUtil } from './CustomShapeUtil'
import { ArrowShape, ArrowUtil } from './arrow'
import { BoxShape, BoxUtil } from './box'
import { PencilShape, PencilUtil } from './pencil'
import { ImageShape, ImageUtil } from './image'

export * from './arrow'
export * from './pencil'
export * from './box'
export * from './image'

export type Shape = BoxShape | ArrowShape | PencilShape | ImageShape

export const shapeUtils = {
  box: new BoxUtil(),
  arrow: new ArrowUtil(),
  pencil: new PencilUtil(),
  image: new ImageUtil()
}

export const getShapeUtils = <T extends Shape>(shape: T | T['type']) => {
  if (typeof shape === 'string') return shapeUtils[shape] as unknown as CustomShapeUtil<T>
  return shapeUtils[shape.type] as unknown as CustomShapeUtil<T>
}
