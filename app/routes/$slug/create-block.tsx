import { useEffect } from 'react';
import { useProjectContext } from '../$slug';

export default function CreateBlockPage() {
    const { blocksManagerDispatch } = useProjectContext();
    useEffect(() => {
        blocksManagerDispatch({ actionType: 'set-all-link-to-edit' });
    }, []);
    return null;
}
