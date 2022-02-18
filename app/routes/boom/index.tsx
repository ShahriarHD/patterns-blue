import Boom from "~/modules/boom/Boom";

export default function BoomPage() {
    if (typeof window === "undefined" || !(window?.document)) {
        return null;
    }
    return (
        <div className="w-full h-full rounded-3xl shadow-2xl relative overflow-hidden bg-gray-100 dark:bg-gray-300 text-center">
            <Boom />
        </div>
    )
}