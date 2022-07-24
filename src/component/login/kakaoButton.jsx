import React from "react";
import styled from "styled-components";
const KakaoButton = (props) => {
  return (
    <a
      //href="https://kauth.kakao.com/oauth/authorize?client_id=437bc2fb95b24ca5a80d5763e4619f54&redirect_uri=http://localhost:8080/oauth/kakao/callback&response_type=code"
      href="https://kauth.kakao.com/oauth/authorize?client_id=437bc2fb95b24ca5a80d5763e4619f54&redirect_uri=http://localhost:3000/auth/kakao&response_type=code"
      //onClick={onKakaoConnect}
    >
      <img src="kakao_btn.png" />
    </a>
  );
};

export default KakaoButton;
