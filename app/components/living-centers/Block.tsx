import { Block } from '@prisma/client';
import cx from 'classnames';
import { PropsWithChildren } from 'react';
import { Link } from 'remix';

export declare type BlockActiveMode = 'expanded' | 'editing'
export declare type BlockPropsWithoutChildren = Omit<Block, 'projectId' | 'uuid'> & {
    isEditable?: boolean
    className?: string
    blockActiveState?: BlockActiveMode
}

declare type BlockProps = PropsWithChildren<BlockPropsWithoutChildren>

export default function Block(props: BlockProps) {
    const { index, width, height,
        children, className: givenClassName, isEditable = false } = props;

    const className = cx(
        givenClassName,
        'block',
        `width-${width.toLowerCase()}`,
        `height-${height.toLowerCase()}`,
    );

    if (!isEditable) {
        return (
            <div className={className}>
                {children}
            </div>
        );
    }

    return (
        <Link to={`edit/${index}`} prefetch="intent" className={className}>
            {children}
        </Link>
    );
}
