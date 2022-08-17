import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../component/login/googleButton";
import KakaoButton from "../component/login/kakaoButton";
import NaverButton from "../component/login/naverButton";

const BeforeSignUpPage = () => {
  const navigate = useNavigate();
  const onSelfSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h4>회원가입</h4>
      <button onClick={onSelfSignUpClick}>직접 회원가입</button>
      <KakaoButton />
      <NaverButton />
      <GoogleButton />
    </div>
  );
};

export default BeforeSignUpPage;
