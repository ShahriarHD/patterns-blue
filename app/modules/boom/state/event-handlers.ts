import { TLBounds, TLKeyboardEventHandler, TLPinchEventHandler, TLPointerEventHandler, TLWheelEventHandler } from "@tldraw/core"
import { BoomApi } from "./api";

declare const window: Window & { boomApi: BoomApi }

export const onHoverShape: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('HOVERED_SHAPE', info)
}

export const onUnhoverShape: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('UNHOVERED_SHAPE', info)
}

export const onPointShape: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('POINTED_SHAPE', info)
}

export const onPointCanvas: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('POINTED_CANVAS', info)
}

export const onPointBounds: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('POINTED_BOUNDS', info)
}

export const onPointHandle: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('POINTED_HANDLE', info)
}

export const onPointerDown: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('STARTED_POINTING', info)
}

export const onPointerUp: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('STOPPED_POINTING', info)
}

export const onPointerMove: TLPointerEventHandler = (info, e) => {
    window.boomApi.send('MOVED_POINTER', info)
}

export const onPan: TLWheelEventHandler = (info, e) => {
    window.boomApi.send('PANNED', info)
}

export const onPinchStart: TLPinchEventHandler = (info, e) => {
    window.boomApi.send('STARTED_PINCHING', info)
}

export const onPinch: TLPinchEventHandler = (info, e) => {
    window.boomApi.send('PINCHED', info)
}

export const onPinchEnd: TLPinchEventHandler = (info, e) => {
    window.boomApi.send('STOPPED_PINCHING', info)
}

export const onPointBoundsHandle: TLPinchEventHandler = (info, e) => {
    window.boomApi.send('POINTED_BOUNDS_HANDLE', info)
}

export const onBoundsChange = (bounds: TLBounds) => {
    window.boomApi.send('RESIZED', { bounds })
}

export const onKeyDown: TLKeyboardEventHandler = (key, info, e) => {
    switch (key) {
        case 'Alt':
        case 'Meta':
        case 'Control':
        case 'Shift': {
            window.boomApi.send('TOGGLED_MODIFIER', info)
            break
        }
        case 'Backspace': {
            window.boomApi.send('DELETED', info)
            break
        }
        case 'Escape': {
            window.boomApi.send('CANCELLED', info)
            break
        }
        case '0': {
            window.boomApi.send('ZOOMED_TO_ACTUAL', info)
            break
        }
        case '1': {
            window.boomApi.send('ZOOMED_TO_FIT', info)
            break
        }
        case '2': {
            window.boomApi.send('ZOOMED_TO_SELECTION', info)
            break
        }
        case '=': {
            if (info.metaKey || info.ctrlKey) {
                e.preventDefault()
                window.boomApi.send('ZOOMED_IN', info)
            }
            break
        }
        case '-': {
            if (info.metaKey || info.ctrlKey) {
                e.preventDefault()
                window.boomApi.send('ZOOMED_OUT', info)
            }
            break
        }
        case 's':
        case 'v': {
            window.boomApi.send('SELECTED_TOOL', { name: 'select' })
            break
        }
        case 'r':
        case 'b': {
            window.boomApi.send('SELECTED_TOOL', { name: 'box' })
            break
        }
        case 'd': {
            window.boomApi.send('SELECTED_TOOL', { name: 'pencil' })
            break
        }
        case 'e': {
            window.boomApi.send('SELECTED_TOOL', { name: 'eraser' })
            break
        }
        case 'a': {
            if (info.metaKey || info.ctrlKey) {
                window.boomApi.send('SELECTED_ALL')
                e.preventDefault()
            } else {
                window.boomApi.send('SELECTED_TOOL', { name: 'arrow' })
            }
            break
        }
        case 'z': {
            if (info.metaKey || info.ctrlKey) {
                if (info.shiftKey) {
                    window.boomApi.send('REDO')
                } else {
                    window.boomApi.send('UNDO')
                }
            }
            break
        }
    }
}

export const onKeyUp: TLKeyboardEventHandler = (key, info, e) => {
    switch (key) {
        case 'Alt':
        case 'Meta':
        case 'Control':
        case 'Shift': {
            window.boomApi.send('TOGGLED_MODIFIER', info)
            break
        }
    }
}
