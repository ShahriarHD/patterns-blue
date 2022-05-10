import cx from 'classnames';
import { Form, useMatches } from 'remix';
import { Ornament } from '../ornament';
declare type CreateBlockProps = {
    newBlockFormData: CreateBlockFormProps
    increaseIndex?: () => void,
    decreaseIndex?: () => void,
}


export default function CreateBlock(props: CreateBlockProps) {
    const { decreaseIndex, increaseIndex, newBlockFormData } = props;
    const matches = useMatches();

    const isInsideCreateBlockPage = Boolean(matches.find(({ pathname }) => pathname.includes('create-block')));
    const className = cx('w-full transition-all', {
        'h-full': !isInsideCreateBlockPage,
        'h-1/4': isInsideCreateBlockPage
    });


    return (
        <div className={className}>
            <img
                src="/img/bg-gradient.jpg" alt=""
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-behind w-full h-full object-cover
                           shadow-2xl shadow-black-alpha-300 dark:shadow-blue-800"
            />
            <div className="flex items-center justify-around w-full h-full">
                <Ornament.Button
                    decoration="left" size="sm"
                    onClick={decreaseIndex}
                    disabled={!decreaseIndex}
                />
                <Ornament.Link
                    to={`create-block`}
                    size="lg"
                    decoration="add"
                    state={{ scroll: false }}
                />
                <Ornament.Button
                    decoration="right" size="sm"
                    onClick={increaseIndex}
                    disabled={!increaseIndex}
                />
            </div>
            {isInsideCreateBlockPage && <CreateBlockForm {...newBlockFormData}/>}
        </div>
    );
}

interface CreateBlockFormProps {
    projectId: string,
    projectSlug: string,
    createBlockIndex: number
}

function CreateBlockForm({ createBlockIndex, projectId, projectSlug }: CreateBlockFormProps) {

    return (
        <Form
            className="flex flex-col items-center gap-1"
            method="post"
            reloadDocument
        >
            <input type="hidden" name="projectId" value={projectId} />
            <input type="hidden" name="blockIndex" value={createBlockIndex} />
            <h4 className="font-display text-2xl font-bold">Create a block </h4>
            <p>Living blocks you can add to your page now</p>
            <ol className="flex flex-col gap-4 mt-5">
                <li>
                    <button
                        name="intent"
                        type="submit"
                        formAction={`/${projectSlug}/color/new`}
                        className="button"
                        value="color"
                    >
                        Create a new color
                    </button>
                </li>
                <li>
                    <button
                        name="intent"
                        type="submit"
                        formAction={`/${projectSlug}/text/new`}
                        className="button"
                        value="text"
                    >
                        Write some text
                    </button>
                </li>
                <li>
                    <button
                        name="intent"
                        type="submit"
                        formAction={`/${projectSlug}/image/new`}
                        className="button"
                        value="image"
                    >
                        Upload a photo
                    </button>
                </li>
            </ol>
        </Form>
    );
}
