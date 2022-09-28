import React from "react";
import MealDetail from "./meal_detail";
import MealItem from "./meal_item";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { mealListEntryAtom } from "../../recoil/meal/atom";
const MealList = ({ id, onMealClick, ToggleDetailBar }) => {
  const [mealListEntry] = useRecoilState(mealListEntryAtom);
  return (
    <>
      <MealListWrapper>
        <ul>
          {mealListEntry &&
            mealListEntry.map((meal) => (
              <MealItem
                meal={meal}
                onMealClick={onMealClick}
                ToggleDetailBar={ToggleDetailBar}
              />
            ))}
        </ul>
      </MealListWrapper>
      <MealDetail ToggleDetailBar={ToggleDetailBar} id={id} />
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
