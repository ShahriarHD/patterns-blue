import { ActionFunction, json, redirect } from 'remix';
import invariant from 'tiny-invariant';
import { addCanvasPageToHull } from '~/models/hulls.server';

export const action: ActionFunction = async({ request, params }) => {
    const hullId = parseInt(params.hullId || 'NaN');
    invariant(!isNaN(hullId), 'hullId required');

    const formData = await request.formData();

    const name = formData.get('new-canvas-name')?.toString() || 'New Canvas';

    try {
        const newPageId = await addCanvasPageToHull(hullId, name);

        return redirect(`/hull/${hullId}/canvas/${newPageId}`);
    } catch(error) {
        console.error(error);
        return json(error, 500);
    }
};
