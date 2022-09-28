import React, { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";
import CustomOauthBtn from "./CustomOauthBtn";
const KakaoButton = ({
  type = "student",
  isSignUp = false,
  width,
  height,
  radius,
}) => {
  useEffect(() => {
    if (isSignUp) {
      localStorage.setItem("isSignUp", "true");
    }
  }, []);
  return (
    <>
      {type === "student" ? (
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
              icon={"/kakaoIcon.png"}
              iconWidth={"40px"}
            />
          ) : (
            <CustomOauthBtn
              width="400px"
              height="50px"
              radius="8px"
              text={"카카오 로그인"}
              color={COLOR.KAKAO_BROWN}
              bgColor={COLOR.KAKAO_YELLOW}
              icon={"/kakaoIcon.png"}
              iconWidth={"40px"}
            />
          )}
        </ButtonWrapper>
      ) : (
        <ButtonWrapper
          //href="https://kauth.kakao.com/oauth/authorize?client_id=437bc2fb95b24ca5a80d5763e4619f54&redirect_uri=http://localhost:8080/oauth/kakao/callback&response_type=code"
          href="https://kauth.kakao.com/oauth/authorize?client_id=437bc2fb95b24ca5a80d5763e4619f54&redirect_uri=http://localhost:3000/auth/manager/kakao&response_type=code"
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
              icon={"/kakaoIcon.png"}
              iconWidth={"40px"}
            />
          ) : (
            <CustomOauthBtn
              width="400px"
              height="50px"
              radius="8px"
              text={"카카오 로그인"}
              color={COLOR.KAKAO_BROWN}
              bgColor={COLOR.KAKAO_YELLOW}
              icon={"/kakaoIcon.png"}
              iconWidth={"40px"}
            />
          )}
        </ButtonWrapper>
      )}
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
