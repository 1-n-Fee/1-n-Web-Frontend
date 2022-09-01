import styled from "styled-components";
import { COLOR } from "../../constants/colors";

const SignUpSelectStyle = styled.select`
  display: inline-block;
  width: ${({ width }) => (width === undefined ? "100px" : width)};
  border: none;
  outline: none;
  border-bottom: 1px solid ${COLOR.DARKER_GRAY};
  height: 30px;
  padding: 0 3px;
  font-size: 16px;
`;

export default SignUpSelectStyle;
