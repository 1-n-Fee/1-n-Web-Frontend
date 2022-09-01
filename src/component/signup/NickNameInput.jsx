import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  SignUpInputStyle,
  SignUpWarningStyle,
  SignUpCheckBtnStyle,
} from "./../style/SignUpStyle";
import styled from "styled-components";

const NickNameInput = ({
  nicknameKey,
  isDupCheckKey,
  isDupKey,
  setData,
  min,
  max,
}) => {
  const [nickname, setNickname] = useState("");
  const [isDupChecked, setIsDupChecked] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);

  const onChange = (e) => {
    let value = e.target.value;
    value = value.replace(/ /g, "");
    value = value.substr(0, 8);
    setNickname(value);
    setIsDupChecked(false);
  };

  const onClick = async () => {
    // 서버로 중복 여부 정보 보내기
    try {
      const response = await axios.get(
        `http://localhost:8080/user/duplication/nickname/${nickname}`
      );
      setIsDuplicated(response.data.isDuplication);
      setIsDupChecked(true);
      // console.log(response);
    } catch (err) {
      console.log(err);
      alert("중복 확인에서 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsDupChecked(true);
    }
  };

  useEffect(() => {
    setData((cur) => ({
      ...cur,
      [isDupCheckKey]: isDupChecked,
      [isDupKey]: isDuplicated,
      [nicknameKey]: nickname,
    }));
  }, [isDuplicated, isDupChecked]);

  return (
    <NickNameInputWrapper>
      <div>
        <SignUpInputStyle
          type="text"
          value={nickname}
          onChange={onChange}
          maxLength={max}
        />
        <SignUpCheckBtnStyle
          onClick={onClick}
          disabled={nickname.length < 2 || nickname.length > 8 || isDupChecked}
        >
          중복 확인
        </SignUpCheckBtnStyle>
      </div>
      {nickname.length < 2 || nickname.length > 8 ? (
        <SignUpWarningStyle>
          <strong>{min}자</strong> 이상 <strong>{max}자</strong> 이하로
          입력해주세요✨
        </SignUpWarningStyle>
      ) : null}

      {isDupChecked && !isDuplicated ? (
        <SignUpWarningStyle>사용가능한 닉네임입니다😀</SignUpWarningStyle>
      ) : isDupChecked && isDuplicated ? (
        <SignUpWarningStyle>이미 존재하는 닉네임입니다😥</SignUpWarningStyle>
      ) : null}
    </NickNameInputWrapper>
  );
};

export default NickNameInput;

const NickNameInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
