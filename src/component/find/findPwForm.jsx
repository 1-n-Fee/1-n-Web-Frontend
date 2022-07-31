import React from "react";
import {
  InputContainer,
  InputWrapper,
  FindButton,
} from "../style/findFormStyle";

const FindPwForm = ({
  id,
  name,
  tel,
  onIdChange,
  onNameChange,
  onTelChange,
  findPw,
}) => {
  return (
    <>
      <InputContainer>
        <InputWrapper
          type="text"
          value={id}
          onChange={onIdChange}
          placeholder="아이디"
        />
        <InputWrapper
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="이름"
        />
        <InputWrapper
          type="tel"
          value={tel}
          onChange={onTelChange}
          placeholder="전화번호"
        />
      </InputContainer>
      <FindButton onClick={findPw}>비밀번호 찾기</FindButton>
    </>
  );
};

export default FindPwForm;
