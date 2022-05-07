import { Ornament } from '../ornament';

export default function CreateBlock() {
    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
            <img
                src="/img/bg-gradient.jpg" alt=""
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="grid place-items-center bg-white-alpha-100 w-full h-full">
                <Ornament.Link to="create-block" size="lg" decoration="add" />
            </div>
        </div>
    );
}
