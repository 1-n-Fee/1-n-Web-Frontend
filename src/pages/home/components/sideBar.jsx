import React, { useRef, useState } from "react";
import { useEffect } from "react";
import MealDetail from "./meal_detail";
import MealList from "./meal_list";
import styles from "./sideBar.module.css";
const SideBar = ({ meals, selectedMeal, onMealClick }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(280);
  const side = useRef();
  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(280);
      setOpen(false);
    }
  };
  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(280);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <div
      ref={side}
      className={styles.sidebar}
      style={{
        width: "280px",
        height: "100%",
        transform: `translatex(${-xPosition}px)`,
      }}
    >
      <button onClick={() => toggleMenu()} className={styles.button}></button>
      {selectedMeal && <MealDetail meal={selectedMeal} />}
      <MealList meals={meals} onMealClick={onMealClick} />
    </div>
  );
};

export default SideBar;
