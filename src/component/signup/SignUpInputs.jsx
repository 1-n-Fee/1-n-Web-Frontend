import React, { useCallback, useEffect, useState } from "react";
import PhoneNumInput from "./PhoneNumInput";
import IdInput from "./IdInput";
import PwDupInput from "./PwDupInput";
import PwInput from "./PwInput";
import NickNameInput from "./NickNameInput";
import NameInput from "./NameInput";
import MajorSelect from "./MajorSelect";
import GenderRadioBtn from "./GenderRadioBtn";
// import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { COLOR } from "./../../constants/colors";
import {
  SubmitBtn,
  SignUpInputsWrapper,
  Title,
  InputWrapper,
} from "../style/SignUpStyle";

export const Key = {
  ID: "id",
  PW: "pw",
  IS_ID_AUTH_CHECKED: "isIdAuthChecked",
  IS_PW_DUP_CHECKED: "isPwDupChecked",
  PHONE_FIRST: "phoneFirst",
  PHONE_MID: "phoneMid",
  PHONE_LAST: "phoneLast",
  NAME: "name",
  NICKNAME: "nickname",
  IS_NICK_DUP_CHECKED: "isNickDupChecked",
  IS_NICK_DUP: "isDuplicated",
  MAJOR: "major",
  GENDER: "gender",
  GENDER_DATA: { male: "man", female: "woman" },
};
Object.freeze(Key);

const SignUpInputs = ({ authCode = null, accountType = "password" }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    [Key.ID]: "",
    [Key.PW]: "",
    [Key.IS_ID_AUTH_CHECKED]: false,
    [Key.IS_PW_DUP_CHECKED]: false,
    [Key.PHONE_FIRST]: "",
    [Key.PHONE_MID]: "",
    [Key.PHONE_LAST]: "",
    [Key.NAME]: "",
    [Key.NICKNAME]: "",
    [Key.IS_NICK_DUP_CHECKED]: false,
    [Key.IS_NICK_DUP]: false,
    [Key.MAJOR]: "",
    [Key.GENDER]: "",
  });

  const onSignUpBtnClick = () => {
    console.log(data);
    if (!isProperForm()) return;

    // form 규칙 통과 - 서버로 데이터 보내기
    const userData = {
      accountType: accountType,
      name: data[Key.NAME],
      phone: data[Key.PHONE_FIRST] + data[Key.PHONE_MID] + data[Key.PHONE_LAST],
      role: "student",
      nickname: data[Key.NICKNAME],
      email: `${data[Key.ID]}`,
      password: data[Key.PW],
      code: null,
      sexType:
        data[Key.GENDER] === Key.GENDER.male
          ? Key.GENDER.male
          : data[Key.GENDER] === Key.GENDER.female
          ? Key.GENDER.female
          : null,
      major: data[Key.MAJOR],
    };

    console.log(userData);

    if (authCode === null) {
      axios
        .post("http://localhost:8080/user/signup", userData)
        .then((response) => {
          alert("회원가입 되었습니다. 로그인 페이지로 이동합니다.");
          navigate("/login");
        })
        .catch((err) => console.log(err));
    } else {
      const oauthUserData = { ...userData, password: null, code: authCode };
      axios
        .post("http://localhost:8080/user/signup", oauthUserData)
        .then((response) => navigate("/login"))
        .catch((err) => alert("오류가 발생했습니다."));
    }
  };

  const isProperForm = useCallback(() => {
    // 입력 form 검증
    switch (true) {
      case data[Key.ID] === "":
        alert("아이디를 입력해주세요.");
        return false;

      case !data[Key.IS_ID_AUTH_CHECKED]:
        alert("아이디 인증이 필요합니다.");
        return false;

      case data[Key.PW] === "" && authCode === null:
        alert("비밀번호를 입력해주세요.");
        return false;

      case !data[Key.IS_PW_DUP_CHECKED] && authCode === null:
        alert("비밀번호와 비밀번호 중복체크가 불일치 합니다.");
        return false;

      case data[Key.PHONE_FIRST] === "":
      case data[Key.PHONE_MID].length !== 4:
      case data[Key.PHONE_LAST].length !== 4:
        alert("휴대폰 번호가 000-0000-0000 의 형태를 따르는지 확인해주세요.");
        return false;

      case data[Key.NAME] === "":
        alert("이름을 입력해주세요.");
        return false;

      case data[Key.NICKNAME] === "":
        alert("닉네임을 입력해주세요.");
        return false;

      case !data[Key.IS_NICK_DUP_CHECKED]:
        alert("닉네임 중복 확인이 필요합니다.");
        return false;

      case data[Key.IS_NICK_DUP]:
        alert("중복된 닉네임입니다. 다시 설정해주세요");
        return false;

      default:
        return true;
    }
  }, [data, authCode]);
  return (
    <SignUpInputsWrapper>
      <div>
        <InputWrapper height={"none"}>
          <Title>*건국대학교 아이디</Title>
          <IdInput
            idKey={Key.ID}
            authCheckKey={Key.IS_ID_AUTH_CHECKED}
            setData={setData}
          />
        </InputWrapper>
        {authCode === null && (
          <>
            <InputWrapper height={"70px"}>
              <Title>*비밀번호</Title>
              <PwInput pwKey={Key.PW} setData={setData} />
            </InputWrapper>

            <InputWrapper>
              <Title>*비밀번호 중복 확인</Title>
              <PwDupInput
                pw={data.pw}
                dupCheckKey={Key.IS_PW_DUP_CHECKED}
                setData={setData}
              />
            </InputWrapper>
          </>
        )}
        <InputWrapper>
          <Title>*이름</Title>
          <NameInput nameKey={Key.NAME} setData={setData} />
        </InputWrapper>

        <InputWrapper>
          <Title>*휴대폰 번호</Title>
          <PhoneNumInput
            firstKey={Key.PHONE_FIRST}
            midKey={Key.PHONE_MID}
            lastKey={Key.PHONE_LAST}
            setData={setData}
          />
        </InputWrapper>
        <InputWrapper height={"70px"}>
          <Title>*닉네임</Title>
          <NickNameInput
            nicknameKey={Key.NICKNAME}
            isDupCheckKey={Key.IS_NICK_DUP_CHECKED}
            isDupKey={Key.IS_NICK_DUP}
            setData={setData}
            min={2}
            max={8}
          />
        </InputWrapper>

        <InputWrapper>
          <Title>전공</Title>
          <MajorSelect majorKey={Key.MAJOR} setData={setData} />
        </InputWrapper>

        <InputWrapper>
          <Title>성별</Title>
          <GenderRadioBtn
            genderKey={Key.GENDER}
            genderData={Key.GENDER_DATA}
            setData={setData}
            data={data}
          />
        </InputWrapper>
      </div>
      <SubmitBtn onClick={onSignUpBtnClick}>
        {authCode === null ? `회원 가입하기` : `제출하기`}
      </SubmitBtn>
    </SignUpInputsWrapper>
  );
};

export default SignUpInputs;
