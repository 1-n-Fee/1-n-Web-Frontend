import React, { useEffect, useState } from "react";
import PhoneNumInput from "./PhoneNumInput";
import IdInput from "./IdInput";
import PwDupInput from "./PwDupInput";
import PwInput from "./PwInput";
import NickNameInput from "./NickNameInput";
import NameInput from "./NameInput";
import MajorSelect from "./MajorSelect";
import GenderRadioBtn from "./GenderRadioBtn";
import styled from "styled-components";

const Key = {
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
  MAJOR: "major",
  GENDER: "gender",
  GENDER_DATA: { male: "male", female: "female" },
};
Object.freeze(Key);

const SignUpInputs = () => {
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
    [Key.MAJOR]: "",
    [Key.GENDER]: "",
  });

  const onSignUpBtnClick = () => {
    // 입력 form 검증
    switch (true) {
      case data[Key.ID] === "":
        alert("아이디를 입력해주세요.");
        return;

      case !data[Key.IS_ID_AUTH_CHECKED]:
        alert("아이디 인증이 필요합니다.");
        return;

      case data[Key.PW] === "":
        alert("비밀번호를 입력해주세요.");
        return;

      case !data[Key.IS_PW_DUP_CHECKED]:
        alert("비밀번호와 비밀번호 중복체크가 불일치 합니다.");
        return;

      case data[Key.PHONE_FIRST] === "":
      case data[Key.PHONE_MID].length !== 4:
      case data[Key.PHONE_LAST].length !== 4:
        alert("휴대폰 번호가 000-0000-0000 의 형태를 따르는지 확인해주세요.");
        return;

      case data[Key.NAME] === "":
        alert("이름을 입력해주세요.");
        return;

      case data[Key.NICKNAME] === "":
        alert("닉네임을 입력해주세요.");
        return;

      case data[Key.IS_NICK_DUP_CHECKED] === null:
        alert("닉네임 중복 확인이 필요합니다.");
        return;

      case data[Key.IS_NICK_DUP_CHECKED] !== null &&
        !data[Key.IS_NICK_DUP_CHECKED]:
        alert("닉네임을 새로 설정해주세요.");
        return;
    }

    // form 규칙 통과 - 서버로 데이터 보내기
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <div>
        <Title>*건국대학교 아이디</Title>
        <IdInput
          idKey={Key.ID}
          authCheckKey={Key.IS_ID_AUTH_CHECKED}
          setData={setData}
        />
      </div>

      <div>
        <Title>*비밀번호</Title>
        <PwInput pwKey={Key.PW} setData={setData} />
      </div>

      <div>
        <Title>*비밀번호 중복 확인</Title>
        <PwDupInput
          pw={data.pw}
          dupCheckKey={Key.IS_PW_DUP_CHECKED}
          setData={setData}
        />
      </div>

      <div>
        <Title>*이름</Title>
        <NameInput nameKey={Key.NAME} setData={setData} />
      </div>

      <div>
        <Title>*휴대폰 번호</Title>
        <PhoneNumInput
          firstKey={Key.PHONE_FIRST}
          midKey={Key.PHONE_MID}
          lastKey={Key.PHONE_LAST}
          setData={setData}
        />
      </div>
      <div>
        <Title>*닉네임</Title>
        <NickNameInput
          nicknameKey={Key.NICKNAME}
          isDupKey={Key.IS_NICK_DUP_CHECKED}
          setData={setData}
          min={2}
          max={8}
        />
      </div>

      <div>
        <Title>전공</Title>
        <MajorSelect majorKey={Key.MAJOR} setData={setData} />
      </div>

      <div>
        <Title>성별</Title>
        <GenderRadioBtn
          genderKey={Key.GENDER}
          genderData={Key.GENDER_DATA}
          setData={setData}
        />
      </div>
      <div>
        <button onClick={onSignUpBtnClick}>회원 가입하기</button>
      </div>
    </div>
  );
};

export default SignUpInputs;

const Title = styled.h4`
  display: inline-block;
`;
