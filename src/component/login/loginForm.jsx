import React, { useState } from "react";
import IdInput from "./idInput";
import PwInput from "./pwInput";
import LoginButton from "./loginButton";
import KakaoButton from "./kakaoButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const LoginForm = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ id: "" }, { pw: "" });
  const onFindClick = () => {
    navigate("/find");
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
      </FormContainer>
      <SpanContainer>
        <span onClick={onFindClick}>아이디 찾기</span>
        <span onClick={onFindClick}>비밀번호 찾기</span>
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
