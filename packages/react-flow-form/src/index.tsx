import { FieldValues } from "react-hook-form";
import { FlowForm, Step as _Step } from "./form-builder";

export default FlowForm;
export type Step<FormValues extends FieldValues> = _Step<FormValues>;
