import cx from 'classnames';
import { ChangeEventHandler, FocusEventHandler, useCallback, useState } from 'react';
import { useDrawingAppApi } from './Boom';
import { mutables } from './infinite-canvas/state/mutables';
import PencilControls from './PencilControls';

export default function Palette() {
    const [selectedColors, setSelectedColors] = useState(new Array(10).fill('#aaaaaa'));

    const boomApi = useDrawingAppApi();

    const handleColorChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        event => {
            const color = event.target.value;
            boomApi?.send('SET_ACTIVE_COLOR', { color });
        },
        [],
    );

    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        event => {
            const color = event.target.value;
            setSelectedColors([color, ...selectedColors].slice(0, 10));
        },
        [selectedColors, setSelectedColors]
    );

    const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);
    const togglePaletteCollapseState = () => {
        setIsPaletteCollapsed(!isPaletteCollapsed);
    };

    const paletteClassName = cx(
        'p-4 absolute right-4 bottom-4 box grid grid-cols-6 gap-1 z-tools place-items-center rounded-2xl transition-all',
        {
            'translate-x-1/2 translate-y-1/2 h-32': isPaletteCollapsed
        },
    );

    return (
        <div className={paletteClassName}>
            <button
                className="w-3 h-3 rounded-full bg-red-400 absolute top-2 left-2 border-b border-black-alpha-500 shadow-sm"
                onClick={() => togglePaletteCollapseState()}
            />
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
            <div className="col-span-6">
                <PencilControls />
            </div>
        </div>
    );
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
    );
}
