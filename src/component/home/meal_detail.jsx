import React from "react";
import styled, { css } from "styled-components";
const MealDetail = ({
  meal,
  isDetailOpen,
  //setIsDetailOpen,
  ToggleDetailBar,
}) => {
  // button 클릭 시 토글
  // 사이드바 외부 클릭시 닫히는 함수
  return (
    <DetailBar isDetailOpen={isDetailOpen}>
      <DetailHeader>
        <DetailButton onClick={ToggleDetailBar}>닫기</DetailButton>
      </DetailHeader>
      {meal && <h3>{meal.title}</h3>}
      <button>정보</button>
      <button>메뉴</button>
      <ul>
        {meal && <li>마감시간: {meal.endTime}</li>}
        <li>
          참여현황: {meal && meal.curParty} / {meal && meal.maxParty}
        </li>
        <li>장소: {meal && meal.meetup}</li>
        <li>설명: {meal && meal.description}</li>
        <li>참여 시 배달비: {meal && meal.deliveryCost}</li>
      </ul>
    </DetailBar>
  );
};

export default MealDetail;

const DetailBar = styled.div`
  width: 280px;
  height: 100%;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 16%);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: -280px;
  z-index: 95;
  transition: 0.5s;
  ${(props) =>
    props.isDetailOpen &&
    css`
      left: 280px;
    `};
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

const DetailButton = styled.button`
  background-color: #5a8dee;
  border: none;
  border-radius: 0.3em;
  color: #fff;
  padding: 0.5em;
`;
