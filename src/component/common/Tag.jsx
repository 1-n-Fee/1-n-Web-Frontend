import React from "react";
import styled from "styled-components";

const Tag = ({ title, isClicked, dataKey, onClick }) => {
  return (
    <>
      <Span isclicked={isClicked} data-key={dataKey} onClick={onClick}>
        {title}
      </Span>
    </>
  );
};

export default Tag;

const Span = styled.span`
  display: inline-block;
  background-color: ${({ isclicked }) => (isclicked ? "#f35a3c" : "#8f847e")};
  border-radius: 15px;
  padding: 5px 10px;
  margin: 0 2px;
  font-weight: 600;
  font-size: 14px;
  color: #1e272e;
  &:hover {
    cursor: pointer;
  }
`;
