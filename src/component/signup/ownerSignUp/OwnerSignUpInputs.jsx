import React, { useState } from "react";
import styled from "styled-components";
import {
  SubmitBtn,
  Title,
  InputWrapper,
  SignUpInputsWrapper,
} from "../../style/SignUpStyle";
import IdInput from "../IdInput";
import NameInput from "../NameInput";
import NickNameInput from "../NickNameInput";
import PhoneNumInput from "../PhoneNumInput";
import PwDupInput from "../PwDupInput";
import PwInput from "../PwInput";

export const Key = {
  ID: "id",
  PW: "pw",
  IS_ID_AUTH_CHECKED: "isIdAuthChecked",
  IS_PW_DUP_CHECKED: "isPwDupChecked",
  PHONE_FIRST: "phoneFirst",
  PHONE_MID: "phoneMid",
  PHONE_LAST: "phoneLast",
  NAME: "name",
  STORE_NAME: "storeName",
  IS_STORE_DUP_CHECKED: "isStoreDupChecked",
  STORE_REGISTER_NUM: "storeRegisterNum",
};
Object.freeze(Key);
const OwnerSignUpInputs = () => {
  const [idData, setIdData] = useState({
    [Key.ID]: "",
    [Key.IS_ID_AUTH_CHECKED]: false,
  });

  const [pwData, setPWData] = useState({
    [Key.PW]: "",
    [Key.IS_PW_DUP_CHECKED]: false,
  });

  const [phoneData, setPhoneData] = useState({
    [Key.PHONE_FIRST]: "",
    [Key.PHONE_MID]: "",
    [Key.PHONE_LAST]: "",
  });

  const [nameData, setNameData] = useState({
    [Key.NAME]: "",
    [Key.STORE_NAME]: "",
    [Key.IS_STORE_DUP_CHECKED]: false,
  });

  const [storeRegisterNum, setStoreRegisterNum] = useState({
    [Key.STORE_REGISTER_NUM]: "",
  });

  const onSignUpBtnClick = () => {
    // 입력 form 검증
    // eslint-disable-next-line default-case
    switch (true) {
      case idData[Key.ID] === "":
        alert("아이디를 입력해주세요.");
        return;

      case !idData[Key.IS_ID_AUTH_CHECKED]:
        alert("아이디 인증이 필요합니다.");
        return;

      case pwData[Key.PW] === "":
        alert("비밀번호를 입력해주세요.");
        return;

      case !pwData[Key.IS_PW_DUP_CHECKED]:
        alert("비밀번호와 비밀번호 중복체크가 불일치 합니다.");
        return;

      case phoneData[Key.PHONE_FIRST] === "":
      case phoneData[Key.PHONE_MID].length !== 4:
      case phoneData[Key.PHONE_LAST].length !== 4:
        alert("휴대폰 번호가 000-0000-0000 의 형태를 따르는지 확인해주세요.");
        return;

      case nameData[Key.NAME] === "":
        alert("이름을 입력해주세요.");
        return;

      case nameData[Key.STORE_NAME] === "":
        alert("가게 이름을 입력해주세요.");
        return;

      case nameData[Key.IS_STORE_DUP_CHECKED] === null:
        alert("가게 이름 중복 확인이 필요합니다.");
        return;

      case nameData[Key.STORE_NAME] !== null &&
        !nameData[Key.IS_STORE_DUP_CHECKED]:
        alert("가게 이름을 새로 설정해주세요.");
        return;
      case storeRegisterNum[Key.STORE_REGISTER_NUM] === null:
        alert("사업자 등록번호를 입력해주세요.");
        return;
    }

    // form 규칙 통과 - 서버로 데이터 보내기
  };

  return (
    <SignUpInputsWrapper>
      <div>
        <InputWrapper>
          <Title>*이메일</Title>
          <IdInput
            idKey={Key.ID}
            authCheckKey={Key.IS_ID_AUTH_CHECKED}
            setData={setIdData}
            isOwner={true}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>*비밀번호</Title>
          <PwInput pwKey={Key.PW} setData={setPWData} />
        </InputWrapper>
        <InputWrapper>
          <Title>*비밀번호 중복 확인</Title>
          <PwDupInput
            pw={pwData.pw}
            dupCheckKey={Key.IS_PW_DUP_CHECKED}
            setData={setPWData}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>*이름</Title>
          <NameInput nameKey={Key.NAME} setData={setNameData} />
        </InputWrapper>
        <InputWrapper>
          <Title>*휴대폰 번호</Title>
          <PhoneNumInput
            firstKey={Key.PHONE_FIRST}
            midKey={Key.PHONE_MID}
            lastKey={Key.PHONE_LAST}
            setData={setPhoneData}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>*가게 이름</Title>
          <NickNameInput
            nicknameKey={Key.STORE_NAME}
            isDupKey={Key.IS_STORE_DUP_CHECKED}
            setData={setNameData}
            min={2}
            max={8}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>*사업자 등록 번호</Title>
          <NameInput
            nameKey={Key.STORE_REGISTER_NUM}
            setData={setStoreRegisterNum}
          />
        </InputWrapper>
      </div>

      <SubmitBtn onClick={onSignUpBtnClick}>회원 가입하기</SubmitBtn>
    </SignUpInputsWrapper>
  );
};

export default OwnerSignUpInputs;
// const SignUpInputsWrapper = styled.div`
//   width: 800px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;
// const Title = styled.h4`
//   display: inline-block;
//   width: 250px;
//   text-align: right;
//   padding-right: 20px;
// `;

// const SignUpBtn = styled.button`
//   width: 500px;
//   align-self: center;
// `;
