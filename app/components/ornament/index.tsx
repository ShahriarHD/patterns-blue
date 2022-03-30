import cx from 'classnames';
import {
    RiCursorFill, RiEraserFill, RiMenu5Fill, RiPencilFill
} from 'react-icons/ri';
import { Link, LinkProps } from 'remix';
import add from './add-min.png';
import error from './error-min.png';
import loading from './loading-min.png';
import moon from './moon-min.png';
import rainbowFlower from './rainbow-flower-min.png';
import sun from './sun-min.png';
import moreLeaves from './more-leaves-2.png';

export declare type OrnamentSize = 'sm' | 'md' | 'lg';

const OrnamentIcons = {
    'menu': RiMenu5Fill,
    'cursor': RiCursorFill,
    'eraser': RiEraserFill,
    'pencil': RiPencilFill
}
type OrnamentImage = 'rainbow-flower' | 'moon' | 'sun' | 'loading' | 'error' | 'add';

export declare type OrnamentDecor = OrnamentImage | keyof typeof OrnamentIcons;

declare type OrnamentButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

declare type OrnamentLinkProps = LinkProps;

declare type OrnamentSharedProps = {
    decoration: OrnamentDecor,
    size?: OrnamentSize,
    behavior?: 'idle' | 'spinning',
    className?: string,
};

function getOrnamentAsset(type: OrnamentDecor) {
    let asset;
    switch (type) {
        case 'moon': { asset = moon; break; }
        case 'sun': { asset = sun; break; }
        case 'rainbow-flower': { asset = rainbowFlower; break; }
        case 'error': { asset = error; break; }
        case 'loading': { asset = loading; break; }
        case 'add': { asset = add; break; }
    }

    return asset;
}

export const Ornament = {
    Image({ type }: { type: OrnamentDecor }) {
        if (Object.keys(OrnamentIcons).includes(type)) {
            const Component = OrnamentIcons[type as (keyof typeof OrnamentIcons)];

            return <div className='w-4/5 h-4/5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-2
                                   ring-2 ring-offset-2 ring-blue-500 ring-offset-black-alpha-400 bg-blend-multiply'
                style={{
                    backgroundImage: `url(${moreLeaves})`,
                    backgroundColor: '#00C3FFee',
                }}
            >
                <Component className='drop-shadow absolute text-white-alpha-700 rounded-full w-full -translate-x-px' />
                <Component className='drop-shadow text-gray-900 rounded-full w-full' style={{ transform: 'scale(1.75)' }} />
            </div>
        } else {
            const asset = getOrnamentAsset(type);
            return <img src={asset} alt="" />

        }

    },
    Link(props: OrnamentSharedProps & OrnamentLinkProps) {
        const { decoration: type, size, behavior, className: givenClassName, ...rest } = props;
        const className = cx('ornament', behavior, size, givenClassName)
        return (
            <Link {...rest} className={className}>
                <Ornament.Image type={type} />
            </Link>
        )
    },
    Button(props: OrnamentSharedProps & OrnamentButtonProps) {
        const { decoration: type, size, behavior, className: givenClassName, ...rest } = props;

        const className = cx('ornament', behavior, size, givenClassName)
        return (
            <button type="button" className={className} {...rest}>
                <Ornament.Image type={type} />
            </button>
        )
    }
}
