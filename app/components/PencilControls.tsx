import { ChangeEventHandler, useCallback } from "react";
import { useDrawingAppApi } from "./Boom";
import { BoomApi } from "./infinite-canvas/state/api";
import { mutables } from "./infinite-canvas/state/mutables";
declare const window: Window & { boomApi: BoomApi }

export default function PencilControls() {
    const { send } = useDrawingAppApi();
    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            const value = event.target.value;
            if (event.target.name === 'size') {
                send('SET_PENCIL_SIZE', { size: parseFloat(value) })
            } else if (event.target.name === 'opacity') {
                send('SET_PENCIL_OPACITY', { opacity: parseFloat(value) })
            }
        },
        [],
    )
    return (
        <div className='flex gap-4 p-4 z-tools accent-gray-900'
        >
            <label className="flex flex-col text-xs">
                Brush Size
                <input
                    name="size"
                    type="range"
                    min={1}
                    max={42}
                    value={mutables.pencilStrokeWidth}
                    onChange={handleChange}
                />
            </label>
            <label className="flex flex-col text-xs">
                Brush Opacity
                <input
                    name="opacity"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01} value={mutables.pencilOpacity}
                    onChange={handleChange}
                />
            </label>
        </div>
    )
}