import React from "react";
import styled from "styled-components";
import { COLOR } from "../../constants/colors";
import { SubmitBtn } from "../style/SignUpStyle";

const LoginButton = ({ onClick }) => {
  return (
    <SubmitBtn width="400px" onClick={onClick}>
      로그인
    </SubmitBtn>
  );
};

export default LoginButton;

const LoginButtonWrapper = styled.button`
  width: 400px;
  height: 50px;
  margin-bottom: 0.3rem;
  border: none;
  border-radius: 8px;
  background-color: ${COLOR.RED_PINK};
  font-weight: 600;
  color: white;
`;
