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
        <div className='flex gap-4 p-4 justify-self-center
                        z-tools absolute left-2 top-1/2 h-64 accent-gray-900'
        >
            <input
                className="-rotate-90 absolute left-1/2 top-0 origin-left"
                name="size"
                type="range"
                min={2}
                max={25}
                value={mutables.pencilStrokeWidth}
                onChange={handleChange}
            />
            <input
                className="-rotate-90 absolute left-1/2 bottom-0 origin-left"
                name="opacity"
                type="range"
                min={0}
                max={1}
                step={0.01} value={mutables.pencilOpacity}
                onChange={handleChange}
            />
        </div>
    )
}