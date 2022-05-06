import cx from 'classnames';
import { createContext, useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'remix';
import { Ornament, OrnamentSize } from './ornament';

declare interface LayoutContextShape {
    toggleHeader(value: 'minimize' | 'expand'): void,
}

const LayoutContext = createContext<LayoutContextShape>({
    toggleHeader() {
        // NOTE: why am I here?
    }
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
            value={{
                toggleHeader: value => setIsHeaderMinimized(value === 'minimize'),
            }}
        >
            <nav className={navClassName}>
                <Ornament.Link
                    decoration="rainbow-flower"
                    size={isHeaderMinimized ? 'sm' : 'lg'}
                    aria-label="go to home page"
                    to="/projects"
                />
                <Link to="/">
                    <h1 className="text-blue-900 dark:text-blue-200">
                        PATTERNS.BLUE
                    </h1>
                </Link>
                <DarkModeSwitch
                    size={isHeaderMinimized ? 'sm' : 'lg'}
                />
            </nav>
            <main className="w-full">
                <Outlet />
            </main>
            {/* <footer className="flex items-center gap-4 box justify-center self-center p-8">
                <h6>Your Profile</h6>
                <Ornament.Link to="/profile" decoration="home" />
            </footer> */}
        </LayoutContext.Provider>
    );
}

interface DarkModeSwitchProps {
    size: OrnamentSize
}

const DARK_MODE_STORAGE_KEY = 'dark-mode';
function DarkModeSwitch({ size }: DarkModeSwitchProps) {
    const [isInDarkMode, setIsInDarkMode] = useState(false);
    useEffect(() => {
        try {
            const persistedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY);
            if (persistedDarkMode === 'on') {
                setIsInDarkMode(true);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const htmlElem = document?.getElementsByTagName('html')[0];
        if (isInDarkMode) {
            htmlElem.classList.add('dark');
            localStorage.setItem(DARK_MODE_STORAGE_KEY, 'on');
        } else {
            htmlElem.classList.remove('dark');
            localStorage.setItem(DARK_MODE_STORAGE_KEY, 'off');
        }
    }, [isInDarkMode]);


    return (

        <Ornament.Button
            size={size}
            decoration={isInDarkMode ? 'moon' : 'sun'}
            aria-label="light switch"
            onClick={() => setIsInDarkMode(!isInDarkMode)}
            className="shadow-lg shadow-accent-400 dark:shadow-blue-400"
        />
    );
}
