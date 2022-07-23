import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ onSearchListener }) => {
  const [keyword, setKeyword] = useState("");
  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const onBtnClick = () => {
    onSearchListener(keyword);
  };

  return (
    <div>
      <Input type="text" value={keyword} onChange={onChange} />
      <SearchBtn onClick={onBtnClick}>🔎</SearchBtn>
    </div>
  );
};

export default SearchBar;

const height = 35;
const width = 250;

const Input = styled.input`
  display: inline-block;
  height: ${height}px;
  width: ${width}px;
  border-radius: ${height / 2}px 0 0 ${height / 2}px;
  border: none;
  border-right-width: 0px;
  padding: 3px 30px;
  font-size: 18px;
  outline: none;
  -webkit-appearance: none;
`;

const SearchBtn = styled.button`
  margin: 10px 0 10px 0;
  display: inline-block;
  height: ${height + 0.3}px;
  width: ${width / 4}px;
  border-radius: 0 ${height / 2}px ${height / 2}px 0;
  width: 50px;
  border: none;
  border-left: 0.5px dashed #ced6e0;
  &:hover {
    cursor: pointer;
    background-color: #a4b0be;
  }
`;
