import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import InfiniteCanvas from "~/components/infinite-canvas";
import { BoomApi } from "~/components/infinite-canvas/state/api";
import { DrawingAppData, INITIAL_DATA } from "~/components/infinite-canvas/state/constants";
import { useStateMachine } from "~/components/infinite-canvas/state/useStateMachine";
interface DrawingAppContextShape {
    boomApi?: BoomApi
}

const DrawingAppContext = createContext<DrawingAppContextShape>({
});

export function useDrawingAppApi() {
    const { boomApi } = useContext(DrawingAppContext);
    const machine = useStateMachine(INITIAL_DATA);
    if (boomApi) {
        return boomApi;
    } else {
        return new BoomApi(machine);
    }
}

declare type BoomProps = PropsWithChildren<{
}>

function Boom({ children }: BoomProps) {
    const machine = useStateMachine(INITIAL_DATA);
    const [isInClientSide, setIsInClientSide] = useState(false);

    useEffect(() => {
        setIsInClientSide(true);
    }, []);

    return (
        <DrawingAppContext.Provider value={{
            boomApi: new BoomApi(machine)
        }}>
            <main className="h-screen w-screen absolute top-0 left-0 z-route">
                {isInClientSide && <InfiniteCanvas />}
            </main>
            {children}
        </DrawingAppContext.Provider>
    )
}

export default Boom