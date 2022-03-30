import { HTMLContainer, TLShapeUtil } from "@tldraw/core";
import { useLayoutEffect, useRef } from "react";
import { ImageAsset, ImageShape } from "./ImageShape";

export const ImageComponent = TLShapeUtil.Component<ImageShape, HTMLDivElement>(
    ({ shape, asset = { src: '' }, isGhost, events }, ref) => {
        const { size } = shape;

        const ImageRef = useRef<HTMLImageElement>(null)
        const WrapperRef = useRef<HTMLDivElement>(null)

        useLayoutEffect(() => {
            const wrapper = WrapperRef.current
            if (!wrapper) return
            const [width, height] = size
            wrapper.style.width = `${width}px`
            wrapper.style.height = `${height}px`
        }, [size]);

        return (
            <HTMLContainer ref={ref} {...events}>
                <div
                    className="relative  w-full h-full overflow-hidden rounded-md"
                    ref={WrapperRef}
                    style={{
                        opacity: isGhost ? 0.7 : 1
                    }}
                >
                    <img
                        id={`${shape.id}_image`}
                        ref={ImageRef}
                        src={(asset as ImageAsset).src}
                        alt="an image on board"
                        draggable={false}
                        className="absolute top-0 left-0 w-full h-full max-w-full min-w-full
                        pointer-events-none object-cover select-none
                        "
                    />
                </div>
            </HTMLContainer>
        )
    }
)