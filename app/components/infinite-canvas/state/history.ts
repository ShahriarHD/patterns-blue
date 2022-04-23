import { current } from 'immer';
import { DrawingAppData, INITIAL_DATA, PERSIST_DATA } from './constants';

export function makeHistory(drawingId = 'anon') {

    let initialData = INITIAL_DATA;

    let saved = null;
    try {
        saved = localStorage.getItem(drawingId);

    } catch (error) {
        console.info('absorbing localStorage access error in the server.');
    }

    if (PERSIST_DATA && saved ) {
        const restoredData = JSON.parse(saved);

        // if (restoredData.version < INITIAL_DATA.version) {
        //     // Migrations would go here
        //     restoredData = INITIAL_DATA
        // }

        initialData = restoredData;
    }

    let stack: DrawingAppData[] = [initialData];
    let pointer = 0;

    function persist(data: DrawingAppData) {
        delete data.pageState.hoveredId;
        data.overlays.snapLines = [];
        localStorage.setItem(drawingId, JSON.stringify(data));
    }

    function push(data: DrawingAppData) {
        if (pointer < stack.length - 1) {
            stack = stack.slice(0, pointer + 1);
        }
        const serialized = current(data);
        stack.push(serialized);
        pointer = stack.length - 1;
        persist(serialized);
        return true;
    }

    function undo() {
        if (pointer <= 0) {
            return false;
        }
        pointer--;
        const data = stack[pointer];
        persist(data);
        return data;
    }

    function redo() {
        if (pointer >= stack.length - 1) {
            return false;
        }
        pointer++;
        const data = stack[pointer];
        persist(data);
        return data;
    }

    function reset(data = INITIAL_DATA) {
        stack = [data];
        pointer = 0;
        localStorage.setItem(drawingId, JSON.stringify(data));
        persist(data);
        return data;
    }

    function restore() {
        return initialData;
    }

    function depth() {
        return pointer;
    }

    return { push, undo, redo, reset, restore, depth };
}
