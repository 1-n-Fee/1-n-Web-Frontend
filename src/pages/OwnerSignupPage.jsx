import React from "react";
import styled from "styled-components";
import Underline from "../component/common/Underline";
import OwnerSignUpInputs from "../component/signup/ownerSignUp/OwnerSignUpInputs";
import {
  H2,
  SignUpPageExplainSpan,
  SignUpPageWrapper,
} from "../component/style/SignUpStyle";

const OwnerSignupPage = () => {
  return (
    <SignUpPageWrapper>
      <H2>사업자 회원 가입</H2>
      <Underline width={"600px"} />
      <SignUpPageExplainSpan>
        * 표시 항목은 필수 입력 입니다.
      </SignUpPageExplainSpan>
      <OwnerSignUpInputs />
    </SignUpPageWrapper>
  );
};

export default OwnerSignupPage;
