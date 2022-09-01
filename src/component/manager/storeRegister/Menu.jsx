import React from "react";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";
import { COLOR } from "./../../../constants/colors";

const Menu = ({ imgUrl, name, price, setMenus }) => {
  const onDelBtnClick = () => {
    setMenus((cur) => cur.filter((m) => m.imgUrl !== imgUrl));
  };
  return (
    <MenuWrapper>
      <DelBtnWrapper onClick={onDelBtnClick}>❌</DelBtnWrapper>
      <ContentWrapper>
        <div>
          <Thumbnail imgUrl={imgUrl} />
        </div>
        <div>
          <MenuName>{name}</MenuName>
          <span>{price.toLocaleString()}원</span>
        </div>
      </ContentWrapper>
    </MenuWrapper>
  );
};

export default Menu;
const MenuWrapper = styled.div`
  position: relative;
  width: 200px;
  border-radius: 5px;
  border: 0.5px solid ${COLOR.LIGHT_GRAY};
  background-color: ${COLOR.WHITE};
  margin: 4px;
  padding: 10px;
`;
//   box-shadow: 2px 4px 8px 3px rgba(0, 0, 0, 0.07);
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuName = styled.h4`
  margin: 0;
  padding: 0;
`;

const DelBtnWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  text-align: right;
  font-size: 10px;
  padding: 4px;
  &:hover {
    cursor: pointer;
  }
`;
