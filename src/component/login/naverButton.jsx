import React from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";
import CustomOauthBtn from "./CustomOauthBtn";
const NaverButton = ({ isSignUp = false, width, height, radius }) => {
  return (
    <ButtonWrapper href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=uD5deNWJiPwEgGJY2FO7&redirect_uri=http://localhost:3000/auth/naver&state=1234">
      {isSignUp ? (
        <CustomOauthBtn
          width={width}
          height={height}
          radius={radius}
          text={"네이버 회원가입"}
          color={COLOR.WHITE}
          bgColor={COLOR.NAVER_GREEN}
          icon={"naverIcon.png"}
          iconWidth={"40px"}
        />
      ) : (
        <ImgWrapper src="naver_btn.png" />
      )}
    </ButtonWrapper>
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
