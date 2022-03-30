import { TLShapeUtil, SVGContainer, HTMLContainer } from '@tldraw/core'
import type { SequenceBoxShape } from './SequenceBoxShape'

export const SequenceBoxComponent = TLShapeUtil.Component<SequenceBoxShape, HTMLDivElement>(
  ({ shape, events, isGhost, meta }, ref) => {
    const {title, steps} = shape;
    return (
      <HTMLContainer ref={ref} {...events} className="bg-blue-500">
        <h1 className='text-3xl'>{title}</h1>
        <ul>
          {
            steps.map((step, index) => <li key={`step-${index}`}>{step}</li>)
          }
        </ul>
      </HTMLContainer>
    )
  }
)
