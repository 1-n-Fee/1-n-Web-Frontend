import React, { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";
import Icon from "./Icon";
import { useSetRecoilState } from "recoil";
import loginDataAtom from "../../recoil/isLogin/atom";
import { useNavigate } from "react-router";

const ManagerHeader = () => {
  const setLoginData = useSetRecoilState(loginDataAtom);
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
      <img alt="로고" onClick={onLogoClick} />
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
