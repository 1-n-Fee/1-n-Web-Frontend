import React from "react";
import styled from "styled-components";

const MyPageMenu = () => {
  return (
    <MenuWrappper>
      <ul>
        <li>참여 현황</li>
        <li>개인정보 변경하기</li>
      </ul>
    </MenuWrappper>
  );
};

export default MyPageMenu;

const MenuWrappper = styled.div`
  position: absolute;
  right: 10px;
  background-color: white;
  z-index: 10;
`;
