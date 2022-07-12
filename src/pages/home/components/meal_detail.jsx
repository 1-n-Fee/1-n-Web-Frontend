import React from "react";
import styles from "./meal_detail.module.css";
const MealDetail = ({
  meal,
  isDetailOpen,
  //setIsDetailOpen,
  ToggleDetailBar,
}) => {
  // button 클릭 시 토글
  // 사이드바 외부 클릭시 닫히는 함수
  return (
    <div className={`detailbar ${isDetailOpen === true ? "active" : ""}`}>
      <div className="sd-header">
        <div className="btn btn-primary" onClick={ToggleDetailBar}>
          <span>CLICK</span>
        </div>
      </div>
      {meal && <h3>{meal.title}</h3>}
      <button>정보</button>
      <button>메뉴</button>
      <ul>
        <li>마감시간: {meal && meal.endTime}</li>
        <li>참여현황: {meal && meal.party}</li>
        <li>장소: {meal && meal.loc}</li>
        <li>설명: {meal && meal.des}</li>
        <li>참여 시 배달비: {meal && meal.deliveryCost}</li>
      </ul>
    </div>
  );
};

export default MealDetail;
