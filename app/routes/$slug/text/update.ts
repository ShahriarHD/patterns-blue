import { ActionFunction, redirect } from 'remix';
import { validationError } from 'remix-validated-form';
import { updateTextById, updateTextByIdFormValidator } from '~/models/text.server';

export const action: ActionFunction = async({ params, request }) => {
    const formData = await request.formData();

    const { data, error } = await updateTextByIdFormValidator.validate(formData);

    if (error) {
        return validationError(error);
    }

    const updatedText = await updateTextById(data);

    return redirect(`/${params.slug}/edit/${updatedText.block.index}`);
};
