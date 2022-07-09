import React, { useState, useEffect } from "react";

const IdInput = ({ idKey, authCheckKey, setData }) => {
  const [id, setId] = useState("");
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const onChange = (e) => {
    setId(e.target.value);
  };

  const onClick = (e) => {
    // 서버에 데이터 보내기

    // 중복확인 통과 안했으면

    // 중복확인 통과했으면
    setIsAuthChecked(true);
  };

  useEffect(() => {
    setData((curData) => ({
      ...curData,
      [idKey]: id,
      [authCheckKey]: isAuthChecked,
    }));
  }, [authCheckKey, id, idKey, isAuthChecked, setData]);

  return (
    <>
      <input type="text" onChange={onChange} value={id} />
      <button onClick={onClick}>인증하기</button>
      {isAuthChecked ? <span>인증 완료!✅</span> : null}
    </>
  );
};

export default IdInput;
