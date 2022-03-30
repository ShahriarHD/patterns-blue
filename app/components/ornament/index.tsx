import cx from 'classnames';
import { PropsWithChildren } from 'react';
import { Link, LinkProps } from 'remix';
import add from './add-min.png';
import error from './error-min.png';
import loading from './loading-min.png';
import moon from './moon-min.png';
import rainbowFlower from './rainbow-flower-min.png';
import sun from './sun-min.png';

export declare type OrnamentSize = 'sm' | 'md' | 'lg';

export declare type OrnamentDecor = 'rainbow-flower' | 'moon' | 'sun' | 'loading' | 'error' | 'add';

declare type OrnamentButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

declare type OrnamentLinkProps = LinkProps;

declare type OrnamentOutletProps = PropsWithChildren<{
    to: string,
    backTo: string,
}>

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
        const asset = getOrnamentAsset(type);
        return <img src={asset} />
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
