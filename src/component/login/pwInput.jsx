import React from "react";
import { useState } from "react";
import styled from "styled-components";
const PwInput = (props) => {
  const [pw, setPw] = useState("");

  const onChange = (e) => {
    const val = e.target.value;
    setPw(val);
  };
  return (
    <input
      type="password"
      value={pw}
      onChange={onChange}
      placeholder="비밀번호"
      required
    />
  );
};

export default PwInput;
