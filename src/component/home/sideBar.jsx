import React from "react";
import MealList from "./meal_list";
import styled, { css } from "styled-components";
import { locData } from "../../locData";
import { useRecoilState, useRecoilValue } from "recoil";
import { detailOpenAtom, openAtom } from "../../recoil/meal/atom";

const SideBar = ({ onMealClick, toggle, id }) => {
  const isOpen = useRecoilValue(openAtom);
  const [isDetailOpen, setIsDetailOpen] = useRecoilState(detailOpenAtom);

  const ToggleDetailBar = () => {
    isDetailOpen === true ? setIsDetailOpen(false) : setIsDetailOpen(true);
  };
  return (
    <>
      <ButtonWrapper>
        <SideBarButton onClick={toggle}>열기</SideBarButton>
      </ButtonWrapper>
      <SideBarWrapper isOpen={isOpen}>
        <SideBarHeader>
          <SideBarButton onClick={toggle}>닫기</SideBarButton>
          {id && <SpotWrapper>{locData[id - 1].loc}</SpotWrapper>}
        </SideBarHeader>
        <MealList
          id={id}
          ToggleDetailBar={ToggleDetailBar}
          onMealClick={onMealClick}
        />
      </SideBarWrapper>
    </>
  );
};
export default SideBar;
const SpotWrapper = styled.span`
  font-weight: 700;
  font-size: 1rem;
  height: 2rem;
  color: black;
  width: 70%;
  text-align: center;
  line-height: 2rem;
`;
const SideBarWrapper = styled.div`
  width: 280px;
  height: 100%;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 16%);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: -100%;
  z-index: 98;
  transition: 0.5s;
  ${(props) =>
    props.isOpen &&
    css`
      left: 0;
    `};
`;
const SideBarHeader = styled.div`
  display: flex;
  padding: 15px;
`;
const SideBarButton = styled.button`
  background-color: #5a8dee;
  border: none;
  border-radius: 0.3em;
  color: #fff;
  padding: 0.5em;
`;
const ButtonWrapper = styled.div`
  z-index: 98;
  position: fixed;
  top: 5rem;
  left: 1rem;
`;
