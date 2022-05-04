import { Color, ColorMetaStates } from '@prisma/client';
import { UpdateColorByIdArgs } from '~/models/color.server';
import { useProjectContext } from '~/routes/$slug';
import GoodOldForm, { useField } from '../GoodOldForm';

declare type ColorBlockEditorProps = Omit<Color, 'blockId'>

export default function ColorBlockEditor(props: ColorBlockEditorProps) {
    const { hex, meta, name, uuid } = props;
    const { project } = useProjectContext();

    if (!project) {
        return null;
    }

    return (
        <GoodOldForm<UpdateColorByIdArgs>
            className="flex flex-col gap-4"
            action={`/${project.slug}/color/update`}
            method="post"
            initialValues={{
                uuid,
                hex,
                name,
                meta,
            }}
        >
            <UUIDField />
            <ColorPicker />
            <NameField />
            <MetaField />
            <button type="submit" className="button">Save</button>
        </GoodOldForm>
    );
}

function UUIDField() {
    const inputProps = useField<UpdateColorByIdArgs>('uuid');
    return <input {...inputProps} type="hidden" aria-hidden readOnly/>;
}

function ColorPicker() {
    const inputProps = useField<UpdateColorByIdArgs>('hex');

    return (
        <div className="rounded-full overflow-hidden w-8 h-8 scale-125 self-center grid place-items-center shadow-inner">
            <input type="color" {...inputProps} style={{ transform: 'scale(4)' }}/>
        </div>
    );
}

function NameField() {
    const inputProps = useField<UpdateColorByIdArgs>('name');

    return (
        <input
            className="text-input"
            aria-label="color name"
            placeholder="Color name..."
            {...inputProps}
        />
    );
}

function MetaField() {
    const inputProps = useField<UpdateColorByIdArgs>('meta');

    return (
        <select className="dropdown" {...inputProps}>
            <option value={ColorMetaStates.JUST_A_BEAUTIFUL_COLOR}>
                {ColorMetaStates.JUST_A_BEAUTIFUL_COLOR.split('_').map(item => item.toLowerCase()).join(' ')}
            </option>
            <option value={ColorMetaStates.PROJECT_ACCENT_COLOR}>
                {ColorMetaStates.PROJECT_ACCENT_COLOR.split('_').map(item => item.toLowerCase()).join(' ')}
            </option>
            <option value={ColorMetaStates.PROJECT_BACKGROUND_DARK}>
                {ColorMetaStates.PROJECT_BACKGROUND_DARK.split('_').map(item => item.toLowerCase()).join(' ')}
            </option>
            <option value={ColorMetaStates.PROJECT_BACKGROUND_LIGHT}>
                {ColorMetaStates.PROJECT_BACKGROUND_LIGHT.split('_').map(item => item.toLowerCase()).join(' ')}
            </option>
        </select>
    );
}
