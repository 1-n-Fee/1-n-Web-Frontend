import styled from "styled-components";
import { COLOR } from "../../constants/colors";

const SignUpInputStyle = styled.input`
  display: inline-block;
  width: ${({ width }) => (width === undefined ? "130px" : width)};
  border: none;
  outline: none;
  border-bottom: 1px solid ${COLOR.DARKER_GRAY};
  height: 30px;
  padding: 0 12px;
  font-size: 16px;
`;

export default SignUpInputStyle;
