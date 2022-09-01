import React from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";

const Underline = ({
  thickness = "0.7px",
  color = COLOR.LIGHT_GRAY,
  width,
}) => {
  return (
    <UnderLineDiv
      width={width}
      thickness={thickness}
      color={color}
    ></UnderLineDiv>
  );
};

export default Underline;

const UnderLineDiv = styled.div`
  width: ${({ width }) => width};
  border-bottom: ${({ color, thickness }) => `${thickness} ${color} solid`};
`;
