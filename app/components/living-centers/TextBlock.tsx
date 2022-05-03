import Block, { BlockPropsWithoutChildren } from './Block';

type TextBlockProps = BlockPropsWithoutChildren

export default function TextBlock(props: TextBlockProps) {
    const { ...block } = props;

    return(
        <Block
            {...block}
        >
            <article className="prose-lg m-auto p-6">
                <h1>Text Block</h1>
                <h2>Text Block</h2>
                <h3>Text Block</h3>
                <h4>Text Block</h4>
                <p>
                    ...the character of the computer environment of the future needs to become more childish,
                    and more human, if it is to help human beings to genuinely extract the best of themselves...
                    this change may well affect activities which are apparently technical, not only those that one
                    broadly classifies as creative.
                </p>
            </article>
        </Block>
    );
}
