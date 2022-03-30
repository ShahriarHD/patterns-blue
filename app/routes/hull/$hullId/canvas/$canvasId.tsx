import { useCallback, useEffect } from "react";
import { Params } from "react-router";
import { ActionFunction, Form, json, LoaderFunction, useActionData, useLoaderData, useSubmit, useTransition } from "remix";
import invariant from "tiny-invariant";
import { ZodError } from "zod";
import { useDrawingAppApi } from "~/components/Boom";
import { DrawingAppData, DrawingAppDataSchema, INITIAL_PAGE_STATE } from "~/components/infinite-canvas/state/constants";
import { makeHistory } from "~/components/infinite-canvas/state/history";
import { mutables } from "~/components/infinite-canvas/state/mutables";
import { Toolbar } from "~/components/Toolbar";
import { getCanvasPageOfHull, updateCanvasPageOfHull } from "~/models/hulls.server";

function getPageParams(params: Params<string>) {
    invariant(params.canvasId, 'expected canvas id');
    invariant(params.hullId, 'expected hull id');

    const { hullId, canvasId } = params;
    const hullIdInt = parseInt(hullId)

    return {
        hullId: hullIdInt,
        canvasId
    }
}

export const action: ActionFunction = async ({ request, params }) => {

    const formData = await request.formData()
    const data = JSON.parse(formData.get('data')?.toString() || '');

    let validatedPage: DrawingAppData | undefined = undefined;

    try {
        validatedPage = await DrawingAppDataSchema.parseAsync(data);

        // reset data
        validatedPage.pageState = INITIAL_PAGE_STATE;
        validatedPage.performanceMode = undefined;
        validatedPage.overlays = { snapLines: [] }

        console.log(validatedPage);
    } catch (error) {
        if (error instanceof ZodError) {
            console.error(error)
            throw json({ message: 'failed to parse submitted data' }, 400);
        }
    }

    const { canvasId, hullId } = getPageParams(params);

    if (validatedPage) {
        try {
            await updateCanvasPageOfHull(hullId, canvasId, validatedPage);
        } catch (error) {
            throw json({ message: 'could not save data to database' }, 500);
        }
    }

    return {
        success: true
    };
}

declare type CanvasLoaderData = {
    drawingAppData: DrawingAppData
}

export const loader: LoaderFunction = async ({ params }): Promise<CanvasLoaderData> => {
    invariant(params.canvasId, 'expected canvas id');
    invariant(params.hullId, 'expected hull id');

    const { hullId, canvasId } = getPageParams(params);

    const drawingAppData = await getCanvasPageOfHull(hullId, canvasId);
    if (drawingAppData) {
        return {
            drawingAppData
        }
    } else {
        throw json({ message: 'page not found ' }, 404);
    }
}

export default function canvasId() {
    const { drawingAppData } = useLoaderData<CanvasLoaderData>();
    const { loadDocument, state } = useDrawingAppApi();
    const transition = useTransition()


    const submit = useSubmit();

    useEffect(() => {
        let data = drawingAppData; // this is  coming from the server
        const maybeUnSavedData = localStorage.getItem(drawingAppData.id);

        if (maybeUnSavedData) { // see if we have unpublished changes locally
            const parsedSavedData = DrawingAppDataSchema.safeParse(JSON.parse(maybeUnSavedData))
            if (parsedSavedData.success) {
                data = parsedSavedData.data;
            }
        }

        loadDocument({
            ...data,
            pageState: INITIAL_PAGE_STATE
        });


    }, [drawingAppData.id]);

    const saveCurrentDrawing = useCallback(() => {
        submit({ data: JSON.stringify(state) }, { method: 'put', replace: false });
        mutables.history.reset(state);
    }, [submit, state])

    return (
        <>
            <button
                className="button z-route40 absolute top-4 right-4"
                onClick={saveCurrentDrawing}
                type="button"
                disabled={mutables.history.depth() === 0}
            >
                {transition.state === 'submitting' ? 'Saving ...' : 'Save'}
            </button>
            <Toolbar />
        </>
    )
};
