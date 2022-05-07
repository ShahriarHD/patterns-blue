import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useBeforeUnload, useTransition } from 'remix';


const SCROLL_STORAGE_KEY = 'positions';

let positions: { [key: string]: number } = {};

if (typeof document !== 'undefined') {
    const sessionPositions = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (sessionPositions) {
        positions = JSON.parse(sessionPositions);
    }
}

/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 *
 * @see https://remix.run/api/remix#scrollrestoration
 */
export function CustomScrollRestoration({ nonce = undefined }: { nonce?: string }) {
    useScrollRestoration();

    // wait for the browser to restore it on its own
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);

    // let the browser restore on it's own for refresh
    useBeforeUnload(useCallback(() => {
        window.history.scrollRestoration = 'auto';
    }, []));

    const restoreScroll = ((STORAGE_KEY: string) => {
        if (!window.history.state || !window.history.state.key) {
            const key = Math.random().toString(32).slice(2);
            window.history.replaceState({ key }, '');
        }
        try {
            const positions = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
            const storedY = positions[window.history.state.key];
            if (typeof storedY === 'number') {
                window.scrollTo(0, storedY);
            }
        } catch (error) {
            console.error(error);
            sessionStorage.removeItem(STORAGE_KEY);
        }
    }).toString();

    return (
        <script
            nonce={nonce}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
                __html: `(${restoreScroll})(${JSON.stringify(SCROLL_STORAGE_KEY)})`,
            }}
        />
    );
}

let hydrated = false;

function useScrollRestoration() {
    const location = useLocation();
    const transition = useTransition();

    const wasSubmissionRef = useRef(false);

    useEffect(() => {
        if (transition.submission) {
            wasSubmissionRef.current = true;
        }
    }, [transition]);

    useEffect(() => {
        if (transition.location) {
            positions[location.key] = window.scrollY;
        }
    }, [transition, location]);

    useBeforeUnload(useCallback(() => {
        sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(positions));
    }, []));

    if (typeof document !== 'undefined') {
    // eslint-disable-next-line
    useLayoutEffect(() => {
            // don't do anything on hydration, the component already did this with an
            // inline script.
            if (!hydrated) {
                hydrated = true;
                return;
            }

            const y = positions[location.key];
            // If the user specifically indicated that scroll should
            // be disabled, we don't need to scroll
            if (
                location.state &&
                typeof location.state === 'object' &&
                (location.state as { scroll: boolean }).scroll === false
            ) {
                return;
            }
            // been here before, scroll to it
            if (y !== undefined) {
                window.scrollTo(0, y);
                return;
            }

            // try to scroll to the hash
            if (location.hash) {
                const el = document.getElementById(location.hash.slice(1));
                if (el) {
                    el.scrollIntoView();
                    return;
                }
            }

            // don't do anything on submissions
            if (wasSubmissionRef.current === true) {
                wasSubmissionRef.current = false;
                return;
            }

            // otherwise go to the top on new locations
            window.scrollTo(0, 0);
        }, [location]);
    }

    useEffect(() => {
        if (transition.submission) {
            wasSubmissionRef.current = true;
        }
    }, [transition]);
}
