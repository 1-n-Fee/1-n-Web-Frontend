import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import loginAndRoleDataAtom from "./../../recoil/loginAndRole/atom";
const menuName = ["참여 현황", "개인정보 변경하기", "로그아웃"];
const MyPageMenu = () => {
  const navigate = useNavigate();
  const setLoginAndRole = useSetRecoilState(loginAndRoleDataAtom);
  const onHistoryClick = () => {
    navigate("/history");
  };

  const onMyPageClick = () => {
    navigate("/user");
  };

  const onLogoutClick = () => {
    const answer = window.confirm("로그아웃 하시겠습니까?");

    if (!answer) return;

    localStorage.setItem("Authorization", "");
    setLoginAndRole({ isLogin: false, role: "" });
    navigate("/");
  };
  return (
    <MenuWrappper>
      <ul>
        <MenuLi isFirst={true} isLast={false} onClick={onHistoryClick}>
          {menuName[0]}
        </MenuLi>

        <MenuLi isFirst={false} isLast={false} onClick={onMyPageClick}>
          {menuName[1]}
        </MenuLi>

        <MenuLi isFirst={false} isLast={true} onClick={onLogoutClick}>
          {menuName[2]}
        </MenuLi>
      </ul>
    </MenuWrappper>
  );
};

export default MyPageMenu;
const listHeight = 50;
const radius = 10;
const MenuWrappper = styled.div`
  position: absolute;
  right: 10px;
  background-color: white;
  z-index: 10;
  border-radius: ${radius}px;
  width: 180px;
`;

const MenuLi = styled.li`
  height: 50px;
  line-height: ${listHeight}px;
  border-bottom: ${({ isLast }) => (isLast ? "none" : "0.3px solid #ced6e0;")};
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #ecf0f1;
    border-radius: ${({ isFirst, isLast }) =>
      isFirst
        ? `${radius}px ${radius}px 0 0`
        : isLast
        ? `0 0 ${radius}px ${radius}px`
        : "none"};
  }
`;
