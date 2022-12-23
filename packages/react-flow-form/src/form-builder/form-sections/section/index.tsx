import React, { forwardRef } from "react";
import { SectionWrapper, Text } from "./styled";
import { Button } from "../../form-components";
import { StepContent } from "../../form-types/step";

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

const Section = forwardRef(SectionInner);
export default Section;
