import { ActionFunction, redirect } from 'remix';
import invariant from 'tiny-invariant';
import { deleteBlockById } from '~/models/block.server';

export const action: ActionFunction = async({ request, params }) => {
    const formData = await request.formData();

    const deleteId = formData.get('deleteId')?.toString();
    console.log(deleteId);

    invariant(deleteId, 'we need a something to delete, deleteId required');

    await deleteBlockById({ uuid: deleteId });

    return redirect(`/${params.slug}/edit`);
};
