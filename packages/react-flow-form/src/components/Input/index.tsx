import React, { ChangeEvent, useState } from "react";
import {
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  UseFormReturn,
} from "react-hook-form";
import { InputWrapper, Input as StyledInput } from "./styled";

type InputProps<FormValues extends FieldValues> = {
  register: UseFormReturn<FormValues>["register"];
  placeholder: string;
  formId: Path<FormValues>;
};

export function Input<FormValues extends FieldValues>({
  placeholder,
  register,
  formId,
}: InputProps<FormValues>) {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <InputWrapper>
      <StyledInput
        value={value}
        // TODO: Fix me
        {...register(formId as Path<UnPackAsyncDefaultValues<FormValues>>)}
        name={formId.toString()}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
}
