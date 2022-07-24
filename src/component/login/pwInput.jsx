import React from "react";
import { useState } from "react";
import styled from "styled-components";
const PwInput = (props) => {
  const [pw, setPw] = useState("");

  const onChange = (e) => {
    const val = e.target.value;
    setPw(val);
  };
  return (
    <PwWrapper
      type="password"
      value={pw}
      onChange={onChange}
      placeholder="비밀번호"
      required
    />
  );
};

export default PwInput;

const PwWrapper = styled.input`
  width: 10rem;
  margin-bottom: 3rem;
  border: none;
  border-bottom: solid rgba(1, 1, 1, 0.2);
  border-width: 0.1em;
`;
