import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EmailSelector from "./ownerSignUp/EmailSelector";

const IdInput = ({ idKey, authCheckKey, setData, isOwner = false }) => {
  const [id, setId] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isIdDup, setIsIdDup] = useState(false);
  const onChange = (e) => {
    setId(e.target.value);
    setIsAuthChecked(false);
  };

  const onClick = (e) => {
    // 서버에 데이터 보내기 전 예외처리
    if (id === "") {
      alert("이메일 앞부분을 입력해주세요!");
      return;
    }

    if (emailAddress === "" && isOwner) {
      alert("이메일 주소를 선택해주세요!");
      return;
    }

    // 중복확인 통과 안했으면

    // 중복확인 통과했으면
    setIsAuthChecked(true);
  };

  useEffect(() => {
    setData((curData) => ({
      ...curData,
      [idKey]: isOwner ? `${id}@${emailAddress}` : id,
      [authCheckKey]: isAuthChecked,
    }));
  }, [authCheckKey, id, idKey, isAuthChecked, setData, emailAddress, isOwner]);

  return (
    <>
      <input type="text" onChange={onChange} value={id} />
      <span>@</span>
      {isOwner ? (
        <EmailSelector setEmail={setEmailAddress} />
      ) : (
        <span>konkuk.ac.kr</span>
      )}

      <button onClick={onClick} disabled={id.length === 0}>
        인증하기
      </button>
      <AuthCheckTextWrapper>
        {isAuthChecked && !isIdDup ? (
          <span>인증 완료!✅</span>
        ) : isAuthChecked && isIdDup ? (
          <span>사용할 수 없는 아이디입니다🚫</span>
        ) : null}
      </AuthCheckTextWrapper>
    </>
  );
};

export default IdInput;

const AuthCheckTextWrapper = styled.div`
  text-align: center;
`;
