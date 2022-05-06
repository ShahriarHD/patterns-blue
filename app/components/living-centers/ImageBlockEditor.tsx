import { Image } from '@prisma/client';
import { UpdateImageByIdArgs } from '~/models/image.server';
import { useProjectContext } from '~/routes/$slug';
import GoodOldForm, { useField } from '../GoodOldForm';
import UploadBox from '../UploadBox';

declare type ImageBlockEditorProps = Omit<Image, 'blockId'>;

export default function ImageBlockEditor(props: ImageBlockEditorProps) {
    const { uuid, url } = props;

    const { project } = useProjectContext();

    if (!project) {
        return null;
    }

    return (
        <GoodOldForm<UpdateImageByIdArgs>
            className="flex flex-col gap-4"
            action={`/${project.slug}/image/update`}
            method="post"
            encType="multipart/form-data"
            initialValues={{
                uuid,
                url
            }}
        >
            <UUIDField />
            <URLField />
            <button type="submit" className="button">Save</button>
        </GoodOldForm>
    );
}

function UUIDField() {
    const inputProps = useField<UpdateImageByIdArgs>('uuid');

    return <input {...inputProps} type="hidden" aria-hidden readOnly/>;
}

function URLField() {
    const inputProps = useField<UpdateImageByIdArgs>('url');

    return (
        <UploadBox name={inputProps.name} />
    );
}
