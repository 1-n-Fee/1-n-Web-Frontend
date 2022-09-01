import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GoogleButton from "../component/login/googleButton";
import KakaoButton from "../component/login/kakaoButton";
import NaverButton from "../component/login/naverButton";
import { COLOR } from "./../constants/colors";

const width = "400px";
const height = "50px";
const radius = "8px";
const BeforeSignUpPage = () => {
  const navigate = useNavigate();
  const onSelfSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <BeforeSignUpWrapper>
      <Title>학생 회원가입</Title>
      <ExplainSpan>간단히 회원가입 하고 싶다면?</ExplainSpan>
      {/* <SubTitle>간편 회원가입</SubTitle> */}
      <KakaoButton
        isSignUp={true}
        width={width}
        height={height}
        radius={radius}
      />

      <GoogleButton
        isSignUp={true}
        width={width}
        height={height}
        radius={radius}
      />
      <NaverButton
        isSignUp={true}
        width={width}
        height={height}
        radius={radius}
      />
      <UnderLine width={"600px"}>
        <OR>또는</OR>
      </UnderLine>

      <SelfSignUpBtn
        onClick={onSelfSignUpClick}
        width={width}
        height={height}
        radius={radius}
      >
        직접 회원가입
      </SelfSignUpBtn>

      <ManagerLinkWrapper>
        <span>사업자이신가요?</span>
      </ManagerLinkWrapper>
      {/* <Link> 사업자이신가요? </Link> */}
    </BeforeSignUpWrapper>
  );
};

export default BeforeSignUpPage;

const BeforeSignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 40px;
`;

const ExplainSpan = styled.span`
  font-size: 13px;
  color: ${COLOR.DARKER_GRAY};
  padding: 10px;
`;

const Title = styled.h2`
  margin: 10px;
`;

// const SubTitle = styled.h4`
//   margin: 20px 7px 7px 7px;
// `;
const OR = styled.span`
  display: inline-block;
  position: relative;
  width: 50px;
  font-size: 12px;
  top: 8px;
  color: ${COLOR.DARK_GRAY};
  background-color: ${COLOR.WHITE};
`;

const UnderLine = styled.div`
  width: ${({ width }) => width};
  border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
  margin-bottom: 30px;
  position: relative;
`;

const SelfSignUpBtn = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius};
  color: ${COLOR.WHITE};
  background-color: ${COLOR.RED_PINK};
  font-weight: 600;
  line-height: 45px;
`;

const ManagerLinkWrapper = styled.div`
  margin: 25px 0 13px 0;
  font-size: 14px;
  color: ${COLOR.DARKER_GRAY};
`;
