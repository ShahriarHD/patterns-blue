import cx from 'classnames';
import { ButtonHTMLAttributes, PropsWithChildren, useCallback, MouseEvent } from 'react';
import { RiCursorFill, RiEraserFill, RiPencilFill } from 'react-icons/ri';
import { useDrawingAppApi } from './Boom';
import { BoomApi } from './infinite-canvas/state/api';


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
            <RiCursorFill />
        </PrimaryToolButton>
        <PrimaryToolButton id="eraser" isActive={isIn('eraser')} onClick={onToolSelect}>
            <RiEraserFill />
        </PrimaryToolButton>
        <PrimaryToolButton id="pencil" isActive={isIn('pencil')} onClick={onToolSelect}>
            <RiPencilFill />
        </PrimaryToolButton>
      </div>
    </div>
  )
}

const PrimaryToolButton = ({ children, isActive, ...rest }: PropsWithChildren<{ isActive: boolean } & ButtonHTMLAttributes<HTMLButtonElement>>) => {
  const className = cx('button', {
    'bg-blue-300 dark:bg-blue-600': isActive
  });
  return <button {...rest} className={className}>{children}</button>
};
