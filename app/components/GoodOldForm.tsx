import { createContext, FormEvent, useCallback, useContext, useState } from 'react';
import { Form, FormProps, useSubmit } from 'remix';

declare type FormShape = Record<string, string>;

interface GoodOldFormContextValues<T extends FormShape> {
    values: T,
    isSubmitting: boolean
}

const GoodOldFormContext = createContext<GoodOldFormContextValues<any>>({
    values: undefined,
    isSubmitting: false
});

export function useIsSubmitting() {
    const { isSubmitting } = useContext(GoodOldFormContext);

    return isSubmitting;
}

declare type InputProps = {
    name: string,
    defaultValue: string,
    defaultChecked?: boolean,
}


export function useField<T extends FormShape>(name: keyof T & string, choiceValue?: string): InputProps {
    const { values } = useContext(GoodOldFormContext);

    const inputValue = values[name];
    const result: InputProps = { name, defaultValue: choiceValue || inputValue };

    if (choiceValue) {
        result.defaultChecked = inputValue === choiceValue;
    }

    return result;
}

interface GoodOldFormProps<T extends FormShape> extends FormProps {
    initialValues: T,
}

export default function GoodOldForm<T extends FormShape>(props: GoodOldFormProps<T>) {
    const { initialValues, ...rest } = props;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState(initialValues);

    const handleChange = useCallback((event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const newValues = Object.fromEntries(formData.entries()) as T;
        setValues(newValues);
    }, []);

    const submit = useSubmit();

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        submit(event.currentTarget);
        setIsSubmitting(false);
    }, []);

    return (
        <GoodOldFormContext.Provider value={{ isSubmitting, values }}>
            <Form {...rest} onSubmit={handleSubmit} onChange={handleChange} />
        </GoodOldFormContext.Provider>
    );
}
