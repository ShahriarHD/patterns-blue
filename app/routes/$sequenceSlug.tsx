import { Link, LoaderFunction, NavLink, Outlet, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import PlaygroundContextProvider from "~/components/Playground";
import { getSequenceIndex, getSequences, getSequenceSteps, Sequence, SequenceStep } from "~/modules/sequence";

type SequenceNavigation = {
    type: 'begin',
    firstStepSlug: string
} | {
    type: 'step',
    nextStepSlug: string,
    previousStepSlug: string,
}

type SequenceIndexData = {
    sequenceIndex: Sequence,
    sequenceSteps: SequenceStep[]
    sequenceNavigation: SequenceNavigation
}

export const loader: LoaderFunction = async ({ params }): Promise<SequenceIndexData> => {

    invariant(params.sequenceSlug, "expected params.sequenceSlug");

    const sequenceIndex = await getSequenceIndex(params.sequenceSlug);
    const sequenceSteps = await getSequenceSteps(params.sequenceSlug);

    let sequenceNavigation: SequenceNavigation = {
        type: 'begin',
        firstStepSlug: sequenceSteps[0].stepSlug,
    };

    const possibleActiveStepSlug = params.slug;
    const possibleActiveStepSlugIndex = sequenceSteps.findIndex(({ stepSlug }) => stepSlug === possibleActiveStepSlug);
    if (possibleActiveStepSlugIndex !== -1) {

        let nextStepSlug = possibleActiveStepSlugIndex !== sequenceSteps.length - 1 ? sequenceSteps[possibleActiveStepSlugIndex + 1].stepSlug : 'index';
        let previousStepSlug = possibleActiveStepSlugIndex !== 0 ? sequenceSteps[possibleActiveStepSlugIndex - 1].stepSlug : '';

        sequenceNavigation = {
            type: 'step',
            nextStepSlug,
            previousStepSlug
        }
    }

    return {
        sequenceIndex,
        sequenceSteps,
        sequenceNavigation
    };
};

export default function SequenceIndexPage() {

    const { sequenceIndex, sequenceSteps, sequenceNavigation } = useLoaderData<SequenceIndexData>()


    return (
        <div className="sequence-layout">
            <PlaygroundContextProvider>
                <header className="prose pt-8">
                    <h2>
                        <Link to={`/${sequenceIndex.slug}`} className="font-display font-bold">{sequenceIndex.title} </Link>
                    </h2>
                </header>
                <main className="prompt grained">
                    <Outlet />
                </main>
                <aside>
                    <h3 className="font-display text-lg p-2">Steps</h3>
                    <ul className="table-of-contents grained prose-sm fixed">
                        {
                            sequenceSteps.map(({ stepSlug, title }, index) => (
                                <li key={`step-${index}`}>
                                    <NavLink to={stepSlug} reloadDocument className={({ isActive }) => isActive ? 'font-bold' : ''}>{title}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </aside>
                <footer className="w-full flex justify-around items-stretch py-4">
                    {
                        sequenceNavigation.type === 'begin'
                            ?
                            <Link reloadDocument to={sequenceNavigation.firstStepSlug}>Begin</Link>
                            :
                            <>
                                <Link reloadDocument to={sequenceNavigation.previousStepSlug}>Back</Link>
                                <Link reloadDocument to={sequenceNavigation.nextStepSlug}>Next</Link>
                            </>
                    }
                </footer>
            </PlaygroundContextProvider>
        </div>
    )
}