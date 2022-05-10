import { Color } from '@prisma/client';
import cx from 'classnames';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useParams } from 'remix';
import { UpdateColorByIdArgs } from '~/models/color.server';
import GoodOldForm, { useField, useValue } from '../GoodOldForm';
import { Ornament } from '../ornament';
import { BlockMode } from './Block';

type ColorBlockProps = Color & {
    mode: BlockMode
};

export default function ColorBlock(props: ColorBlockProps) {
    const { hex, name, uuid, mode } = props;

    const className = cx('w-full h-full transition-all');
    const slug = useParams().slug;

    return(
        <GoodOldForm<UpdateColorByIdArgs>
            className={className}
            action={`/${slug}/color/update`}
            method="post"
            reloadDocument
            initialValues={{
                uuid,
                hex,
                name,
            }}
        >
            <fieldset disabled={mode !== 'is-editing'} className="w-full h-full flex flex-col items-stretch">
                {
                    mode === 'is-editing'
                    &&
                    <Ornament.Button
                        decoration="upload"
                        size="md"
                        type="submit"
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                }
                <UUIDField />
                <ColorPicker />
                <NameField />
            </fieldset>
        </GoodOldForm>
    );
}


function UUIDField() {
    const inputProps = useField<UpdateColorByIdArgs>('uuid');
    return <input {...inputProps} type="hidden" aria-hidden readOnly/>;
}

function ColorPicker() {
    const inputProps = useField<UpdateColorByIdArgs>('hex');

    const colorInputRef = useRef<HTMLInputElement>(null);
    const [selectedColor, setSelectedColor] = useState(inputProps.defaultValue);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value) {
            setSelectedColor(value);
        }
    }, [setSelectedColor]);

    const handleClick = useCallback(() => {
        if (colorInputRef.current) {
            colorInputRef.current.click();
        }
    }, [colorInputRef.current]);


    return (
        <>
            <input
                type="color"
                {...inputProps}
                className="w-0 h-0 opacity-0"
                onChange={handleChange}
                ref={colorInputRef}
            />
            <div
                className="w-full flex-grow"
                style={{
                    backgroundColor: selectedColor
                }}
                onClick={handleClick}
            />
        </>
    );
}

function NameField() {
    const inputProps = useField<UpdateColorByIdArgs>('name');
    const hex = useValue<UpdateColorByIdArgs>('hex');

    return (
        <input
            className="w-full h-16 text-lg px-8 py-12 border-2 text-center"
            style={{
                color: hex,
                borderColor: hex
            }}
            aria-label="color name"
            placeholder="Color name..."
            {...inputProps}
        />
    );
}
