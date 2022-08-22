import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import loginDataAtom from "../../recoil/loginData/atom";

const PwInput = (props) => {
  const [loginData, setLoginData] = useRecoilState(loginDataAtom);
  const { password } = loginData;
  const onChange = (e) => {
    const value = e.target.value;
    setLoginData((cur) => ({ ...cur, password: value }));
  };
  return (
    <PwWrapper
      type="password"
      value={password}
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
