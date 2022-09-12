import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { selectedMealAtom } from "../../recoil/meal/atom";
import { SpanWrapper } from "../header/SearchDetail";

const DetailMenu = (props) => {
  const meal = useRecoilValue(selectedMealAtom);

  return (
    <MenuWrapper>
      {meal.menus.map((menu) => (
        <EntryWrapper>
          <MenuInfoWrapper>
            <div>{menu.name}</div>
            <PriceWrapper>
              <SpanWrapper>가격</SpanWrapper> {menu.price} 원
            </PriceWrapper>
          </MenuInfoWrapper>

          <MealImgWrapper
            src={`http://localhost:8080/image/menu/${menu.image}`}
            alt="menu"
          />
        </EntryWrapper>
      ))}
    </MenuWrapper>
  );
};

export default DetailMenu;
const MenuWrapper = styled.ul`
  overflow-y: scroll;
  height: 70%;
`;
const EntryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid rgba(0, 0, 0, 0.5);
  border-width: 1px;
`;
const MenuInfoWrapper = styled.div`
  padding: 0.4rem 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const MealImgWrapper = styled.img`
  width: 140px;
  height: 100px;
`;
