import React from "react";
import styled from "styled-components";

const CustomOauthBtn = ({
  width,
  height,
  radius,
  color,
  bgColor,
  icon,
  iconWidth,
  text,
  borderColor,
}) => {
  return (
    <CustomButton
      color={color}
      bgColor={bgColor}
      width={width}
      height={height}
      radius={radius}
      borderColor={borderColor}
    >
      <img src={icon} alt={"아이콘"} width={iconWidth} />
      <span>{text}</span>
    </CustomButton>
  );
};

export default CustomOauthBtn;

const CustomButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius};
  font-weight: 600;
  border: ${({ borderColor }) =>
    borderColor === undefined ? "none" : `0.5px solid ${borderColor}`};
`;
