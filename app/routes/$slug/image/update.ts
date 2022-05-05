import { ActionFunction, redirect } from 'remix';
import { validationError } from 'remix-validated-form';
import { updateImageById, updateImageByIdFormValidator } from '~/models/image.server';

export const action: ActionFunction = async({ params, request }) => {
    const formData = await request.formData();

    const { data, error } = await updateImageByIdFormValidator.validate(formData);

    if (error) {
        return validationError(error);
    }

    const updatedImage = await updateImageById(data);

    return redirect(`/${params.slug}/edit/${updatedImage.block.index}`);
};
