import { useEffect } from 'react';
import { useEditingContext } from '../edit';


export default function EditVoidPage() {
    const { resetEditMode } = useEditingContext();

    useEffect(() => {
        resetEditMode();
    }, []);

    return null;
}
