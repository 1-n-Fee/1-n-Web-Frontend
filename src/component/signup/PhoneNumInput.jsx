import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SignUpInputStyle, SignUpSelectStyle } from "./../style/SignUpStyle";

const PhoneNumInput = ({
  firstKey,
  midKey,
  lastKey,
  setData,
  firstNums = ["010", "011", "016", "017"],
}) => {
  const [firstNum, setFirstNum] = useState(firstNums[0]);
  const [midNum, setMidNum] = useState("");
  const [lastNum, setLastNum] = useState("");

  const onFirstNumChange = (e) => {
    setFirstNum(e.target.value);
  };
  const onMidNumChange = (e) => {
    const value = e.target.value;
    setMidNum(value.replace(/[^0-9]/gi, ""));
  };

  const onLastNumChange = (e) => {
    const value = e.target.value;
    setLastNum(value.replace(/[^0-9]/gi, ""));
  };

  useEffect(() => {
    setData((cur) => ({
      ...cur,
      [firstKey]: firstNum,
      [midKey]: midNum,
      [lastKey]: lastNum,
    }));
  }, [firstNum, midNum, lastNum]);
  return (
    <>
      <SignUpSelectStyle width={"60px"} onChange={onFirstNumChange}>
        {firstNums.map((first, key) => (
          <option
            value={first}
            key={`phone_first_${key}`}
            defaultValue={key === 0}
          >
            {first}
          </option>
        ))}
      </SignUpSelectStyle>
      <DashSpan>-</DashSpan>
      <SignUpInputStyle
        width={"73px"}
        type="text"
        value={midNum}
        maxLength={4}
        onChange={onMidNumChange}
      />
      <DashSpan>-</DashSpan>
      <SignUpInputStyle
        width={"73px"}
        type="text"
        value={lastNum}
        maxLength={4}
        onChange={onLastNumChange}
      />
    </>
  );
};

export default PhoneNumInput;
const DashSpan = styled.span`
  display: inline-block;
  padding: 0 3px;
  font-size: 16px;
`;
