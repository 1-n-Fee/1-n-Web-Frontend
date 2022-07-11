import React from "react";
import MealItem from "./meal_item";
import styles from "./meal_list.module.css";
const MealList = ({ meals, onMealClick }) => (
  <ul className={styles.list}>
    {meals.map((meal) => (
      <MealItem meal={meal} onMealClick={onMealClick} />
    ))}
  </ul>
);

export default MealList;
