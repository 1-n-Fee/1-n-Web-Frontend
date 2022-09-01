import React from "react";
import MealDetail from "./meal_detail";
import MealItem from "./meal_item";
//import MealDetail from "./meal_detail";
import styled from "styled-components";
const MealList = ({
  meals,
  id,
  onMealClick,
  selectedMeal,
  isDetailOpen,
  setIsDetailOpen,
  ToggleDetailBar,
}) => {
  return (
    <>
      <MealListWrapper>
        <ul>
          {meals &&
            meals.map((meal) => (
              <MealItem
                meal={meal}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                onMealClick={onMealClick}
                ToggleDetailBar={ToggleDetailBar}
              />
            ))}
        </ul>
      </MealListWrapper>
      <MealDetail
        meal={selectedMeal}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        ToggleDetailBar={ToggleDetailBar}
        id={id}
      />
    </>
  );
};

export default MealList;

const MealListWrapper = styled.div`
  display: flexbox;
  flex-direction: row;
  justify-content: center;
  padding: 2rem;
  position: relative;
  width: 100%;
  height: 90vh;
  overflow: auto;
  padding: 0;
`;
