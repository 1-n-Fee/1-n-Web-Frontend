import styled from "styled-components";

const DropDownListStyle = styled.li`
height: ${({ height }) => height}px;
border-bottom: ${({ isLast }) => (isLast ? "none" : "0.3px solid #ced6e0;")};
&:hover {
  cursor: pointer;
  background-color: #ecf0f1;
  border-radius: ${({ isFirst, isLast, wrapperRadius }) =>
    isFirst
      ? `${wrapperRadius}px ${wrapperRadius}px 0 0`
      : isLast
      ? `0 0 ${wrapperRadius}px ${wrapperRadius}px`
      : "none"};

`;

export default DropDownListStyle;
