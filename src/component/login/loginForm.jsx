import React, { useState } from "react";
import IdInput from "./idInput";
import PwInput from "./pwInput";
import LoginButton from "./loginButton";
import KakaoButton from "./kakaoButton";
import NaverButton from "./naverButton";
import GoogleButton from "./googleButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const LoginForm = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ id: "" }, { pw: "" });
  const onFindIdClick = () => {
    navigate("/find/id");
  };
  const onFindPwClick = () => {
    navigate("/find/pw");
  };
  const onLogin = () => {
    navigate("/");
    // 유저가 로그인 되었는지 판단 필요
  };
  return (
    <>
      <FormContainer>
        <IdInput />
        <PwInput />
        <LoginButton onClick={onLogin} />
        <KakaoButton />
        <NaverButton />
        <GoogleButton />
      </FormContainer>
      <SpanContainer>
        <SpanWrapper onClick={onFindIdClick}>아이디 찾기</SpanWrapper>
        <SpanWrapper onClick={onFindPwClick}>비밀번호 찾기</SpanWrapper>
      </SpanContainer>
    </>
  );
};

export default LoginForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
`;
const SpanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;
const SpanWrapper = styled.div`
  cursor: pointer;
  &:hover {
    border-radius: 0.2rem;
    background-color: rgba(1, 1, 1, 0.2);
  }
  margin-bottom: 0.5rem;
`;
