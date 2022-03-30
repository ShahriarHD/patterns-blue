import { ActionFunction, redirect } from "remix";
import invariant from "tiny-invariant";
import { deleteHullById } from "~/models/hulls.server";

export const action: ActionFunction = async ({ request }) => {
    const form = await request.clone().formData();

    const deletingId = form.get('delete-id')?.toString();

    invariant(deletingId, 'did not send any deleting id');
    await deleteHullById(parseInt(deletingId))

    return redirect('/hull')
}