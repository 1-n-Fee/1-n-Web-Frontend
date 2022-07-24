import React from "react";
import styled from "styled-components";
const menuName = ["참여 현황", "개인정보 변경하기"];
const MyPageMenu = () => {
  return (
    <MenuWrappper>
      <ul>
        {menuName.map((m, key) => (
          <MenuLi
            key={`menuName_${key}`}
            isFirst={key === 0}
            isLast={key === menuName.length - 1}
          >
            {m}
          </MenuLi>
        ))}
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
