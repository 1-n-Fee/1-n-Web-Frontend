import React from "react";
import MealDetail from "./meal_detail";
import MealItem from "./meal_item";
//import MealDetail from "./meal_detail";
import styles from "./meal_list.module.css";
const MealList = ({
  meals,
  onMealClick,
  selectedMeal,
  isDetailOpen,
  setIsDetailOpen,
  ToggleDetailBar,
}) => {
  return (
    <>
      <ul className={styles.list}>
        {meals.map((meal) => (
          <MealItem
            meal={meal}
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
            onMealClick={onMealClick}
            ToggleDetailBar={ToggleDetailBar}
          />
        ))}
      </ul>
      <MealDetail
        meal={selectedMeal}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        ToggleDetailBar={ToggleDetailBar}
      />
    </>
  );
};

export default MealList;
