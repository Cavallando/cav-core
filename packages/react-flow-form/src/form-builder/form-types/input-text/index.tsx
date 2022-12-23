import React, { ChangeEvent, useState } from "react";
import { FieldValues, Path, UnPackAsyncDefaultValues, UseFormReturn } from "react-hook-form";
import { InputWrapper, Input } from "./styled";

type InputTextProps<FormValues extends FieldValues> = {
  register: UseFormReturn<FormValues>["register"];
  placeholder: string;
  formId: Path<FormValues>;
};

function InputText<FormValues extends FieldValues>({ placeholder, register, formId }: InputTextProps<FormValues>) {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <InputWrapper>
      <Input
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

export default InputText;
