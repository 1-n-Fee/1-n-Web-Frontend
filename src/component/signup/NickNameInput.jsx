import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const NickNameInput = ({ nicknameKey, isDupKey, setData, min, max }) => {
  const [nickname, setNickname] = useState("");
  const [isDupChecked, setIsDupChecked] = useState(null);
  //   const [isExist,setIsExist] = useState(f)

  const onChange = (e) => {
    let value = e.target.value;
    value = value.replace(/ /g, "");
    value = value.substr(0, 8);
    setNickname(value);
  };

  const onClick = () => {
    // 서버로 중복 여부 정보 보내기
    // 중복이면
    // 중복이 아니면
  };

  useEffect(() => {
    setData((cur) => ({
      ...cur,
      [nicknameKey]: nickname,
    }));
  }, [nickname]);

  useEffect(() => {
    // 중복 검사 통과 시
    if (isDupChecked) {
      setData((cur) => ({
        ...cur,
        [isDupKey]: isDupChecked,
      }));
    }
  }, [isDupChecked]);

  return (
    <>
      <input type="text" value={nickname} onChange={onChange} maxLength={max} />
      <button
        onClick={onClick}
        disabled={nickname.length < 2 || nickname.length > 8}
      >
        중복 확인
      </button>
      {nickname.length < 2 || nickname.length > 8 ? (
        <span>
          {min}자 이상 {max}자 이하로 입력해주세요✨
        </span>
      ) : null}

      {isDupChecked ? (
        <span>사용가능한 닉네임입니다</span>
      ) : isDupChecked === null ? null : (
        <span>이미 존재하는 닉네임입니다.</span>
      )}
    </>
  );
};

export default NickNameInput;
