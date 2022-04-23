import { useEffect } from 'react';
import { useDrawingAppApi } from '~/components/Boom';
import { INITIAL_DATA } from '~/components/infinite-canvas/state/constants';

export default function Screen() {
    const { loadDocument } = useDrawingAppApi();

    useEffect(() => {
        loadDocument(INITIAL_DATA);
    }, []);

    return <div className="box z-route20 p-8 prose">
        <h3>Welcome to the infinite canvas</h3>
        <p>Select a page to begin ...</p>
    </div>;
}
