import React, { useState } from "react";
import MealList from "./meal_list";
import styled, { css } from "styled-components";
const SideBar = ({
  meals,
  onMealClick,
  selectedMeal,
  isDetailOpen,
  setIsDetailOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };
  const ToggleDetailBar = () => {
    isDetailOpen === true ? setIsDetailOpen(false) : setIsDetailOpen(true);
  };
  return (
    <>
      <ButtonWrapper>
        <SideBarButton onClick={ToggleSidebar}>열기</SideBarButton>
      </ButtonWrapper>
      <SideBarWrapper isOpen={isOpen}>
        <SideBarHeader>
          <SideBarButton onClick={ToggleSidebar}>닫기</SideBarButton>
        </SideBarHeader>
        <MealList
          meals={meals}
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
          ToggleDetailBar={ToggleDetailBar}
          onMealClick={onMealClick}
          selectedMeal={selectedMeal}
        />
      </SideBarWrapper>
    </>
  );
};
export default SideBar;

const SideBarWrapper = styled.div`
  width: 280px;
  height: 100%;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 16%);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: -100%;
  z-index: 99;
  transition: 0.5s;
  ${(props) =>
    props.isOpen &&
    css`
      left: 0;
    `};
`;
const SideBarHeader = styled.div`
  display: flex;
  padding: 15px 0px 0px 15px;
`;
const SideBarButton = styled.button`
  background-color: #5a8dee;
  border: none;
  border-radius: 0.3em;
  color: #fff;
  padding: 0.5em;
`;
const ButtonWrapper = styled.div`
  z-index: 99;
  position: fixed;
  top: 5rem;
  left: 1rem;
`;
