import React, { useState } from "react";
import IdInput from "./idInput";
import PwInput from "./pwInput";
import LoginButton from "./loginButton";
import KakaoButton from "./kakaoButton";
import NaverButton from "./naverButton";
import GoogleButton from "./googleButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import loginDataAtom from "../../recoil/loginData/atom";
import axios from "axios";
import isLoginDataAtom from "../../recoil/isLogin/atom";

const LoginForm = (props) => {
  const setIsLogin = useSetRecoilState(isLoginDataAtom);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useRecoilState(loginDataAtom);
  const onFindIdClick = () => {
    navigate("/find/id");
  };
  const onFindPwClick = () => {
    navigate("/find/pw");
  };
  const onLogin = () => {
    const { email, password } = loginData;
    const check = checkData(email, password);
    if (check) {
      login();
    }
    //navigate("/");
  };
  const checkData = (email, password) => {
    if (email && password) return true;
    console.log("didnt pass check");
    return false;
  };
  const login = async () => {
    const { email, password } = loginData;
    await axios
      .post("http://localhost:8080/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("Authorization", res.headers.authorization);
          setIsLogin(true);
          alert("로그인에 성공했습니다");
          navigate("/");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        const errorKey = e.response.data.errorCode;
        switch (errorKey) {
          case "L002":
            alert(e.response.data.message);
            break;
          default:
            alert("예상하지 못한 오류가 발생했습니다!");
            console.log(`예외 처리되지 않은 errorCode! ${errorKey}`);
        }
      });
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
        <SpanWrapper onClick={onFindIdClick}>이메일 찾기</SpanWrapper>
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
