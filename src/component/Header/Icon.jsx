import React from "react";
import styled from "styled-components";

const Icon = ({ emoji, onClick = null, fontSize = "20px" }) => {
  return (
    <IconWrapper
      onClick={onClick}
      fontSize={fontSize}
      hasHoverEffect={onClick !== null}
    >
      <SpanWrapper>
        <Span>{emoji}</Span>
      </SpanWrapper>
    </IconWrapper>
  );
};

export default Icon;

const IconWrapper = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  font-size: ${({ fontSize }) => fontSize};
  border: 1px solid #ced6e0;
  margin: 3px 4px;
  background-color: white;
  text-align: center;
  &:hover {
    ${({ hasHoverEffect }) =>
      hasHoverEffect &&
      ` background-color: #ecf0f1;
    cursor: pointer;`}
  }
`;
const SpanWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Span = styled.span`
  display: inline-block;
  height:100%
  line-height: 100%;
`;
