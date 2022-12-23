import React, { PropsWithChildren } from "react";
import { Button as StyledButton, ButtonWrapper } from "./styled";

type ButtonProps = PropsWithChildren<{
  onClick: (e: React.SyntheticEvent) => void;
}>;

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <ButtonWrapper>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </ButtonWrapper>
  );
};

export default Button;
