import { Text } from '@prisma/client';
import MarkdownRenderer from 'markdown-it/';
import { useMemo } from 'react';

const markdownRenderer = new MarkdownRenderer('commonmark');

type TextBlockProps = Pick<Text, 'content'>;

export default function TextBlock(props: TextBlockProps) {
    const { content } = props;

    const rendered = useMemo(() => markdownRenderer.render(content), [content]);

    return(
        <article className="prose-lg m-auto p-6" dangerouslySetInnerHTML={{ __html: rendered }} />
    );
}
