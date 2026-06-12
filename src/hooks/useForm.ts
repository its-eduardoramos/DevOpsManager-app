import React, { useState } from "react";

export function useForm<T extends object>(initialValue: T) {
  //Initializes the form with default values.
  const [form, setForm] = useState<T>(initialValue);
  //Stores the field errors.
  const [errors, setErrors] = useState<Record<string, string>>({});
  //Sets true/false if the form was already touched.
  const [touched, setTouched] = useState<boolean>(false);

  /**
   * Handles form input changes.
   * @param {React.ChangeEvent<HTMLInputElement>} {target} target prop from the input.
   */
  const handleChange = ({
    target,
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (!touched) setTouched(true);

    //Cleans errors from the hook if they exist.
    const errorsObj = { ...errors };
    if (errorsObj[name]) {
      const { [name]: _, ...rest } = errorsObj;
      setErrors(rest);
    }
  };

  const reset = (): void => {
    setTouched(false);
    setErrors({});
    setForm(initialValue);
  };

  /**
   * Validates if the form is valid.
   * @returns {boolean} If the form is valid or not.
   */
  const isValid = (): boolean => {
    const formData: any = { ...form };
    let formIsValid = true;

    Object.keys(formData).forEach((key: string) => {
      if (!formData[key]) {
        formIsValid = false;
        setErrors((prev) => ({
          ...prev,
          [key]: `The field ${key} is required`,
        }));
      }
    });
    return formIsValid;
  };

  return { form, handleChange, isValid, errors, touched, reset };
}
