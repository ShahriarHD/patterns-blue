import { NodeOnDiskFile } from '@remix-run/node';
import { ActionFunction, redirect, unstable_parseMultipartFormData } from 'remix';
import invariant from 'tiny-invariant';
import { updateImageById } from '~/models/image.server';
import { uploadHandler } from '~/utils/uploadHandler';

export const action: ActionFunction = async({ params, request }) => {
    const formData = await unstable_parseMultipartFormData( request, uploadHandler);

    const uuid = formData.get('uuid')?.toString();
    const imageFile = formData.get('url') as NodeOnDiskFile | undefined;

    invariant(uuid, 'you need to provide a uuid');
    invariant(imageFile, 'you need to send a file');


    const updatedImage = await updateImageById({
        url: `/media/${imageFile.name}`,
        uuid
    });

    return redirect(`/${params.slug}/edit/${updatedImage.block.index}`);
};
