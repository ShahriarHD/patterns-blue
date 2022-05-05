import { Image } from '@prisma/client';
import { useCallback, useState } from 'react';
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
            initialValues={{
                uuid,
                url
            }}
        >
            <UUIDField />
            <URLField bucketName={`project-${project.uuid}`} />
            <button type="submit" className="button">Save</button>
        </GoodOldForm>
    );
}

function UUIDField() {
    const inputProps = useField<UpdateImageByIdArgs>('uuid');

    return <input {...inputProps} type="hidden" aria-hidden readOnly/>;
}

declare type URLFieldProps = {
    bucketName: string
}

function URLField({ bucketName }: URLFieldProps) {
    const inputProps = useField<UpdateImageByIdArgs>('url');

    const [newURL, setNewURL] = useState('');

    const uploadCallback = useCallback(
        (url: string | null) => {
            setNewURL(url || '');
        },
        []
    );


    return (
        <div>
            <UploadBox onUploadComplete={uploadCallback} bucketName={bucketName} />
            <input name={inputProps.name} value={newURL} readOnly type="hidden" />
        </div>
    );
}
