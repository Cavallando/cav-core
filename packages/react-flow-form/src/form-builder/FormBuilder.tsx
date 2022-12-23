import React, { useRef } from "react";
import { useState } from "react";
import { Step } from "./form-types/step";
import {
  FormBuilderWrapper,
  StepWrapper,
  ArrowsWrapper,
  ArrowsButton,
} from "./styled";
import { Section, Question } from "./form-sections";
import { FieldValues } from "react-hook-form";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { PageWrapper } from "./styled";

export type FormBuilderProps<FormValues extends FieldValues> = {
  data: Step<FormValues>[];
  horizontal?: boolean;
  onNextStep?: (nextStep: Step<FormValues>) => void;
  onPrevStep?: (prevStep: Step<FormValues>) => void;
  onChangeStep?: (step: Step<FormValues>) => void;
  onFinish?: (formData: FormValues) => void;
};

export function FormBuilder<FormValues extends FieldValues>({
  data,
  horizontal = false,
  onNextStep,
  onPrevStep,
  onChangeStep,
}: FormBuilderProps<FormValues>) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [currentIndexForm, setCurrentIndexForm] = useState(0);
  const [classNameState, setClassNameState] = useState("fade");

  const handleNextStep = () => {
    const newIndex = currentIndexForm + 1;
    transition(newIndex, () => {
      setCurrentIndexForm(newIndex);
      onNextStep && onNextStep(data[newIndex]);
    });
  };

  const handlePrevStep = () => {
    const newIndex = currentIndexForm - 1;
    transition(newIndex, () => {
      setCurrentIndexForm(newIndex);
      onPrevStep && onPrevStep(data[newIndex]);
    });
  };

  const transition = (newIndex: number, callback: () => void, timeout = 50) => {
    newIndex > currentIndexForm
      ? setClassNameState("fade")
      : setClassNameState("fade-out");

    setTimeout(() => {
      callback();
      onChangeStep && onChangeStep(data[newIndex]);
    }, timeout);
  };

  const generateFormStep = (step: Step<FormValues>) => {
    switch (step.type) {
      case "section":
        return (
          <Section
            ref={nodeRef}
            hideNextButton={step.hideNextButton}
            hidePrevButton={step.hidePrevButton}
            content={step.content}
            onNextStep={handleNextStep}
          />
        );
      case "question":
        return (
          <Question<FormValues>
            ref={nodeRef}
            formId={step.formId}
            title={step.title}
            content={step.content}
          />
        );
      default:
        break;
    }

    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEndListener = (done: any) => {
    nodeRef.current?.addEventListener("transitionend", done, false);
  };

  const currentStep = data[currentIndexForm];

  return (
    <PageWrapper>
      <FormBuilderWrapper>
        <StepWrapper horizontal={horizontal}>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={currentIndexForm}
              nodeRef={nodeRef}
              addEndListener={handleEndListener}
              classNames={classNameState}
            >
              {generateFormStep(currentStep)}
            </CSSTransition>
          </SwitchTransition>
        </StepWrapper>

        <ArrowsWrapper show={currentStep.type === "question"}>
          <ArrowsButton onClick={handlePrevStep}>
            <svg height="9" width="14">
              <path d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"></path>
            </svg>
          </ArrowsButton>
          <ArrowsButton onClick={handleNextStep}>
            <svg height="9" width="14">
              <path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"></path>
            </svg>
          </ArrowsButton>
        </ArrowsWrapper>
      </FormBuilderWrapper>
    </PageWrapper>
  );
}
