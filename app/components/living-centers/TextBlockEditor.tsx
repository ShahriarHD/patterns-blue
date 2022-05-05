import { Text } from '@prisma/client';
import { useCallback, useEffect, useRef } from 'react';
import { UpdateTextByIdArgs } from '~/models/text.server';
import { useProjectContext } from '~/routes/$slug';
import GoodOldForm, { useField } from '../GoodOldForm';

declare type TextBlockEditorProps = Omit<Text, 'blockId'>;

export default function TextBlockEditor(props: TextBlockEditorProps) {
    const { uuid, content } = props;

    const { project } = useProjectContext();

    if (!project) {
        return null;
    }

    return (
        <GoodOldForm<UpdateTextByIdArgs>
            className="flex flex-col gap-4"
            action={`/${project.slug}/text/update`}
            method="post"
            initialValues={{
                uuid,
                content
            }}
        >
            <UUIDField />
            <ContentField />
            <button type="submit" className="button">Save</button>
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
            className="text-input"
            onChange={adjustHeight}
            {...inputProps}
        />
    );
}
