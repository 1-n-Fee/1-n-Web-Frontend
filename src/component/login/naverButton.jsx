import React, { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";
import CustomOauthBtn from "./CustomOauthBtn";
const NaverButton = ({
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
        <ButtonWrapper href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=uD5deNWJiPwEgGJY2FO7&redirect_uri=http://localhost:3000/auth/naver&state=1234">
          {isSignUp ? (
            <CustomOauthBtn
              width={width}
              height={height}
              radius={radius}
              text={"네이버 회원가입"}
              color={COLOR.WHITE}
              bgColor={COLOR.NAVER_GREEN}
              icon={"/naverIcon.png"}
              iconWidth={"40px"}
            />
          ) : (
            <CustomOauthBtn
              width="400px"
              height="50px"
              radius="8px"
              text={"네이버 로그인"}
              color={COLOR.WHITE}
              bgColor={COLOR.NAVER_GREEN}
              icon={"/naverIcon.png"}
              iconWidth={"40px"}
            />
          )}
        </ButtonWrapper>
      ) : (
        <ButtonWrapper href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=uD5deNWJiPwEgGJY2FO7&redirect_uri=http://localhost:3000/auth/manager/naver&state=1234">
          {isSignUp ? (
            <CustomOauthBtn
              width={width}
              height={height}
              radius={radius}
              text={"네이버 회원가입"}
              color={COLOR.WHITE}
              bgColor={COLOR.NAVER_GREEN}
              icon={"/naverIcon.png"}
              iconWidth={"40px"}
            />
          ) : (
            <CustomOauthBtn
              width="400px"
              height="50px"
              radius="8px"
              text={"네이버 로그인"}
              color={COLOR.WHITE}
              bgColor={COLOR.NAVER_GREEN}
              icon={"/naverIcon.png"}
              iconWidth={"40px"}
            />
          )}
        </ButtonWrapper>
      )}
    </>
  );
};

export default NaverButton;

const ButtonWrapper = styled.a`
  margin: 5px;
  text-decoration: none;
`;
const ImgWrapper = styled.img`
  width: 11.5rem;
  height: auto;
`;
