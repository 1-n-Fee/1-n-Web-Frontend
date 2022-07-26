import styled from "styled-components";

const DropDownWrapperStyle = styled.div`
  position: absolute;
  right: 10px;
  background-color: white;
  z-index: 10;
  border-radius: ${({ radius }) => `${radius}`}px;
  min-width: ${({ minWidth }) => `${minWidth}px`};
`;

export default DropDownWrapperStyle;
