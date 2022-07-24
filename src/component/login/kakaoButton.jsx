import React from "react";
import styled from "styled-components";
const KakaoButton = (props) => {
  return (
    <ButtonWrapper
      //href="https://kauth.kakao.com/oauth/authorize?client_id=437bc2fb95b24ca5a80d5763e4619f54&redirect_uri=http://localhost:8080/oauth/kakao/callback&response_type=code"
      href="https://kauth.kakao.com/oauth/authorize?client_id=437bc2fb95b24ca5a80d5763e4619f54&redirect_uri=http://localhost:3000/auth/kakao&response_type=code"
      //onClick={onKakaoConnect}
    >
      <ImgWrapper src="kakao_btn.png" />
    </ButtonWrapper>
  );
};

export default KakaoButton;

const ButtonWrapper = styled.a`
  margin: 5px;
`;
const ImgWrapper = styled.img`
  width: 240px;
  height: 60px;
`;
