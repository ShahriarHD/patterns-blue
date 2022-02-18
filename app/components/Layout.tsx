import { useEffect, useRef, useState } from "react";
import { RiMoonFill, RiSunFill, RiLoginBoxFill, RiAncientPavilionFill } from "react-icons/ri";
import { Link } from "remix";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <nav className="main-nav">
                <Link to={'/'} className="w-10 h-10 rounded-full flex justify-center items-center p-2 bg-gradient-to-b from-blue-300 to-blue-500 shadow-lg border-b border-black-alpha-300">
                    <RiAncientPavilionFill className="w-full h-full" />
                </Link>
                <div className="flex gap-4">
                    <DarkModeSwitch />
                    <Link to={'/login'} className="button">
                        <RiLoginBoxFill />
                    </Link>
                </div>

            </nav>
            <main className="w-full mb-6" style={{ height: 'calc(100vh - 6.5rem)' }}>
                {children}
            </main>
            <PixiCanvas />
        </>
    );
}


function PixiCanvas() {

    return (
        <canvas className="orb-canvas"></canvas>
    )
}

function DarkModeSwitch() {
    const [isInDarkMode, setIsInDarkMode] = useState(false);
    useEffect(() => {
        const htmlElem = document.getElementsByTagName('html')[0];
        if (isInDarkMode) {
            htmlElem.classList.add('dark');
        } else {
            htmlElem.classList.remove('dark');
        }
    }, [isInDarkMode]);

    return (
        <button
            aria-label="dark mode switch"
            onClick={() => setIsInDarkMode(!isInDarkMode)}
            className="button"
        >
            {
                isInDarkMode
                    ? <RiMoonFill />
                    : <RiSunFill />
            }
        </button>
    )
}
