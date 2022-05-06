import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useTransition } from 'remix';
import { Ornament } from './ornament';

declare type UploadBoxProps = {
    mimeType?: string,
    name: string,
};

export default function UploadBox(props: UploadBoxProps) {
    const { mimeType = 'image/*', name } = props;

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

    const handleChange = useCallback(
        async(event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }

            setFileName(file.name);
        },
        []
    );

    const transition = useTransition();

    return (
        <div className="flex gap-2 items-center">
            <input
                ref={fileInputRef}
                className="opacity-0 w-0 h-0"
                type="file"
                name={name}
                accept={mimeType}
                onChange={handleChange}
            />
            <Ornament.Button
                decoration={transition.state === 'submitting' ? 'loading' : 'upload'}
                behavior={transition.state === 'submitting' ? 'spinning' : 'idle'}
                size="md"
                onClick={handleClick}
            />
            <p>
                {fileName || 'Choose a file...'}
            </p>
        </div>
    );
}
