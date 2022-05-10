import { ActionFunction, redirect } from 'remix';
import { validationError } from 'remix-validated-form';
import invariant from 'tiny-invariant';
import { updateBlockById, updateBlockFormValidator } from '~/models/block.server';

export const action: ActionFunction = async({ request, }) => {
    const formData = await request.formData();
    const redirectTo = formData.get('redirectTo')?.toString();

    invariant(redirectTo, 'need to know where to go after this, redirectTo missing.');

    formData.delete('redirectTo');

    const { error, data } = await updateBlockFormValidator.validate(formData);
    if (error) {
        return validationError(error);
    }

    await updateBlockById(data);

    return redirect(redirectTo);
};
