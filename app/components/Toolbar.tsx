import { ButtonHTMLAttributes, MouseEvent, PropsWithChildren, useCallback } from 'react';
import { useDrawingAppApi } from './Boom';
import { Ornament } from './ornament';


export function Toolbar() {
    const { send, isIn } = useDrawingAppApi();

    const onToolSelect = useCallback(
        (event: MouseEvent) => {
            send('SELECTED_TOOL', { name: event.currentTarget.id });
        },
        [send],
    );


    return (
        <div className="grid grid-cols-1 gap-4 absolute bottom-2 w-full z-tools">
            <div
                className="flex gap-4 w-fit rounded-full border overflow-hidden
                    shadow-2xl py-2 px-4 justify-self-center bg-white-alpha-900 dark:bg-black-alpha-500"
            >

                <PrimaryToolButton id="select" isActive={isIn('select')} onClick={onToolSelect}>
                    <Ornament.Image type="cursor" />
                </PrimaryToolButton>
                <PrimaryToolButton id="eraser" isActive={isIn('eraser')} onClick={onToolSelect}>
                    <Ornament.Image type="eraser" />
                </PrimaryToolButton>
                <PrimaryToolButton id="pencil" isActive={isIn('pencil')} onClick={onToolSelect}>
                    <Ornament.Image type="pencil" />
                </PrimaryToolButton>
            </div>
        </div>
    );
}

declare type PrimaryToolButtonProps = PropsWithChildren<{ isActive: boolean } & ButtonHTMLAttributes<HTMLButtonElement>>;

const PrimaryToolButton = ({ children, isActive, ...rest }: PrimaryToolButtonProps) => <button
    {...rest}
    style={isActive
        ? {
            backgroundColor: '#ffb400aa'
        }
        : {}}
    className="bg-white dark:bg-gray-400 hover:scale-105 active:scale-95
    rounded-full flex items-center justify-center p-2 shadow-xl border-b border-gray-600 transition"
>{children}</button>;
