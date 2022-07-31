import React from "react";

const GenderRadioBtn = ({ genderKey, genderData, setData, data }) => {
  const { male, female } = genderData;
  const onChange = (e) => {
    setData((cur) => ({ ...cur, [genderKey]: e.target.value }));
  };
  return (
    <>
      <input
        type="radio"
        id={male}
        name="gender"
        value={male}
        onChange={onChange}
        checked={data[genderKey] === male}
      />
      <label htmlFor={male}>남성</label>
      <input
        type="radio"
        id={female}
        name="gender"
        value={female}
        onChange={onChange}
        checked={data[genderKey] === female}
      />
      <label htmlFor={female}>여성</label>
    </>
  );
};

export default GenderRadioBtn;
