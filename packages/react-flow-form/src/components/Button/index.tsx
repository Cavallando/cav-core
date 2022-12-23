import React, { PropsWithChildren } from "react";
import { ButtonWrapper, Button as StyledButton } from "./styled";

export type ButtonProps = PropsWithChildren<{
  onClick: (e: React.SyntheticEvent) => void;
}>;

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <ButtonWrapper>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </ButtonWrapper>
  );
};
