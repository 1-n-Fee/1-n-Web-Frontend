import React from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";
import CustomOauthBtn from "./CustomOauthBtn";
const KakaoButton = ({ isSignUp = false, width, height, radius }) => {
  return (
    <>
      <ButtonWrapper
        //href="https://kauth.kakao.com/oauth/authorize?client_id=437bc2fb95b24ca5a80d5763e4619f54&redirect_uri=http://localhost:8080/oauth/kakao/callback&response_type=code"
        href="https://kauth.kakao.com/oauth/authorize?client_id=437bc2fb95b24ca5a80d5763e4619f54&redirect_uri=http://localhost:3000/auth/kakao&response_type=code"
        //onClick={onKakaoConnect}
      >
        {isSignUp ? (
          <CustomOauthBtn
            width={width}
            height={height}
            radius={radius}
            text={"카카오 회원가입"}
            color={COLOR.KAKAO_BROWN}
            bgColor={COLOR.KAKAO_YELLOW}
            icon={"kakaoIcon.png"}
            iconWidth={"40px"}
          />
        ) : (
          <ImgWrapper src="kakao_btn.png" />
        )}
      </ButtonWrapper>
    </>
  );
};

export default KakaoButton;

const ButtonWrapper = styled.a`
  margin: 5px;
  text-decoration: none;
`;
const ImgWrapper = styled.img`
  width: 11.5rem;
  height: auto;
`;
