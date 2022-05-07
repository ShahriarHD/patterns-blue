import { Color } from '@prisma/client';
import cx from 'classnames';

type ColorBlockProps = Color;

export default function ColorBlock(props: ColorBlockProps) {
    const { hex, name, meta } = props;

    const className = cx('w-full h-full p-4 text-3xl text-center transition-all', {
        'scale-90': meta === 'GLOWING'
    });
    return(
        <>
            <div
                className={className}
                style={{ backgroundColor: hex, color: hex, transformOrigin: 'bottom' }}
            >
                <span className="drop-shadow-2xl filter contrast-200">{name}</span>
            </div>
            {
                meta === 'GLOWING' &&
                <div
                    className="absolute h-full top-0 left-0 right-0 rounded-6xl z-behind blur-lg opacity-70 dark:opacity-50
                        animate-pulse"
                    style={{ backgroundColor: `${hex}` }}
                >
                </div>
            }
        </>
    );
}
