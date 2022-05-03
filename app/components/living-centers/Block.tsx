import { Block } from '@prisma/client';
import cx from 'classnames';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export declare type BlockPropsWithoutChildren = Omit<Block, 'projectId' | 'uuid'> & {
    as?: 'article' | 'figure' | 'div',
    className?: string,
    isEditable?: boolean,
}

declare type BlockProps = PropsWithChildren<BlockPropsWithoutChildren>

export default function Block(props: BlockProps) {
    const { index, width, height, alignment,
        isEditable = false,
        children, as = 'div', className: givenClassName } = props;

    const className = cx(
        givenClassName,
        'block',
        `width-${width.toLowerCase()}`,
        `height-${height.toLowerCase()}`,
        `self-${alignment.toLowerCase()}`
    );
    const As = as;

    const child = (<As className={className}>{children}</As>);

    if (!isEditable) {
        return child;
    }

    return (
        <Link to={`edit/${index}`}>
            {child}
        </Link>
    );
}
