import cx from 'classnames';
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from 'remix';
import { Ornament, OrnamentSize } from "./ornament";

declare interface LayoutContextShape {
    toggleHeader(value: 'minimize' | 'expand'): void
}

const LayoutContext = createContext<LayoutContextShape>({
    toggleHeader() { }
});

export function useLayoutContext() {
    return useContext(LayoutContext);
}

export default function Layout() {
    const [isHeaderMinimized, setIsHeaderMinimized] = useState(false);

    const navClassName = cx('main-nav', {
        minimized: isHeaderMinimized,
    });

    return (
        <LayoutContext.Provider
            value={{ toggleHeader: (value) => setIsHeaderMinimized(value === 'minimize') }}
        >
            <nav className={navClassName}>
                <Ornament.Link
                    decoration="rainbow-flower"
                    size={isHeaderMinimized ? 'sm': 'lg'}
                    aria-label='go to home page'
                    to='/'
                />
                <h1>
                    Patterns.Blue
                </h1>
                <DarkModeSwitch
                    size={isHeaderMinimized ? 'sm': 'lg'}
                />
            </nav>
            <main className="w-full">
                <Outlet />
            </main>
            {/* <div className="orb-canvas" /> */}
        </LayoutContext.Provider>
    );
}

interface DarkModeSwitchProps {
    size: OrnamentSize
}

function DarkModeSwitch({size}: DarkModeSwitchProps) {
    const [isInDarkMode, setIsInDarkMode] = useState(false);
    useEffect(() => {
        const htmlElem = document?.getElementsByTagName('html')[0];
        if (isInDarkMode) {
            htmlElem.classList.add('dark');
        } else {
            htmlElem.classList.remove('dark');
        }
    }, [isInDarkMode]);

    return (

        <Ornament.Button
            size={size}
            decoration={isInDarkMode ? 'moon' : 'sun'}
            aria-label='light switch'
            onClick={() => setIsInDarkMode(!isInDarkMode)}
            className="shadow-lg shadow-accent-400 dark:shadow-blue-400"
        />
    )
}
