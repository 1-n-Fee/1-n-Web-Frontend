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
const height = 22;
const TagWrapper = styled.div`
  display: inline-block;
  margin: 0 2px;
  padding: 0 8px;
  height: ${height}px;
  border-radius: ${height / 2}px;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  font-size: 13px;
  line-height: ${height}px;
  text-align: center;
`;
