import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import loginDataAtom from "../../recoil/loginData/atom";
const IdInput = (props) => {
  const [loginData, setLoginData] = useRecoilState(loginDataAtom);
  const { email } = loginData;
  const onChange = (e) => {
    let value = e.target.value;
    setLoginData((cur) => ({ ...cur, email: value }));
  };
  return (
    <IdWrapper
      type="text"
      value={email}
      onChange={onChange}
      placeholder="이메일"
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
