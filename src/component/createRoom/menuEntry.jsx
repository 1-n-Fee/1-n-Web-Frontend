import React from "react";
import styled from "styled-components";
import "../../scroll.css";
const MenuEntry = ({ menu }) => {
  const { imageUrl, menuId, name, price } = menu;
  return (
    <Menu className="box" key={menuId}>
      <Img src={imageUrl} alt="default" />
      <InfoWrapper>
        <span>{name}</span>
        <span>{price}원</span>
      </InfoWrapper>
    </Menu>
  );
};

export default MenuEntry;

const Menu = styled.div`
  width: 110px;
  height: 100px;
  border: solid 1px rgba(1, 1, 1, 0.3);
  position: relative;
  overflow-y: auto;
`;
const Img = styled.img`
  width: 100%;
  height: 60%;
  border: solid 1px rgba(0, 0, 0, 0.3);
`;
const InfoWrapper = styled.div`
  font-size: 0.8rem;
  width: 100%;
  height: 40%;
  border-top: solid 1px rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
