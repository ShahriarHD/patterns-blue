import { Renderer } from "@tldraw/core";
import { shapeUtils } from "~/components/infinite-canvas/shapes";
import eventHandlers from '~/components/infinite-canvas/state/event-handlers';
import { useDrawingAppApi } from "../Boom";


export default function InfiniteCanvas() {
    const boomApi = useDrawingAppApi();

    const { page, pageState, machine, assets, log, } = boomApi;

    const hideBounds = machine.isInAny('transformingSelection', 'translating', 'creating')

    const firstShapeId = machine.data.pageState.selectedIds[0]
    const firstShape = firstShapeId ? machine.data.page.shapes[firstShapeId] : null
    const hideResizeHandles = firstShape
        ? machine.data.pageState.selectedIds.length === 1 &&
        shapeUtils[firstShape.type].hideResizeHandles
        : false

    return (
        <div className="w-full h-full relative bg-gray-100 dark:bg-gray-500">
            {
                process.env.NODE_ENV === 'development' &&
                <div className="w-full absolute z-route20 top-0" style={{zIndex: 101}}>
                    {
                        machine.active.map((name) => {
                            const state = name.split('.')
                            return state[state.length - 1]
                        })
                            .join(' - ')
                    }
                </div>
            }
            <Renderer
                shapeUtils={shapeUtils}
                page={page}
                pageState={pageState}
                assets={assets}
                {...eventHandlers(boomApi)}
                hideBounds={hideBounds}
                hideHandles={hideBounds}
                hideResizeHandles={hideResizeHandles}
                hideIndicators={hideBounds}
                hideBindingHandles={true}
            />

        </div>
    )
}