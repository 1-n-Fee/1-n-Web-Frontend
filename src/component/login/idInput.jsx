import React from "react";
import { useState } from "react";
import styled from "styled-components";
const IdInput = (props) => {
  const [idText, setIdText] = useState("");

  const onChange = (e) => {
    let value = e.target.value;
    setIdText(value);
  };
  return (
    <IdWrapper
      type="text"
      value={idText}
      onChange={onChange}
      placeholder="아이디"
      required
    />
  );
};

export default IdInput;

const IdWrapper = styled.input`
  width: 10rem;
  margin: 1.5rem;
  border: none;
  border-bottom: solid rgba(1, 1, 1, 0.2);
  border-width: 0.1em;
`;
