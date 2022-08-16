import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SignUpInputs from "../component/signup/SignUpInputs";
import { useRecoilValue } from "recoil";
import oauthDataAtom from "./../recoil/oauthData/atom";

const SignUpPage = () => {
  const { site } = useParams();
  const authCode = useRecoilValue(oauthDataAtom);

  useEffect(() => {
    console.log(site);
  }, []);
  return (
    <div>
      {site !== undefined ? (
        <h2>{`${site}계정으로 회원 가입`}</h2>
      ) : (
        <h2>회원가입</h2>
      )}
      <span>* 표시 항목은 필수 입력 입니다.</span>
      {site !== undefined ? (
        <SignUpInputs authCode={authCode} accountType={site} />
      ) : (
        <SignUpInputs />
      )}
    </div>
  );
};

export default SignUpPage;
