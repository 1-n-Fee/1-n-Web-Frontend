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
  return (
    <>
      <FormContainer>
        <IdInput />
        <PwInput />
        <LoginButton onClick={() => console.log("로그인 제출")} />
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
