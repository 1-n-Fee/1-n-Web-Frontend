import React from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import {
  roomDataAtom,
  selectedDataAtom,
  createDataAtom,
} from "../../recoil/createroomData/atom";
import { useEffect, useState } from "react";
import MenuEntry from "./menuEntry";
import "../../scroll.css";
import { TagStyle } from "./restaurantList";
const SelectedMenu = ({ selectedSpot }) => {
  const [menuList, setMenuList] = useState([]);
  const setRoomData = useSetRecoilState(roomDataAtom);
  const setCreateDataAtom = useSetRecoilState(createDataAtom);

  useEffect(() => {
    const getMenu = async () => {
      await axios
        .get(`http://localhost:8080/store/detail/${selectedSpot.id}`)
        .then((res) => setMenuList(res.data))
        .catch((e) => console.log(e));
    };
    getMenu();
  }, [selectedSpot]);

  const onClick = () => {
    setRoomData((cur) => ({
      ...cur,
      storeId: selectedSpot.id,
      storeName: selectedSpot.name,
      delivery: selectedSpot.deliveryFee,
    }));
    setCreateDataAtom((cur) => ({ ...cur, isPopUpOpen: false }));
  };
  return (
    <MenuWrapper className="box">
      <InfoWrapper>
        <DivWrapper>
          <Title>{selectedSpot.name}</Title>
          <TitleTag>{selectedSpot.category}</TitleTag>
        </DivWrapper>
        <FeeWrapper>
          <span>배달비:</span>
          <span>{selectedSpot.deliveryFee}원</span>
        </FeeWrapper>
        <MenuTitle>메뉴</MenuTitle>
      </InfoWrapper>

      <MenuContainer>
        {menuList.map((data) => (
          <MenuEntry menu={data} key={data.menuId} />
        ))}
      </MenuContainer>
      <ButtonWrapper>
        <ButtonContainer onClick={onClick}>선택하기</ButtonContainer>
      </ButtonWrapper>
    </MenuWrapper>
  );
};

export default SelectedMenu;

const MenuTitle = styled.div`
  font-weight: 700;
`;
const FeeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const DivWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: white;
  border-top: solid 1px rgba(1, 1, 1, 0.3);
  height: 14%;
`;
const MenuWrapper = styled.div`
  background-color: white;
  width: 50%;
`;
const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.7rem 0.3rem;
  gap: 0.5rem;
  height: 70%;
  overflow-y: auto;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
`;
const ButtonContainer = styled.button`
  width: 14rem;
  height: 1.8rem;
  background-color: #6558f5;
  color: white;
`;

const TitleTag = styled.div`
  font-size: 0.7rem;
  display: inline-block;
  background-color: lightseagreen;
  color: white;
  vertical-align: middle;
  text-align: center;
  border-radius: 1rem;
  width: 2rem;
  height: 1rem;
  line-height: 1rem;
`;
const Title = styled.div`
  font-weight: 700;
`;
