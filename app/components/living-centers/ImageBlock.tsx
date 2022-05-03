import Block, { BlockPropsWithoutChildren } from './Block';

type ImageBlockProps = BlockPropsWithoutChildren

export default function ImageBlock(props: ImageBlockProps) {
    const { ...block } = props;

    const randomCategories = ['nature', 'people', 'city', 'life', 'work', 'patterns'];
    randomCategories.sort(() => (Math.random() > 0.5 ? 1 : -1));
    return(
        <Block
            {...block}
            as="figure"
            className="pb-8"
        >
            <img
                src={`https://source.unsplash.com/random/?${randomCategories.join(',')}`}
                alt="a random photo"
                className={`w-full h-full ${block.width === 'COVER' ? 'object-cover' : 'object-contain'}`}
            />
            <figcaption className="text-center text-xs p-2">
                <p>
                    random photo from the whole world
                </p>
            </figcaption>
        </Block>
    );
}
