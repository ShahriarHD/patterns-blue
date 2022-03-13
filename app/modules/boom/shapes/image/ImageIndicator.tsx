import { TLShapeUtil } from "@tldraw/core";
import { ImageShape } from "./ImageShape";

export const ImageIndicator = TLShapeUtil.Indicator<ImageShape>(({ shape }) => {
    const {
        size: [width, height],
    } = shape

    return (
        <rect x={0} y={0} rx={2} ry={2} width={Math.max(1, width)} height={Math.max(1, height)} />
    )
});