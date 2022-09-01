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
  width: ${({ width }) => (width === undefined ? "230px" : width)};
  border: none;
  outline: none;
  border-bottom: 1px solid ${COLOR.DARKER_GRAY};
  height: 30px;
  padding: 0 6px;
  font-size: 16px;
`;

export const SignUpWarningStyle = styled.span`
  display: inline-block;
  color: ${COLOR.DARKER_GRAY};
  font-size: 12px;
  padding: 4px;
`;

export const SignUpCheckBtnStyle = styled.button`
  margin: 0 5px;
  height: 30px;
  border-radius: 6px;
  font-weight: 600;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.NAVY};
  &:hover:enabled {
    background-color: ${COLOR.RED_PINK};
    color: ${COLOR.NAVY};
  }
  &:enabled {
    border: 2px solid ${COLOR.RED_PINK};
  }
`;

// &:disabled {
//   background-color: ${COLOR.LIGHT_GRAY};
// }
