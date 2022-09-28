import React from "react";
import {
  InputContainer,
  InputWrapper,
  FindButton,
} from "../style/findFormStyle";

const FindPwForm = ({
  email,
  name,
  phone,
  onEmailChange,
  onNameChange,
  onPhoneChange,
  findPw,
}) => {
  return (
    <>
      <InputContainer>
        <InputWrapper
          type="text"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일"
        />
        <InputWrapper
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="이름"
        />
        <InputWrapper
          type="tel"
          value={phone}
          onChange={onPhoneChange}
          placeholder="전화번호"
        />
      </InputContainer>
      <FindButton onClick={findPw}>비밀번호 찾기</FindButton>
    </>
  );
};

export default FindPwForm;
