import cx from 'classnames';
import {
    RiAlignBottom, RiAlignTop, RiAlignVertically, RiAncientPavilionFill, RiCheckFill, RiCursorFill, RiEraserFill,
    RiImageAddFill, RiLogoutCircleLine, RiMenu5Fill, RiPencilFill
} from 'react-icons/ri';
import { Link, LinkProps, Outlet, useLocation, useResolvedPath } from 'remix';
import add from './add-min.png';
import error from './error-min.png';
import loading from './loading-min.png';
import moon from './moon-min.png';
import rainbowFlower from './rainbow-flower-min.png';
import sun from './sun-min.png';
import cactus from './cactus-min.png';
import mandala from './mandala-min.png';
import upload from './upload-min.png';
import template from './template-min.png';

export declare type OrnamentSize = 'sm' | 'md' | 'lg';

const OrnamentIcons = {
    menu: RiMenu5Fill,
    cursor: RiCursorFill,
    eraser: RiEraserFill,
    pencil: RiPencilFill,
    'image-add': RiImageAddFill,
    home: RiAncientPavilionFill,
    logout: RiLogoutCircleLine,
    check: RiCheckFill,
    'align-start': RiAlignTop,
    'align-center': RiAlignVertically,
    'align-end': RiAlignBottom
};
type OrnamentImage = 'rainbow-flower' | 'moon' | 'sun' | 'loading' | 'error' | 'add' | 'cactus' | 'mandala' | 'upload';

export declare type OrnamentDecor = OrnamentImage | keyof typeof OrnamentIcons;

declare type OrnamentButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

declare type OrnamentLinkProps = LinkProps & {
    shouldRenderOutlet?: boolean
};

declare type OrnamentSharedProps = {
    decoration: OrnamentDecor,
    size?: OrnamentSize,
    behavior?: 'idle' | 'spinning',
    className?: string,
};

function getOrnamentAsset(type: OrnamentDecor) {
    let asset;
    switch (type) {
        case 'moon': {
            asset = moon;
            break;
        }
        case 'sun': {
            asset = sun;
            break;
        }
        case 'rainbow-flower': {
            asset = rainbowFlower;
            break;
        }
        case 'error': {
            asset = error;
            break;
        }
        case 'loading': {
            asset = loading;
            break;
        }
        case 'add': {
            asset = add;
            break;
        }
        case 'cactus': {
            asset = cactus;
            break;
        }
        case 'mandala': {
            asset = mandala;
            break;
        }
        case 'upload': {
            asset = upload;
            break;
        }
    }

    return asset;
}

export const Ornament = {
    Image({ type }: { type: OrnamentDecor }) {
        if (Object.keys(OrnamentIcons).includes(type)) {
            const Component = OrnamentIcons[type as (keyof typeof OrnamentIcons)];

            return (
                <div className="w-full h-full flex items-center rounded-full justify-center bg-contain"
                    style={{
                        backgroundImage: `url(${template})`
                    }}
                >
                    <Component
                        className="drop-shadow-md text-white w-full scale-125"
                    />
                </div>
            );
        } else {
            const asset = getOrnamentAsset(type);
            return <img src={asset} alt="" />;

        }

    },
    Link(props: OrnamentSharedProps & OrnamentLinkProps) {
        const { decoration: type, size, behavior,
            shouldRenderOutlet,
            className: givenClassName, ...rest } = props;
        const path = useResolvedPath(rest.to);
        const location = useLocation();
        const renderOutlet = shouldRenderOutlet && path.pathname === location.pathname;

        const className = cx('ornament', behavior, size, givenClassName, {
            'render-outlet': renderOutlet
        });

        return (
            renderOutlet
                ? <Outlet />
                :
                <Link {...rest} className={className}>
                    <Ornament.Image type={type} />
                </Link>
        );
    },
    Button(props: OrnamentSharedProps & OrnamentButtonProps) {
        const { decoration: type, size, behavior, className: givenClassName, ...rest } = props;

        const className = cx('ornament', behavior, size, givenClassName);
        return (
            <button type="button" className={className} {...rest}>
                <Ornament.Image type={type} />
            </button>
        );
    }
};
