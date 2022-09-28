import React from "react";
import LoginForm from "../component/login/loginForm";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "./../constants/colors";
const LoginPage = (props) => {
  return (
    <FlexWrapper>
      <h2>학생 로그인</h2>
      <LoginForm />
      <ManagerLinkWrapper>
        <Link to={"/login/manager"}>사업자이신가요?</Link>
      </ManagerLinkWrapper>
    </FlexWrapper>
  );
};

export default LoginPage;
const FlexWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ManagerLinkWrapper = styled.div`
  margin: 25px 0 13px 0;
  font-size: 14px;
  color: ${COLOR.DARKER_GRAY};
`;
