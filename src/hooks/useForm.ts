import { useEffect, useState } from "react";
import { FormSubmit, InputChange } from "../utils/types";

export const useForm = <T extends object>(
  initialState: T,
  onSubmit: (data: T) => void,
  validate?: (values: T) => T
) => {
  const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: InputChange) => {
    const { value, name, files } = e.target as HTMLInputElement;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => { console.log(formData) }, [formData])
  useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
         onSubmit?.(formData);
      }
  }, [errors]);
  const handleSubmit = (e: FormSubmit) => {
    if (e) e.preventDefault();
    validate && setErrors(validate(formData));
    setIsSubmitting(true);
  };

  return { formData, handleChange, handleSubmit, errors };
};
