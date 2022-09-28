import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
const NewPwInput = ({
  pwKey,
  setNewPw,
  setInputs,
  newPwType,
  setNewPwType,
  switchPwType,
}) => {
  const onChange = (e) => {
    // TODO: 비밀번호 규칙 조건 추가 (signUp 컴포넌트 import)
    const value = e.target.value;
    setNewPw(value);
    setInputs((cur) => ({ ...cur, [pwKey]: value }));
  };
  return (
    <>
      <span>새 비밀번호</span>
      <input type={newPwType.type} name="newPw" onChange={onChange} />
      {newPwType.visible ? (
        <FontAwesomeIcon
          icon={solid("eye")}
          onClick={() => switchPwType(newPwType, setNewPwType)}
        />
      ) : (
        <FontAwesomeIcon
          icon={solid("eye-slash")}
          onClick={() => switchPwType(newPwType, setNewPwType)}
        />
      )}
    </>
  );
};

export default NewPwInput;
