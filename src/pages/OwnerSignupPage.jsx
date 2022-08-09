import React from "react";
import styled from "styled-components";
import OwnerSignUpInputs from "../component/signup/ownerSignUp/OwnerSignUpInputs";

const OwnerSignupPage = () => {
  return (
    <SignUpPageWrapper>
      <h2>사업자 회원 가입</h2>
      <DetailInfo>* 표시 항목은 필수 입력 입니다.</DetailInfo>
      <OwnerSignUpInputs />
    </SignUpPageWrapper>
  );
};

export default OwnerSignupPage;

const SignUpPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailInfo = styled.span`
  display: inline-block;
  flex-grow: 1;
  align-self: flex-end;
  padding-right: 200px;
`;
