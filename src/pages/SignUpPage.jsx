import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SignUpInputs from "../component/signup/SignUpInputs";
import { useRecoilValue } from "recoil";
import oauthDataAtom from "./../recoil/oauthData/atom";
import styled from "styled-components";
import Underline from "../component/common/Underline";
import { COLOR } from "../constants/colors";

const SignUpPage = () => {
  const { site } = useParams();
  const authCode = useRecoilValue(oauthDataAtom);

  useEffect(() => {
    console.log(site);
  }, []);
  return (
    <SignUpPageWrapper>
      {site !== undefined ? (
        <Title>{`${site}계정으로 회원 가입`}</Title>
      ) : (
        <Title>회원가입</Title>
      )}
      <Underline width={"600px"} />
      <ExplainSpan>* 표시 항목은 필수 입력 입니다.</ExplainSpan>
      {site !== undefined ? (
        <SignUpInputs authCode={authCode} accountType={site} />
      ) : (
        <SignUpInputs />
      )}
    </SignUpPageWrapper>
  );
};

export default SignUpPage;

const SignUpPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  width: 600px;
`;

const Title = styled.h2`
  margin: 10px 0 27px 0;
`;

const ExplainSpan = styled.span`
  display: block;
  font-size: 13px;
  color: ${COLOR.DARKER_GRAY};
  text-align: right;
  margin: 10px 3px;
  width: 100%;
`;
