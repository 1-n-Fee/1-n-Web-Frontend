import React from "react";
import SignUpInputs from "../component/signup/SignUpInputs";

const SignUpPage = () => {
  return (
    <div>
      <h2>회원 가입</h2>
      <span>* 표시 항목은 필수 입력 입니다.</span>
      <SignUpInputs />
    </div>
  );
};

export default SignUpPage;
