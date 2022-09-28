import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SignUpInputs from "../component/signup/SignUpInputs";
import { useRecoilValue } from "recoil";
import oauthDataAtom from "./../recoil/oauthData/atom";
import styled from "styled-components";
import Underline from "../component/common/Underline";
import { COLOR } from "../constants/colors";
import {
  H2,
  SignUpPageWrapper,
  SignUpPageExplainSpan,
} from "../component/style/SignUpStyle";

const SignUpPage = () => {
  const { site } = useParams();
  const authCode = useRecoilValue(oauthDataAtom);

  useEffect(() => {
    console.log(site);
  }, []);
  return (
    <SignUpPageWrapper>
      {site !== undefined ? (
        <H2>{`${site}계정으로 회원 가입`}</H2>
      ) : (
        <H2>회원가입</H2>
      )}
      <Underline width={"600px"} />
      <SignUpPageExplainSpan>
        * 표시 항목은 필수 입력 입니다.
      </SignUpPageExplainSpan>
      {site !== undefined ? (
        <SignUpInputs authCode={authCode} accountType={site} />
      ) : (
        <SignUpInputs />
      )}
    </SignUpPageWrapper>
  );
};

export default SignUpPage;
