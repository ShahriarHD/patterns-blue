import { Ornament } from '../ornament';

export default function CreateBlock() {
    return (
        <>
            <img
                src="/img/bg-gradient.jpg" alt=""
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="grid place-items-center hue-rotate-180 bg-white-alpha-100 w-full h-full">
                <Ornament.Link to="create-block" size="lg" decoration="add" />
            </div>
        </>
    );
}
