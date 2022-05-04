import { Block } from '@prisma/client';
import cx from 'classnames';
import { PropsWithChildren } from 'react';
import { Link } from 'remix';

export declare type BlockPropsWithoutChildren = Omit<Block, 'projectId' | 'uuid'> & {
    className?: string,
    isEditable?: boolean,
}

declare type BlockProps = PropsWithChildren<BlockPropsWithoutChildren>

export default function Block(props: BlockProps) {
    const { index, width, height, alignment,
        isEditable = false,
        children, className: givenClassName } = props;

    const className = cx(
        givenClassName,
        'block',
        `width-${width.toLowerCase()}`,
        `height-${height.toLowerCase()}`,
        // this will be one of these: self-start self-center self-end
        // and this is a very important comment, NOTE: please do not remove this
        `self-${alignment.toLowerCase()}`
    );

    if (!isEditable) {
        return (
            <div className={className}>{children}</div>
        );
    }

    return (
        <Link to={`edit/${index}`} prefetch="intent" className={className}>
            {children}
        </Link>
    );
}
