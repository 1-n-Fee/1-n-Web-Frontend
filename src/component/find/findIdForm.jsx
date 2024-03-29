import React from "react";
import {
  InputContainer,
  InputWrapper,
  FindButton,
} from "../style/findFormStyle";

const FindIdForm = ({ name, phone, onNameChange, onPhoneChange, findId }) => {
  return (
    <>
      <InputContainer>
        <InputWrapper
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="이름"
        />
        <InputWrapper
          type="phone"
          value={phone}
          onChange={onPhoneChange}
          placeholder="전화번호"
        />
      </InputContainer>
      <FindButton onClick={findId}>아이디 찾기</FindButton>
    </>
  );
};

export default FindIdForm;
