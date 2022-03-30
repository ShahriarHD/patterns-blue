import cx from 'classnames';
import { ButtonHTMLAttributes, PropsWithChildren, useCallback, MouseEvent } from 'react';
import { RiCursorFill, RiEraserFill, RiPencilFill } from 'react-icons/ri';
import { useDrawingAppApi } from './Boom';
import { BoomApi } from './infinite-canvas/state/api';
import { Ornament } from './ornament';


export function Toolbar() {
    const { send, isIn } = useDrawingAppApi();

    const onToolSelect = useCallback(
        (e: MouseEvent) => {
            send('SELECTED_TOOL', { name: e.currentTarget.id })
        },
        [send],
    )


    return (
        <div className="grid grid-cols-1 gap-4 absolute bottom-2 w-full z-tools">
            <div className="flex gap-4 w-fit rounded-full border overflow-hidden shadow-2xl py-2 px-4 justify-self-center bg-white-alpha-900 dark:bg-black-alpha-500">

                <PrimaryToolButton id="select" isActive={isIn('select')} onClick={onToolSelect}>
                    <Ornament.Image type='cursor' />
                </PrimaryToolButton>
                <PrimaryToolButton id="eraser" isActive={isIn('eraser')} onClick={onToolSelect}>
                    <Ornament.Image type='eraser' />
                </PrimaryToolButton>
                <PrimaryToolButton id="pencil" isActive={isIn('pencil')} onClick={onToolSelect}>
                    <Ornament.Image type='pencil' />
                </PrimaryToolButton>
            </div>
        </div>
    )
}

const PrimaryToolButton = ({ children, isActive, ...rest }: PropsWithChildren<{ isActive: boolean } & ButtonHTMLAttributes<HTMLButtonElement>>) => {
    const className = cx('', {
        'bg-blue-300 dark:bg-blue-600 ': isActive
    });
    return <button
        {...rest}
        style={isActive ? {
            backgroundColor: '#ffb400aa'
        } : {}}
        className="bg-white dark:bg-gray-400 hover:scale-105 active:scale-95 rounded-full flex items-center justify-center p-2 shadow-xl border-b border-gray-600 transition"
    >{children}</button>
};
