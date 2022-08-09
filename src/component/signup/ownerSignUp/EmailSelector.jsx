import React from "react";
const emails = ["konkuk.ac.kr", "gmail.com", "naver.com"];
const DEFAULT = "이메일을 선택하세요";
const EmailSelector = ({ setEmail }) => {
  const onChange = (e) => {
    const value = e.target.value;
    value === DEFAULT ? setEmail("") : setEmail(value);
  };
  return (
    <>
      <select onChange={onChange}>
        <option name="placeholder" defaultValue={true}>
          {DEFAULT}
        </option>
        {emails.map((e, key) => (
          <option key={`email_${key}`} value={e}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};

export default EmailSelector;
