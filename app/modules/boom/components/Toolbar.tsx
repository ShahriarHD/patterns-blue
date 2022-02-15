import { machine } from '../state/machine'
import { RiMouseFill, RiDeleteBin2Fill, RiPencilFill, RiAddBoxFill, RiArrowUpFill } from 'react-icons/ri';
import { ButtonHTMLAttributes, HTMLProps, PropsWithChildren } from 'react';
import cx from 'classnames'

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
    <ToolbarContainer>
      <PrimaryTools>
        <PrimaryToolButton id="select" isActive={machine.isIn('select')} onClick={onToolSelect}>
          <Highlight>
            <RiMouseFill />
          </Highlight>
        </PrimaryToolButton>
        <PrimaryToolButton id="eraser" isActive={machine.isIn('eraser')} onClick={onToolSelect}>
          <Highlight>
            <RiDeleteBin2Fill />
          </Highlight>
        </PrimaryToolButton>
        <PrimaryToolButton id="pencil" isActive={machine.isIn('pencil')} onClick={onToolSelect}>
          <Highlight>
            <RiPencilFill />
          </Highlight>
        </PrimaryToolButton>
        <PrimaryToolButton id="box" isActive={machine.isIn('box')} onClick={onToolSelect}>
          <Highlight>
            <RiAddBoxFill />
          </Highlight>
        </PrimaryToolButton>
        <PrimaryToolButton id="arrow" isActive={machine.isIn('arrow')} onClick={onToolSelect}>
          <Highlight>
            <RiArrowUpFill />
          </Highlight>
        </PrimaryToolButton>
      </PrimaryTools>
      <StatusBar>
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
      </StatusBar>
    </ToolbarContainer>
  )
}


const ToolbarContainer = ({ children }: PropsWithChildren<{}>) => (
  <div className="grid grid-rows-2 grid-cols-1 gap-4 absolute bottom-0 w-full z-tools">{children}</div>
);

const PrimaryTools = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex gap-4 w-fit rounded-2xl border overflow-hidden shadow-2xl py-2 px-4 justify-self-center bg-gray-100">{children}</div>
);

const Highlight = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex items-center justify-center w-full h-full rounded-lg">{children}</div>
);


const PrimaryToolButton =({ children, isActive, ...rest }: PropsWithChildren<{isActive: boolean} & ButtonHTMLAttributes<HTMLButtonElement>>) => {
  const className = cx ('button', {
    'shadow-blue-500 shadow-xl': isActive
  });
  return <button {...rest} className={className}>{children}</button>
};

const StatusBar = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex items-center justify-between p-3 ">{children}</div>
);
