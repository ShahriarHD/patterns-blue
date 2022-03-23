import { Fragment, useEffect, useLayoutEffect } from "react";
import { useLayoutContext } from "~/components/Layout";
import { Ornament } from "~/components/ornament";


declare type CanvasInfo = {
    title: string
}
const canvas: CanvasInfo[] = [
    { title: 'Introduction' },
    { title: 'Mental Preparation' },
    { title: 'Examples Gallery' },
    { title: 'Property 1: Hierarchy of colors' },
    { title: 'Property 2: Colors create light together' },
    { title: 'Property 3: Contrast of dark & light' },
    { title: 'Property 4: Mutual embedding' },
    { title: 'Property 5: Boundaries & Hairlines' },
    { title: 'Property 6: Sequence of linked colors' },
    { title: 'Property 7: Families of color' },
    { title: 'Property 8: Color variation' },
    { title: 'Property 9: Intensity & Clarity of individual color' },
    { title: 'Property 10: Subdued Brilliance' },
    { title: 'Property 11: Color depends on geometry' },
]

export default function () {

    return (
        <>
            <h3 className="text-2xl font-bold">Click on a canvas to start exploring</h3>
            <p>
                Or create a new canvas by clicking the dotted rectangle at the end of the list
            </p>
            <section className="p-6 flex gap-6 flex-wrap items-center justify-center">
                {
                    canvas.map(({ title }, index) => (
                        <div className="flex gap-6 items-center" key={`canvas-${index}`}>
                            <h5 className="w-64 h-32 bg-blue-500 text-white font-black align-middle text-center p-3 rounded-lg shadow-inner">
                                {title}
                            </h5>
                        </div>
                    ))
                }
                <div className="w-64 h-32 bg-transparent border-8 border-dotted border-gray-500 font-black align-middle text-center p-3 rounded-lg shadow-sm
                                flex gap-2 items-center justify-center">
                     <strong>Create Canvas</strong>
                </div>
            </section>
        </>
    )
};
