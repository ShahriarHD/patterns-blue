import { Image } from '@prisma/client';

type ImageBlockProps = Pick<Image, 'url'> & {
    isFullWidth?: boolean
};

export default function ImageBlock(props: ImageBlockProps) {
    const { url, isFullWidth } = props;

    return(
        <img
            src={url}
            alt="a random photo"
            className={`w-full h-full ${isFullWidth ? 'object-cover' : 'object-contain'}`}
        />
    );
}
