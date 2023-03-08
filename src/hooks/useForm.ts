import {  useEffect, useState } from "react";
import { FormSubmit, InputChange } from "../utils/types";

export const useForm = <T extends object>(initialState: T, onSubmit: (data: T) => void, validate: (values: T) => T) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState(initialState)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: InputChange) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            onSubmit?.(formData);
        }
    }, [errors])
    const handleSubmit = (e: FormSubmit) => {
        if (e) e.preventDefault();
        setErrors(validate(formData))
        setIsSubmitting(true)
    };

    return { formData, handleChange, handleSubmit, errors };
};
