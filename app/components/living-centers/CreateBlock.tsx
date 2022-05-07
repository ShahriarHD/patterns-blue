import { Ornament } from '../ornament';

declare type CreateBlockProps = {
    index: number,
    increaseIndex?: () => void,
    decreaseIndex?: () => void,
}

export default function CreateBlock(props: CreateBlockProps) {
    const { index, decreaseIndex, increaseIndex } = props;
    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
            <img
                src="/img/bg-gradient.jpg" alt=""
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="flex items-center justify-around bg-white-alpha-100 w-full h-full">
                <Ornament.Button
                    decoration="left" size="sm"
                    onClick={decreaseIndex}
                    disabled={!decreaseIndex}
                />
                <Ornament.Link to={`create-block?index=${index}`} size="lg" decoration="add" />
                <Ornament.Button
                    decoration="right" size="sm"
                    onClick={increaseIndex}
                    disabled={!increaseIndex}
                />
            </div>
        </div>
    );
}
