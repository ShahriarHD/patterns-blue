import { HTMLContainer, TLShapeUtil } from '@tldraw/core';
import type { SequenceBoxShape } from './SequenceBoxShape';

// eslint-disable-next-line new-cap
export const SequenceBoxComponent = TLShapeUtil.Component<SequenceBoxShape, HTMLDivElement>(({ shape, events }, ref) => {
    const { title, steps } = shape;
    return (
        <HTMLContainer ref={ref} {...events} className="bg-blue-500">
            <h1 className="text-3xl">{title}</h1>
            <ul>
                {
                    steps.map((step, index) => <li key={`step-${index}`}>{step}</li>)
                }
            </ul>
        </HTMLContainer>
    );
});
