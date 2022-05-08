import { Block } from '@prisma/client';
import cx from 'classnames';
import { forwardRef, PropsWithChildren } from 'react';
import { Link } from 'remix';

export declare type BlockActiveMode = 'expanded' | 'editing'
export declare type BlockPropsWithoutChildren = Omit<Block, 'projectId' | 'uuid'> & {
    isEditable?: boolean
    className?: string
    blockActiveState?: BlockActiveMode
}

declare type BlockProps = PropsWithChildren<BlockPropsWithoutChildren>

const Block = forwardRef<HTMLDivElement, BlockProps>((props, ref) => {
    const { width, height,
        children, className: givenClassName, isEditable, index } = props;

    const className = cx(
        givenClassName,
        'block',
        `width-${width.toLowerCase()}`,
        `height-${height.toLowerCase()}`,
    );

    let child;
    if (isEditable) {
        child = <Link to={`edit/${index}`}>
            {children}
        </Link>;
    } else {
        child = children;
    }

    return (
        <div className={className} ref={ref}>
            {child}
        </div>
    );

});

Block.displayName = 'Block';

export default Block;
