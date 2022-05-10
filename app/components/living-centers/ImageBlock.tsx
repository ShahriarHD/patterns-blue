import { Image } from '@prisma/client';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useParams, useTransition } from 'remix';
import { UpdateImageByIdArgs } from '~/models/image.server';
import GoodOldForm, { useField } from '../GoodOldForm';
import { Ornament } from '../ornament';
import { BlockMode } from './Block';

type ImageBlockProps = Image & {
    mode: BlockMode
};

export default function ImageBlock(props: ImageBlockProps) {
    const { uuid, url, mode } = props;

    const slug = useParams().slug;
    return (
        <GoodOldForm<UpdateImageByIdArgs>
            className="flex flex-col gap-4 w-full h-full"
            action={`/${slug}/image/update`}
            method="post"
            encType="multipart/form-data"
            reloadDocument
            initialValues={{
                uuid,
                url
            }}
        >
            <UUIDField />
            <URLField isEditing={mode === 'is-editing'} />
        </GoodOldForm>
    );
}


function UUIDField() {
    const inputProps = useField<UpdateImageByIdArgs>('uuid');

    return <input {...inputProps} type="hidden" aria-hidden readOnly/>;
}

function URLField({ isEditing }: {isEditing: boolean}) {
    const inputProps = useField<UpdateImageByIdArgs>('url');

    const [fileName, setFileName] = useState('');
    const [url, setUrl] = useState(inputProps.defaultValue);

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
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }

            const localUrl = URL.createObjectURL(file);
            setUrl(localUrl);
            setFileName(file.name);
        },
        [setUrl, setFileName]
    );

    const transition = useTransition();
    return (
        <div className="w-full h-full">
            <input
                ref={fileInputRef}
                className="opacity-0 w-0 h-0 absolute"
                type="file"
                name={inputProps.name}
                accept="image/*"
                onChange={handleChange}
                required
            />
            {
                isEditing
                    &&
                    <div className="flex gap-2 items-center
                                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                    box p-6 rounded-md">
                        <Ornament.Button
                            decoration={'upload'}
                            behavior={transition.state === 'submitting' ? 'heart-beat' : 'idle'}
                            size="md"
                            onClick={handleClick}
                        />
                        <p>
                            {fileName || 'Choose a file...'}
                        </p>
                        {
                            fileName &&
                            <button type="submit" className="button">Save</button>
                        }
                    </div>
            }
            <img src={url || '/img/button-bg/checkerboard-cross.png'}
                alt="" className="w-full h-full object-contain bg-white-alpha-400 dark:bg-black-alpha-400"
                style={!url ? { objectFit: 'cover' } : undefined}/>
        </div>
    );
}
