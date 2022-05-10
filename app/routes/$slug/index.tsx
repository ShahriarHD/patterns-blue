import { useEffect } from 'react';
import { useProjectContext } from '../$slug';


export default function ProjectPage() {
    const {
        blocksManagerDispatch
    } = useProjectContext();
    useEffect(() => {
        blocksManagerDispatch({ actionType: 'set-all-to-view-mode' });
    }, []);

    return null;
}
