import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -8px;
  margin-right: -8px;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  color: #fff;
  background: none;
  font-size: 28px;
  transition: all 0.2s ease;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 1px;
  padding: 0px 24px 12px 0px;
  &:focus {
    box-shadow: rgb(255, 255, 255) 0px 2px;
  }
`;
