import React from "react";
import styled from "styled-components";
import { COLOR } from "../../constants/colors";

const LoginButton = ({ onClick }) => {
  return <LoginButtonWrapper onClick={onClick}>로그인</LoginButtonWrapper>;
};

export default LoginButton;

const LoginButtonWrapper = styled.button`
  width: 11.5rem;
  height: 2.5rem;
  margin-bottom: 0.3rem;
  border: none;
  border-radius: 7px;
  background-color: ${COLOR.RED_PINK};
  color: white;
`;
