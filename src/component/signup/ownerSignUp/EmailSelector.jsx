import React from "react";
import { SignUpSelectStyle } from "./../../style/SignUpStyle";
const emails = ["konkuk.ac.kr", "gmail.com", "naver.com"];
const DEFAULT = "이메일 선택";
const EmailSelector = ({ setEmail }) => {
  const onChange = (e) => {
    const value = e.target.value;
    value === DEFAULT ? setEmail("") : setEmail(value);
  };
  return (
    <>
      <SignUpSelectStyle width={"120px"} fontSize={"14px"} onChange={onChange}>
        <option name="placeholder" defaultValue={true}>
          {DEFAULT}
        </option>
        {emails.map((e, key) => (
          <option key={`email_${key}`} value={e}>
            {e}
          </option>
        ))}
      </SignUpSelectStyle>
    </>
  );
};

export default EmailSelector;
