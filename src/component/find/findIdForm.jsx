import React from "react";

const FindIdForm = ({ name, tel, onNameChange, onTelChange, findId }) => {
  return (
    <>
      <div>
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
      <button onClick={findId}>아이디 찾기</button>
    </>
  );
};

export default FindIdForm;
