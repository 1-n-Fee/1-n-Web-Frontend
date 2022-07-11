import React, { useLayoutEffect } from "react";

const MealDetail = ({ meal, handleClose }) => {
  const detail = useRef();

  // button 클릭 시 토글

  // 사이드바 외부 클릭시 닫히는 함수

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });
  return (
    <div ref={detail}>
      <h3>{meal.title}</h3>
      <button>정보</button>
      <button>메뉴</button>
      {option === "info" && (
        <ul>
          <li>마감시간: {meal.endTime}</li>
          <li>참여현황: {meal.party}</li>
          <li>장소: {meal.loc}</li>
          <li>설명: {meal.des}</li>
          <li>참여 시 배달비: {meal.deliveryCost}</li>
        </ul>
      )}
      <div></div>
    </div>
  );
};

export default MealDetail;
