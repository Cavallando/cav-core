import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import GlobalStyle from "../styles/global";
import { Step } from "./form-types";
import {
  FormBuilderProps,
  FormBuilder as FormBuilderComponent,
} from "./FormBuilder";

export type FlowFormProps<FormValues extends FieldValues> =
  FormBuilderProps<FormValues>;

export function FlowForm<FormValues extends FieldValues>(
  props: FormBuilderProps<FormValues>
) {
  const methods = useForm<FormValues>();

  useEffect(() => {
    const formValues = localStorage.getItem("form-values");
    if (formValues) {
      methods.reset(JSON.parse(formValues));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeStep = (step: Step<FormValues>) => {
    const values = methods.getValues();
    localStorage.setItem("form-values", JSON.stringify(values));
    props.onChangeStep && props.onChangeStep(step);
  };

  return (
    <FormProvider {...methods}>
      <GlobalStyle />
      <FormBuilderComponent {...props} onChangeStep={handleChangeStep} />
    </FormProvider>
  );
}
