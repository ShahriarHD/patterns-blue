import cx from 'classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { RiCursorFill, RiEraserFill, RiPencilFill } from 'react-icons/ri';
import { BoomApi } from '../state/api';

interface ToolbarProps {
  activeStates?: string[]
  lastEvent?: string
}
declare const window: Window & { boomApi: BoomApi }

const onToolSelect = (e: React.MouseEvent) => {
  window.boomApi.send('SELECTED_TOOL', { name: e.currentTarget.id })
}

const onReset = () => {
  window.boomApi.send('RESET')
}

export function Toolbar({ activeStates, lastEvent }: ToolbarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 absolute bottom-2 w-full z-tools">
      <div className="flex gap-4 w-fit rounded-full border overflow-hidden shadow-2xl py-2 px-4 justify-self-center bg-white-alpha-900 dark:bg-black-alpha-500">
        <PrimaryToolButton id="select" isActive={window.boomApi?.isIn('select')} onClick={onToolSelect}>
            <RiCursorFill />
        </PrimaryToolButton>
        <PrimaryToolButton id="eraser" isActive={window.boomApi?.isIn('eraser')} onClick={onToolSelect}>
            <RiEraserFill />
        </PrimaryToolButton>
        <PrimaryToolButton id="pencil" isActive={window.boomApi?.isIn('pencil')} onClick={onToolSelect}>
            <RiPencilFill />
        </PrimaryToolButton>
      </div>
      {/* <div className="flex items-center justify-between p-3 ">
        <div>
          <button onClick={onReset}>Reset</button>
          {activeStates
            .slice(1)
            .map((name) => {
              const state = name.split('.')
              return state[state.length - 1]
            })
            .join(' - ')}
        </div>
        <div>{lastEvent}</div>
      </div> */}
    </div>
  )
}

const PrimaryToolButton = ({ children, isActive, ...rest }: PropsWithChildren<{ isActive: boolean } & ButtonHTMLAttributes<HTMLButtonElement>>) => {
  const className = cx('button', {
    'bg-blue-300 dark:bg-blue-600': isActive
  });
  return <button {...rest} className={className}>{children}</button>
};
