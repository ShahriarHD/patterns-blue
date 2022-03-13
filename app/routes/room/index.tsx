import { Renderer } from "@tldraw/core";
import { useEffect, useState } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import Palette from "~/modules/boom/components/Palette";
import PencilControls from "~/modules/boom/components/PencilControls";
import { Toolbar } from "~/modules/boom/components/Toolbar";
import { shapeUtils } from "~/modules/boom/shapes";
import { BoomApi } from "~/modules/boom/state/api";
import { DrawingAppData, INITIAL_DATA } from "~/modules/boom/state/constants";
import * as eventHandlers from '~/modules/boom/state/event-handlers';
import { useStateMachine } from "~/modules/boom/state/useStateMachine";


declare type RoomLoaderData = DrawingAppData

export const loader: LoaderFunction = (): RoomLoaderData => {
    return INITIAL_DATA;
}

function noOp() { }

declare const window: Window & { boomApi: BoomApi }

export default function Room() {

    if (typeof window === "undefined" || !(window?.document)) {
        return null;
    }

    const data = useLoaderData<RoomLoaderData>();
    const machine = useStateMachine(data);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const api = new BoomApi(machine)
        window.boomApi = api;
        setIsReady(true);
    }, [setIsReady]);

    const hideBounds = machine.isInAny('transformingSelection', 'translating', 'creating')

    const firstShapeId = machine.data.pageState.selectedIds[0]
    const firstShape = firstShapeId ? machine.data.page.shapes[firstShapeId] : null
    const hideResizeHandles = firstShape
        ? machine.data.pageState.selectedIds.length === 1 &&
        shapeUtils[firstShape.type].hideResizeHandles
        : false

    return (
        <div className="w-full h-full rounded-3xl shadow-2xl relative overflow-hidden bg-gray-100 dark:bg-gray-300 text-center">
            {
                typeof window !== "undefined" && window?.document && isReady &&
                <>
                    <Renderer
                        shapeUtils={shapeUtils}
                        page={window.boomApi?.page}
                        pageState={window.boomApi?.pageState}
                        assets={window.boomApi?.assets}
                        hideBounds={hideBounds}
                        hideHandles={hideBounds}
                        hideResizeHandles={hideResizeHandles}
                        hideIndicators={hideBounds}
                        hideBindingHandles={true}
                        {...eventHandlers}
                    />
                    <Toolbar />
                    <Palette />
                    <PencilControls />
                </>
            }
        </div>
    )
}