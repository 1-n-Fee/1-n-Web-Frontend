import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";
import CustomOauthBtn from "./CustomOauthBtn";
const GoogleButton = ({
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
        <ButtonWrapper href="https://accounts.google.com/o/oauth2/v2/auth?client_id=63234602229-u49a73vg77uch12osuh9egbp6vmshsps.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile">
          {isSignUp ? (
            <>
              <CustomOauthBtn
                width={width}
                height={height}
                radius={radius}
                text={"구글 회원가입"}
                color={COLOR.NAVY}
                bgColor={COLOR.WHITE}
                borderColor={COLOR.GOOGLE_SKYBLUE}
                icon={"/googleIcon.png"}
                iconWidth={"30px"}
              />
            </>
          ) : (
            <CustomOauthBtn
              width="400px"
              height="50px"
              radius="8px"
              text={"구글 로그인"}
              color={COLOR.NAVY}
              bgColor={COLOR.WHITE}
              borderColor={COLOR.GOOGLE_SKYBLUE}
              icon={"/googleIcon.png"}
              iconWidth={"30px"}
            />
          )}
        </ButtonWrapper>
      ) : (
        <ButtonWrapper href="https://accounts.google.com/o/oauth2/v2/auth?client_id=63234602229-u49a73vg77uch12osuh9egbp6vmshsps.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/manager/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile">
          {isSignUp ? (
            <>
              <CustomOauthBtn
                width={width}
                height={height}
                radius={radius}
                text={"구글 회원가입"}
                color={COLOR.NAVY}
                bgColor={COLOR.WHITE}
                borderColor={COLOR.GOOGLE_SKYBLUE}
                icon={"googleIcon.png"}
                iconWidth={"30px"}
              />
            </>
          ) : (
            <CustomOauthBtn
              width="400px"
              height="50px"
              radius="8px"
              text={"구글 로그인"}
              color={COLOR.NAVY}
              bgColor={COLOR.WHITE}
              borderColor={COLOR.GOOGLE_SKYBLUE}
              icon={"/googleIcon.png"}
              iconWidth={"30px"}
            />
          )}
        </ButtonWrapper>
      )}
    </>
  );
};

export default GoogleButton;

const ButtonWrapper = styled.a`
  margin: 5px;
  text-decoration: none;
`;
const ImgWrapper = styled.img`
  width: 12rem;
  height: auto;
`;
