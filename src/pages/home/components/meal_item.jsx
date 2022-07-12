import React from "react";

const MealItem = ({ meal, onMealClick, ToggleDetailBar, isDetailOpen }) => {
  return (
    <li
      onClick={() => {
        console.log("onCLick");
        onMealClick(meal);
        if (!isDetailOpen) {
          ToggleDetailBar();
        }
      }}
    >
      <div>
        <p>{meal.title}</p>
        <span>1/3</span>
        <span>미참여</span>
      </div>
      <ul>
        <li>마감시간</li>
        <li>장소</li>
        <li>배달비</li>
      </ul>
    </li>
  );
};

export default MealItem;
