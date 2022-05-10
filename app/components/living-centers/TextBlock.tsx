import { Text } from '@prisma/client';
import MarkdownRenderer from 'markdown-it/';
import { useMemo } from 'react';
import { BlockMode } from './Block';
import TextBlockEditor from './TextBlockEditor';

const markdownRenderer = new MarkdownRenderer('commonmark');

type TextBlockProps = Text & {
    mode: BlockMode
};

export default function TextBlock(props: TextBlockProps) {
    const { content, uuid, mode } = props;

    const rendered = useMemo(() => markdownRenderer.render(content), [content]);

    return(
        <>
            {
                content === ''
                && <h6 className="italic text-black-alpha-500 dark:bg-white-alpha-500 text-3xl">Click to start writing ...</h6>
            }
            <article className="prose-lg m-auto p-6 w-full h-full" dangerouslySetInnerHTML={{ __html: rendered }} />
            {mode === 'is-editing' && <TextBlockEditor content={content} uuid={uuid} />}
        </>
    );
}
