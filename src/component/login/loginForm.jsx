import React, { useState } from "react";
import IdInput from "./idInput";
import PwInput from "./pwInput";
import LoginButton from "./loginButton";
import KakaoButton from "./kakaoButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const LoginInput = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ id: "" }, { pw: "" });
  const onFindClick = () => {
    navigate("/find");
  };
  return (
    <>
      <div>
        <IdInput />
        <PwInput />
        <LoginButton onClick={() => console.log("로그인 제출")} />
        <KakaoButton />
      </div>
      <div>
        <span onClick={onFindClick}>아이디 찾기</span>
        <span onClick={onFindClick}>비밀번호 찾기</span>
      </div>
    </>
  );
};
