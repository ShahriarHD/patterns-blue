import { TLBounds, TLKeyboardEventHandler, TLPinchEventHandler, TLPointerEventHandler, TLWheelEventHandler } from "@tldraw/core"
import { BoomApi } from "./api";

export default function (boomApi: BoomApi) {

    const onHoverShape: TLPointerEventHandler = (info, e) => {
        boomApi.send('HOVERED_SHAPE', info)
    }

    const onUnhoverShape: TLPointerEventHandler = (info, e) => {
        boomApi.send('UNHOVERED_SHAPE', info)
    }

    const onPointShape: TLPointerEventHandler = (info, e) => {
        boomApi.send('POINTED_SHAPE', info)
    }

    const onPointCanvas: TLPointerEventHandler = (info, e) => {
        boomApi.send('POINTED_CANVAS', info)
    }

    const onPointBounds: TLPointerEventHandler = (info, e) => {
        boomApi.send('POINTED_BOUNDS', info)
    }

    const onPointHandle: TLPointerEventHandler = (info, e) => {
        boomApi.send('POINTED_HANDLE', info)
    }

    const onPointerDown: TLPointerEventHandler = (info, e) => {
        boomApi.send('STARTED_POINTING', info)
    }

    const onPointerUp: TLPointerEventHandler = (info, e) => {
        boomApi.send('STOPPED_POINTING', info)
    }

    const onPointerMove: TLPointerEventHandler = (info, e) => {
        boomApi.send('MOVED_POINTER', info)
    }

    const onPan: TLWheelEventHandler = (info, e) => {
        boomApi.send('PANNED', info)
    }

    const onPinchStart: TLPinchEventHandler = (info, e) => {
        boomApi.send('STARTED_PINCHING', info)
    }

    const onPinch: TLPinchEventHandler = (info, e) => {
        boomApi.send('PINCHED', info)
    }

    const onPinchEnd: TLPinchEventHandler = (info, e) => {
        boomApi.send('STOPPED_PINCHING', info)
    }

    const onPointBoundsHandle: TLPinchEventHandler = (info, e) => {
        boomApi.send('POINTED_BOUNDS_HANDLE', info)
    }

    const onBoundsChange = (bounds: TLBounds) => {
        boomApi.send('RESIZED', { bounds })
    }

    const onKeyDown: TLKeyboardEventHandler = (key, info, e) => {
        switch (key) {
            case 'Alt':
            case 'Meta':
            case 'Control':
            case 'Shift': {
                boomApi.send('TOGGLED_MODIFIER', info)
                break
            }
            case 'Backspace': {
                boomApi.send('DELETED', info)
                break
            }
            case 'Escape': {
                boomApi.send('CANCELLED', info)
                break
            }
            case '0': {
                boomApi.send('ZOOMED_TO_ACTUAL', info)
                break
            }
            case '1': {
                boomApi.send('ZOOMED_TO_FIT', info)
                break
            }
            case '2': {
                boomApi.send('ZOOMED_TO_SELECTION', info)
                break
            }
            case '=': {
                if (info.metaKey || info.ctrlKey) {
                    e.preventDefault()
                    boomApi.send('ZOOMED_IN', info)
                }
                break
            }
            case '-': {
                if (info.metaKey || info.ctrlKey) {
                    e.preventDefault()
                    boomApi.send('ZOOMED_OUT', info)
                }
                break
            }
            case 's':
            case 'v': {
                boomApi.send('SELECTED_TOOL', { name: 'select' })
                break
            }
            case 'r':
            case 'b': {
                boomApi.send('SELECTED_TOOL', { name: 'box' })
                break
            }
            case 'd': {
                boomApi.send('SELECTED_TOOL', { name: 'pencil' })
                break
            }
            case 'e': {
                boomApi.send('SELECTED_TOOL', { name: 'eraser' })
                break
            }
            case 'a': {
                if (info.metaKey || info.ctrlKey) {
                    boomApi.send('SELECTED_ALL')
                    e.preventDefault()
                } else {
                    boomApi.send('SELECTED_TOOL', { name: 'arrow' })
                }
                break
            }
            case 'z': {
                if (info.metaKey || info.ctrlKey) {
                    if (info.shiftKey) {
                        boomApi.send('REDO')
                    } else {
                        boomApi.send('UNDO')
                    }
                }
                break
            }
        }
    }

    const onKeyUp: TLKeyboardEventHandler = (key, info, e) => {
        switch (key) {
            case 'Alt':
            case 'Meta':
            case 'Control':
            case 'Shift': {
                boomApi.send('TOGGLED_MODIFIER', info)
                break
            }
        }
    }

    return {
        onBoundsChange,
        onHoverShape,
        onKeyDown,
        onKeyUp,
        onPan,
        onPinch,
        onPinchEnd,
        onPinchStart,
        onPointBounds,
        onPointBoundsHandle,
        onPointCanvas,
        onPointHandle,
        onPointShape,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onUnhoverShape
    }
}
