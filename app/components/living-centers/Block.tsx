import { Block, BlockSize, Color, Image, Text } from '@prisma/client';
import cx from 'classnames';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { Form, Link, useParams } from 'remix';
import { UpdateBlockByIdArgs } from '~/models/block.server';
import GoodOldForm, { useField, useIsSubmitting } from '../GoodOldForm';
import { Ornament } from '../ornament';
import ColorBlock from './ColorBlock';
import ImageBlock from './ImageBlock';
import TextBlock from './TextBlock';

export declare type BlockMode = 'view' | 'link-to-editing' | 'is-editing';
export declare type BlockProps = {
    block: Omit<Block, 'isDeleted'>,
    blockKind: {
        kind: 'color',
        color: Color
    } | {
        kind: 'text',
        text: Text
    } | {
        kind: 'image',
        image: Image
    } | {
        kind: 'create',
    }
    className?: string
    blockActiveState?: BlockMode,
}


export default function BlockComponent(props: PropsWithChildren<BlockProps>){
    const {
        block, blockKind,
        className: givenClassName,
        children,
        blockActiveState = 'view',
    } = props;

    const { width, height, index } = block;
    const className = cx(
        givenClassName,
        'block',
        `width-${width.toLowerCase()}`,
        `height-${height.toLowerCase()}`,
        {
            'ring-2 ring-blue-500 ring-offset-4 ring-offset-blue-100 dark:ring-offset-gray-900':
            blockActiveState === 'is-editing'
        }
    );

    const blockRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (blockActiveState === 'is-editing') {
            blockRef.current?.scrollIntoView({
                block: 'center',
                behavior: 'auto'
            });
        }
    }, [blockActiveState]);

    let livingBlock;
    switch (blockKind.kind) {
        case 'color': {
            livingBlock = <ColorBlock {...blockKind.color} mode={blockActiveState}/>;
            break;
        }
        case 'image': {
            livingBlock = <ImageBlock {...blockKind.image} mode={blockActiveState} />;
            break;
        }
        case 'text': {
            livingBlock = <TextBlock {...blockKind.text} mode={blockActiveState} />;
            break;
        }

        case 'create': {
            livingBlock = children;
            break;
        }
    }

    const { slug } = useParams();
    const blockResizeForm = (
        <GoodOldForm
            key={block.uuid}
            method="post"
            action="block/update"
            initialValues={{
                uuid: block.uuid,
                width: block.width,
                height: block.height,
            }}
            className="flex flex-row items-center gap-1"
        >
            <UUIDField />
            <WidthField />
            <HeightField />
            <SubmitButton />
            <input type="hidden" aria-hidden value={`/${slug}/edit/${block.index}`} name="redirectTo" />
        </GoodOldForm>
    );
    const blockDeleteForm = (
        <Form action="block/delete" method="post" reloadDocument className="flex items-center gap-2">
            <label className="text-xs border-l border-gray-500 pl-4 py-2 ml-4 font-light">Delete</label>
            <Ornament.Button type="submit" value={block.uuid} name="deleteId" decoration="error" size="sm"/>
        </Form>
    );
    let renderBlock;
    if (blockActiveState === 'link-to-editing') {
        renderBlock =
            <Link to={`edit/${index}`} prefetch="intent" state={{ scroll: false }} className="cursor-pointer">
                {livingBlock}
            </Link>;
    } else if (blockActiveState === 'view') {
        renderBlock = livingBlock;
    } else if (blockActiveState === 'is-editing') {
        renderBlock =
            <>
                {livingBlock}
                <div className="absolute -bottom-16 box z-menu w-full
                                flex items-center justify-between
                                p-2 rounded-full border border-gray-700 dark:border-gray-300">
                    {blockResizeForm}
                    {blockDeleteForm}
                </div>
            </>;
    }

    return (
        <div className={className} ref={blockRef}>
            {renderBlock}
        </div>
    );

}


function SubmitButton() {
    const isSubmitting = useIsSubmitting();
    return (
        <Ornament.Button
            decoration="check"
            size="sm"
            type="submit"
            disabled={isSubmitting}
        />
    );
}


function WidthField() {
    const inputProps = useField<UpdateBlockByIdArgs>('width');


    const options: Array<BlockSize> = ['SM', 'MD', 'LG'];
    return (
        <div className="pl-2 flex items-center gap-1">
            <label htmlFor="width-selector" className="text-xs font-light">Width</label>
            <select {...inputProps} id="width-selector" className="dropdown w-16">
                {options.map((value, index) =>
                    <option key={`width-option-${index}`} value={value}>
                        {value.toLowerCase()}
                    </option>)
                }
            </select>
        </div>
    );
}

function HeightField() {
    const inputProps = useField<UpdateBlockByIdArgs>('height');

    const options: Array<BlockSize> = ['SM', 'MD', 'LG', 'AUTO'];
    return (
        <div className="pl-2 flex items-center gap-1">
            <label htmlFor="height-selector" className="text-xs font-light">Height</label>
            <select {...inputProps} id="height-selector" className="dropdown w-16">
                {options.map((value, index) =>
                    <option key={`width-option-${index}`} value={value}>
                        {value.toLowerCase()}
                    </option>)
                }
            </select>
        </div>
    );
}

function UUIDField() {
    const inputProps = useField<UpdateBlockByIdArgs>('uuid');
    return <input {...inputProps} type="hidden" aria-hidden readOnly/>;
}
