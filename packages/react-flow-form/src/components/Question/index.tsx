import React, { ForwardedRef, forwardRef } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Checkbox } from "../Checkbox";
import { Input } from "../Input";
import Select from "../Select";
import { StepContent } from "../Step";
import { QuestionWrapper, QuestionTitle, AnswersWrapper } from "./styled";

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
          <Input
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

export const Question = forwardRef(QuestionInner);
