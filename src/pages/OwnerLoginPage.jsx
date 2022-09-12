import React from "react";
import LoginForm from "../component/login/loginForm";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "./../constants/colors";
const OwnerLoginPage = (props) => {
  return (
    <FlexWrapper>
      <h2>사업자 로그인</h2>
      <LoginForm type="manager" />
      <ManagerLinkWrapper>
        <Link to={"/login"}>학생이신가요?</Link>
      </ManagerLinkWrapper>
    </FlexWrapper>
  );
};

export default OwnerLoginPage;
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
