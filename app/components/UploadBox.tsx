import { nanoid } from 'nanoid';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { supabaseClient } from '~/services/supabase/supabase.client';
import { Ornament } from './ornament';

declare type UploadBoxProps = {
    mimeType?: string,
    bucketName?: string,
    onUploadComplete(url: string | null): void,
};

export default function UploadBox(props: UploadBoxProps) {
    const { mimeType = 'image/*', bucketName = 'public', onUploadComplete } = props;

    const [isUploading, setIsUploading] = useState(false);

    const [fileName, setFileName] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(
        () => {
            if (!fileInputRef.current) {
                return;
            }

            fileInputRef.current.click();
        },
        [fileInputRef]
    );

    const handleUpload = useCallback(
        async(event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) {
                return;
            }

            const [name, extension] = file.name.split('.');
            const id = nanoid();

            const fileName = `${name}-${id}.${extension}`;

            setFileName(file.name);

            setIsUploading(true);
            const { error: uploadError } = await supabaseClient.storage.from(bucketName).upload(fileName, file);
            setIsUploading(false);

            if (uploadError) {
                console.error(uploadError);
                onUploadComplete(null);

                return;
            }

            const publicURL = await supabaseClient.storage.from(bucketName).getPublicUrl(fileName).publicURL;
            onUploadComplete(publicURL);
        },
        []
    );

    return (
        <div className="flex gap-2 items-center">
            <input
                ref={fileInputRef}
                className="opacity-0 w-0 h-0"
                type="file"
                name=""
                id=""
                accept={mimeType}
                onChange={handleUpload}
            />
            <Ornament.Button
                decoration={isUploading ? 'loading' : 'image-add'}
                behavior={isUploading ? 'spinning' : 'idle'}
                size="md"
                onClick={handleClick}
            />
            <p>
                {fileName || 'Choose a file...'}
            </p>
        </div>
    );
}
