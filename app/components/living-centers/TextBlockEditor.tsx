import { Text } from '@prisma/client';
import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'remix';
import { UpdateTextByIdArgs } from '~/models/text.server';
import GoodOldForm, { useField } from '../GoodOldForm';
import { Ornament } from '../ornament';

declare type TextBlockEditorProps = Omit<Text, 'blockId'>;

export default function TextBlockEditor(props: TextBlockEditorProps) {
    const { uuid, content } = props;

    const slug = useParams().slug;
    return (
        <GoodOldForm<UpdateTextByIdArgs>
            className="flex box flex-col gap-4
                       w-full h-full p-4
                       absolute z-route30 top-0 left-0"
            action={`/${slug}/text/update`}
            reloadDocument
            method="post"
            initialValues={{
                uuid,
                content
            }}
        >
            <UUIDField />
            <ContentField />
            <button type="submit" className="button">Save</button>
            <details className="text-black-alpha-500 dark:text-white-alpha-500 text-center list-none">
                <summary className ="list-none flex items-baseline justify-center">
                    <Ornament.Button size="sm" decoration="question" className="pointer-events-none scale-75" />
                    <span>Markdown guide </span>
                </summary>
                # Huge text
                <br/>
                ## Large text
                <br/>
                ### Medium text
                <br/>

                normal text!
            </details>
        </GoodOldForm>
    );
}

function UUIDField() {
    const inputProps = useField<UpdateTextByIdArgs>('uuid');

    return <input {...inputProps} type="hidden" aria-hidden readOnly/>;
}

function ContentField() {
    const inputProps = useField<UpdateTextByIdArgs>('content');

    const textarea = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        () => {
            if (!textarea.current || !inputProps.defaultValue) {
                return;
            }

            const { height } = textarea.current.getBoundingClientRect();
            const { scrollHeight } = textarea.current;


            if (height < scrollHeight) {
                textarea.current.style.height = `${scrollHeight}px`;
                return;
            }
        },
        [textarea]
    );

    useEffect(adjustHeight, []);

    return (
        <textarea
            ref={textarea}
            className="text-input flex-grow"
            onChange={adjustHeight}
            {...inputProps}
        />
    );
}
