import React, { forwardRef } from "react";
import { Button } from "../Button";
import { StepContent } from "../Step";
import { SectionWrapper, Text } from "./styled";

type SectionProps = {
  content: StepContent[];
  onNextStep: () => void;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
};

function SectionInner(
  { content, onNextStep, hideNextButton = false }: SectionProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <SectionWrapper ref={ref}>
      {content.map((item, index) =>
        item.type === "text" ? <Text key={index}>{item.value}</Text> : undefined
      )}
      {!hideNextButton && <Button onClick={onNextStep}>Sure</Button>}
    </SectionWrapper>
  );
}

export const Section = forwardRef(SectionInner);
