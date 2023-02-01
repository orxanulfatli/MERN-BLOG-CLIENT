import { ChangeEvent, FormEvent, useEffect, useState } from "react";
type InputChange = ChangeEvent<HTMLInputElement>;
type FormHandler = FormEvent<HTMLFormElement>;
export const useForm = <T extends object>(initialState: T, onSubmit: (data: T) => void, validate: (values: T) => T) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState(initialState)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: InputChange) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            onSubmit?.(formData);
        }
    }, [errors])
    const handleSubmit = (e: FormHandler) => {
        if (e) e.preventDefault();
        setErrors(validate(formData))
        setIsSubmitting(true)
    };

    return { formData, handleInputChange, handleSubmit, errors };
};