import { ChangeEventHandler, FocusEventHandler, useCallback, useState } from "react";
import { useDrawingAppApi } from "./Boom";
import { mutables } from "./infinite-canvas/state/mutables";


export default function Palette() {
    const [selectedColors, setSelectedColors] = useState(new Array(10).fill('#aaaaaa'));

    const boomApi = useDrawingAppApi();

    const handleColorChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            const color = event.target.value;
            boomApi?.send('SET_ACTIVE_COLOR', { color })
        },
        [],
    )

    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            const color = event.target.value;
            setSelectedColors([color, ...selectedColors].slice(0, 10));
        },
        [selectedColors, setSelectedColors]
    )

    return (
        <div className="p-4 absolute right-4 top-1/2 -translate-y-1/2 box grid gap-2 grid-cols-2 z-tools place-items-center">
            <div className="col-span-2 rounded-full w-12 h-12 border relative overflow-hidden">
                <input
                    type="color"
                    className="w-full h-full scale-150 rounded-full cursor-pointer"
                    value={mutables.activeColor}
                    onChange={handleColorChange}
                    onBlur={handleBlur}
                />
            </div>
            {
                selectedColors.map((color, index) => (
                    <ColorDrop color={color} key={`color-${index}`} />
                ))
            }
        </div>
    )
}

interface ColorDropProps {
    color: string,
}

function ColorDrop({ color }: ColorDropProps) {

    const boomApi = useDrawingAppApi();

    return (
        <div
            className="rounded-full border w-6 h-6 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => boomApi?.send('SET_ACTIVE_COLOR', { color })}
        />
    )
}