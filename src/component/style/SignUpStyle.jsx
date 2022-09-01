import styled from "styled-components";
import { COLOR } from "../../constants/colors";

export const SignUpSelectStyle = styled.select`
  display: inline-block;
  width: ${({ width }) => (width === undefined ? "100px" : width)};
  border: none;
  outline: none;
  border-bottom: 1px solid ${COLOR.DARKER_GRAY};
  height: 30px;
  padding: 0 3px;
  font-size: 16px;
`;

export const SignUpInputStyle = styled.input`
  display: inline-block;
  width: ${({ width }) => (width === undefined ? "130px" : width)};
  border: none;
  outline: none;
  border-bottom: 1px solid ${COLOR.DARKER_GRAY};
  height: 30px;
  padding: 0 12px;
  font-size: 16px;
`;

export const SignUpWarningStyle = styled.input`
  display: inline-block;
`;
