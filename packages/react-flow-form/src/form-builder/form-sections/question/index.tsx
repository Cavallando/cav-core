import React, { ForwardedRef, forwardRef } from "react";
import { Checkbox, Select, InputText } from "../../form-types";
import { QuestionWrapper, AnswersWrapper, QuestionTitle } from "./styled";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { StepContent } from "../../form-types/step";

type QuestionProps<FormValues extends FieldValues> = {
  content: StepContent[];
  title: string;
  formId?: Path<FormValues>;
};

function QuestionInner<FormValues extends FieldValues>(
  { content, title, formId }: QuestionProps<FormValues>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { control, register, setValue, getValues } =
    useFormContext<FormValues>();

  const formType = (item: StepContent) => {
    switch (item.type) {
      case "checkbox":
        return (
          <Checkbox<FormValues>
            control={control}
            getValues={getValues}
            setValue={setValue}
            formId={formId!}
            values={item.values}
          />
        );
      case "select":
        return (
          <Select<FormValues>
            control={control}
            getValues={getValues}
            setValue={setValue}
            formId={formId!}
            values={item.values}
          />
        );
      case "input":
        return (
          <InputText
            register={register}
            formId={formId!}
            placeholder={item.placeholder}
          />
        );
      default:
        break;
    }

    return undefined;
  };

  return (
    <QuestionWrapper ref={ref}>
      <QuestionTitle>{title}</QuestionTitle>
      <AnswersWrapper>
        {content.map((item, index) => (
          <div key={index}>{formType(item)}</div>
        ))}
      </AnswersWrapper>
    </QuestionWrapper>
  );
}

const Question = forwardRef(QuestionInner);
export default Question;
