import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
const DupPwInput = ({
  pw,
  setDupPw,
  dupPwType,
  setDupPwType,
  dupCheckKey,
  setInputs,
  switchPwType,
}) => {
  const onChange = (e) => {
    const value = e.target.value;
    setInputs((cur) => ({ ...cur, [dupCheckKey]: value === pw }));
    setDupPw(value);
  };
  return (
    <>
      <span>새 비밀번호 확인</span>
      <input type={dupPwType.type} name="dupPw" onChange={onChange} />
      {dupPwType.visible ? (
        <FontAwesomeIcon
          icon={solid("eye")}
          onClick={() => switchPwType(dupPwType, setDupPwType)}
        />
      ) : (
        <FontAwesomeIcon
          icon={solid("eye-slash")}
          onClick={() => switchPwType(dupPwType, setDupPwType)}
        />
      )}
    </>
  );
};

export default DupPwInput;
