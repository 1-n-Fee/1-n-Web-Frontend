import React from "react";
import styled from "styled-components";

const GenderRadioBtn = ({ genderKey, genderData, setData, data }) => {
  const { male, female } = genderData;
  const onChange = (e) => {
    setData((cur) => ({ ...cur, [genderKey]: e.target.value }));
  };
  return (
    <GenderRadioBtnWrapper>
      <div>
        <input
          type="radio"
          id={male}
          name="gender"
          value={male}
          onChange={onChange}
          checked={data[genderKey] === male}
        />
        <Label htmlFor={male}>남성</Label>
      </div>
      <div>
        <input
          type="radio"
          id={female}
          name="gender"
          value={female}
          onChange={onChange}
          checked={data[genderKey] === female}
        />
        <Label htmlFor={female}>여성</Label>
      </div>
    </GenderRadioBtnWrapper>
  );
};

export default GenderRadioBtn;

const GenderRadioBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.label`
  display: inline-block;
  margin: 0 12px 0 4px;
`;
