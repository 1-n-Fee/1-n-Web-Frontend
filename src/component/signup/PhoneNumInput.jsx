import React, { useEffect, useState } from "react";

const firstNums = ["010", "011", "016", "017"];

const PhoneNumInput = ({ firstKey, midKey, lastKey, setData }) => {
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
      [midKey]: midNum.length === 4 ? midNum : "",
      [lastKey]: lastNum.length === 4 ? lastNum : "",
    }));
  }, [firstNum, midNum, lastNum]);
  return (
    <>
      <select onChange={onFirstNumChange}>
        {firstNums.map((first, key) => (
          <option
            value={first}
            key={`phone_first_${key}`}
            defaultValue={key === 0}
          >
            {first}
          </option>
        ))}
      </select>
      <span>-</span>
      <input
        type="text"
        value={midNum}
        maxLength={4}
        onChange={onMidNumChange}
      />
      <span>-</span>
      <input
        type="text"
        value={lastNum}
        maxLength={4}
        onChange={onLastNumChange}
      />
    </>
  );
};

export default PhoneNumInput;
