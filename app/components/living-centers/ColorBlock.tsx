import { Color } from '@prisma/client';

type ColorBlockProps = Pick<Color, 'name' | 'hex'>;

export default function ColorBlock(props: ColorBlockProps) {
    const { hex, name } = props;

    return(
        <div
            className="w-full h-full p-4 text-3xl text-center"
            style={{ backgroundColor: hex, color: hex }}
        >
            <span className="drop-shadow-2xl filter contrast-200">{name}</span>
        </div>
    );
}
