import React from "react";
import styled from "styled-components";

const Icon = ({ emoji, onClick }) => {
  return (
    <IconWrapper onClick={onClick}>
      <Span>{emoji}</Span>
    </IconWrapper>
  );
};

export default Icon;

const IconWrapper = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid gray;
  margin: 3px 4px;
`;

const Span = styled.span`
  display: inline-block;
  padding: 15px;
`;
