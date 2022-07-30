import React, { useEffect, useRef } from "react";
import UserInfoAccordion from "../component/userInfo/userInfoAccordion";
import { useState } from "react";
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
const UserInfo = (props) => {
  // TODO: 서버에 있는 사용자 정보 가져와서 data에 초기화
  const [data, setData] = useState({
    [Key.ID]: "",
    [Key.PW]: "asdf@",
    [Key.IS_ID_AUTH_CHECKED]: true,
    [Key.IS_PW_DUP_CHECKED]: false,
    [Key.PHONE_FIRST]: "",
    [Key.PHONE_MID]: "",
    [Key.PHONE_LAST]: "",
    [Key.NAME]: "홍길동",
    [Key.NICKNAME]: "길동",
    [Key.IS_NICK_DUP_CHECKED]: false,
    [Key.MAJOR]: "",
    [Key.GENDER]: "",
  });
  const [orgData, setOrgData] = useState({
    [Key.ID]: "",
    [Key.PW]: "asdf@",
    [Key.IS_ID_AUTH_CHECKED]: true,
    [Key.IS_PW_DUP_CHECKED]: false,
    [Key.PHONE_FIRST]: "",
    [Key.PHONE_MID]: "",
    [Key.PHONE_LAST]: "",
    [Key.NAME]: "홍길동",
    [Key.NICKNAME]: "길동",
    [Key.IS_NICK_DUP_CHECKED]: false,
    [Key.MAJOR]: "",
    [Key.GENDER]: "",
  });
  useEffect(() => {
    // TODO: 서버에서 유저 정보 가져오기
    // data, orgData update
  }, []);
  return (
    <UserInfoAccordion
      Key={Key}
      data={data}
      setData={setData}
      orgData={orgData}
    />
  );
};

export default UserInfo;
