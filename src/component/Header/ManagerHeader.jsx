import React, { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";
import Icon from "./Icon";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import loginAndRoleDataAtom from "./../../recoil/loginAndRole/atom";

const ManagerHeader = () => {
  const setLoginData = useSetRecoilState(loginAndRoleDataAtom);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.setItem("Authorization", "");
    setLoginData({ isLogin: false, role: "" });
    navigate("/");
  };

  const onLogoClick = () => {
    navigate("/");
  };
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img
          src={"managerLogo.png"}
          width={"300px"}
          alt="로고"
          onClick={onLogoClick}
        />
      </LogoWrapper>
      <Icon emoji={"LOGOUT"} onClick={onLogout} fontSize="12px" />
    </HeaderWrapper>
  );
};

export default ManagerHeader;

const HeaderWrapper = styled.div`
  background-color: ${COLOR.HEADER_BG};
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const LogoWrapper = styled.div`
  margin: 15px 0 0 0;
`;
