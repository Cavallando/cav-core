import { FieldValues, Path } from "react-hook-form";

export type StepType = "section" | "question";
export type StepContentType = "text" | "checkbox" | "input" | "select";
export type TextStep = { type: "text"; value: string };

export type StepOption = {
  value: string;
  label: string;
};

export type SelectStep = {
  type: "select" | "checkbox";
  values: {
    value: string;
    label: string;
  }[];
};
export type InputStep = {
  type: "input";
  placeholder: string;
};

export type StepContent = InputStep | SelectStep | TextStep;
export type Step<FormValues extends FieldValues> = {
  id: number;
  type: StepType;
  content: StepContent[];
  title: string;
  subtitle?: string;
  formId?: Path<FormValues>;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
};
