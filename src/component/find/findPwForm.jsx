import React from "react";

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
      <div>
        <input
          type="text"
          value={id}
          onChange={onIdChange}
          placeholder="아이디"
        />
        <input
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="이름"
        />
        <input
          type="tel"
          value={tel}
          onChange={onTelChange}
          placeholder="전화번호"
        />
      </div>
      <button onClick={findPw}>비밀번호 찾기</button>
    </>
  );
};

export default FindPwForm;
