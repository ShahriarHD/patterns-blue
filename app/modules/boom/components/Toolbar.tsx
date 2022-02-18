import cx from 'classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import {RiAddBoxLine , RiArrowUpFill, RiEraserFill, RiMouseFill, RiPencilFill } from 'react-icons/ri';
import { machine } from '../state/machine';

interface ToolbarProps {
  activeStates: string[]
  lastEvent: string
}

const onToolSelect = (e: React.MouseEvent) => {
  machine.send('SELECTED_TOOL', { name: e.currentTarget.id })
}

const onReset = () => {
  machine.send('RESET')
}

export function Toolbar({ activeStates, lastEvent }: ToolbarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 absolute bottom-2 w-full z-tools">
      <div className="flex gap-4 w-fit rounded-full border overflow-hidden shadow-2xl py-2 px-4 justify-self-center bg-white-alpha-900 dark:bg-black-alpha-500">
        <PrimaryToolButton id="select" isActive={machine.isIn('select')} onClick={onToolSelect}>
            <RiMouseFill />
        </PrimaryToolButton>
        <PrimaryToolButton id="eraser" isActive={machine.isIn('eraser')} onClick={onToolSelect}>
            <RiEraserFill />
        </PrimaryToolButton>
        <PrimaryToolButton id="pencil" isActive={machine.isIn('pencil')} onClick={onToolSelect}>
            <RiPencilFill />
        </PrimaryToolButton>
        <PrimaryToolButton id="box" isActive={machine.isIn('box')} onClick={onToolSelect}>
            <RiAddBoxLine />
        </PrimaryToolButton>
        <PrimaryToolButton id="arrow" isActive={machine.isIn('arrow')} onClick={onToolSelect}>
            <RiArrowUpFill />
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
