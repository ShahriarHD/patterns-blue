import cx from 'classnames';
import { useMatches } from 'remix';
import { Ornament } from '../ornament';
declare type CreateBlockProps = {
    index: number,
    increaseIndex?: () => void,
    decreaseIndex?: () => void,
}

export default function CreateBlock(props: CreateBlockProps) {
    const { decreaseIndex, increaseIndex } = props;
    const matches = useMatches();

    const isInsideCreateBlockPage = Boolean(matches.find(({ pathname }) => pathname.includes('create-block')));
    const className = cx('w-full transition-all', {
        'h-full': !isInsideCreateBlockPage,
        'h-1/4': isInsideCreateBlockPage
    });


    return (
        <div className={className}>
            <img
                src="/img/bg-gradient.jpg" alt=""
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-behind
                           shadow-2xl shadow-black-alpha-300 dark:shadow-blue-800"
            />
            <div className="flex items-center justify-around w-full h-full">
                <Ornament.Button
                    decoration="left" size="sm"
                    onClick={decreaseIndex}
                    disabled={!decreaseIndex}
                />
                <Ornament.Link
                    to={`create-block`}
                    size="lg"
                    decoration="add"
                    state={{ scroll: false }}
                />
                <Ornament.Button
                    decoration="right" size="sm"
                    onClick={increaseIndex}
                    disabled={!increaseIndex}
                />
            </div>
        </div>
    );
}
