import { Color } from '@prisma/client';

declare type ColorBlockEditorProps = Omit<Color, 'blockId'>

export default function ColorBlockEditor(props: ColorBlockEditorProps) {
    const { hex, meta, name } = props;

    return (
        <ol>
            <li>Name: {name}</li>
            <li>Hex: {hex}</li>
            <li>Meta: {meta}</li>
        </ol>
    );
}
