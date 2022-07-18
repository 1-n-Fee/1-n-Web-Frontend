import React from "react";
import styled from "styled-components";

const StateTag = ({ string, color, bg }) => {
  return (
    <TagWrapper color={color} bg={bg}>
      <span>{string}</span>
    </TagWrapper>
  );
};

export default StateTag;

const TagWrapper = styled.div`
  display: inline-block;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
`;
