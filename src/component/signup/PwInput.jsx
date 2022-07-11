import React, { useState } from "react";
import { useEffect } from "react";

const PwInput = ({ pwKey, setData }) => {
  const [pw, setPw] = useState("");
  const [alertStr, setAlertStr] = useState("");
  const [isProperPw, setIsProperPw] = useState({
    length: false,
    spacialSym: false,
    number: false,
    alpha: false,
  });

  const onChange = (e) => {
    const value = e.target.value;
    const length = value.length >= 8 && value.length <= 15;
    const spacialSym = /[`~!@#$%^&*|\\'";:/?]+?/.test(value);
    const number = /[0-9]+?/.test(value);
    const alpha = /[A-z]+?/.test(value);

    setIsProperPw({
      length: length,
      spacialSym: spacialSym,
      number: number,
      alpha: alpha,
    });

    setPw(value);
  };
  useEffect(() => {
    isProperPw.length &&
    isProperPw.spacialSym &&
    isProperPw.number &&
    isProperPw.alpha
      ? setData((cur) => ({ ...cur, [pwKey]: pw }))
      : setData((cur) => ({ ...cur, [pwKey]: "" }));
  }, [isProperPw, pw, pwKey, setData]);

  useEffect(() => {
    let tempStrArr = [];
    const { length, spacialSym, number, alpha } = isProperPw;
    length || tempStrArr.push("8자 이상");
    spacialSym || tempStrArr.push("특수문자 포함");
    number || tempStrArr.push("숫자 포함");
    alpha || tempStrArr.push("알파벳 포함");
    tempStrArr.length === 0 || setAlertStr(tempStrArr.join(", "));
  }, [isProperPw]);

  return (
    <>
      <input type="password" value={pw} onChange={onChange} />
      {isProperPw.length &&
      isProperPw.spacialSym &&
      isProperPw.number &&
      isProperPw.alpha ? null : (
        <span>
          비밀번호는 <strong>{alertStr}</strong>이어야 합니다.
        </span>
      )}
    </>
  );
};

export default PwInput;
