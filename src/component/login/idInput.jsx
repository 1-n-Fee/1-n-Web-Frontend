import React from "react";
import { useState } from "react";
import styled from "styled-components";
const IdInput = (props) => {
  const [idText, setIdText] = useState("");

  const onChange = (e) => {
    let value = e.target.value;
    setIdText(value);
  };
  return (
    <input
      type="text"
      value={idText}
      onChange={onChange}
      placeholder="아이디"
      required
    />
  );
};

export default IdInput;
