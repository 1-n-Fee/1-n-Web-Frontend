import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRecoilState, useSetRecoilState } from "recoil";
import { postIdAtom, userStatusAtom } from "../../recoil/meal/atom";
import { SpanWrapper } from "./meal_detail";
import { FlexRowDiv } from "../header/Header";
import RequestStateTag from "../history/RequestStateTag";

const MealItem = ({ meal, onMealClick, ToggleDetailBar, isDetailOpen }) => {
  const setUserState = useSetRecoilState(userStatusAtom);
  const [postId, setPostId] = useRecoilState(postIdAtom);
  return (
    <LiWrapper
      style={{ cursor: "pointer" }}
      onClick={() => {
        console.log("onCLick");
        setPostId(meal.postId);
        onMealClick(meal.postId);
        setUserState(meal.state);
        if (!isDetailOpen) {
          ToggleDetailBar();
        }
        console.log(postId);
      }}
    >
      <DivWrapper>
        <StoreWrapper>{meal.storeName}</StoreWrapper>
        <CurrentWrapper>
          <FontAwesomeIcon icon={solid("user")} />
          {meal.currentNumber}/{meal.limitNumber}
        </CurrentWrapper>
        <RequestStateTag state={meal.state} />
        {/*meal.state === "OWNER" && <OwnerWrapper>{meal.state}</OwnerWrapper>*/}
        {/*!meal.state && <StateWrapper>미참여</StateWrapper>*/}
      </DivWrapper>
      <InfoWrapper>
        <FlexRowDiv>
          <InfoSpan>마감시간</InfoSpan>
          <div>{meal.closeTime}</div>
        </FlexRowDiv>
        <FlexRowDiv>
          <InfoSpan>배달비</InfoSpan>
          <div> {meal.deliveryFee}</div>
        </FlexRowDiv>
      </InfoWrapper>
    </LiWrapper>
  );
};

export default MealItem;

const InfoSpan = styled(SpanWrapper)`
  width: 3.5rem;
`;
const InfoWrapper = styled.div`
  padding: 0 7px;
  margin-top: 1rem;
`;
const DivWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const LiWrapper = styled.li`
  width: 100%;
  height: 10rem;
  border: solid 1px rgba(0, 0, 0, 0.2);
  padding 0.3rem 0;
`;

const StoreWrapper = styled.span`
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  width: 60%;
`;
const CurrentWrapper = styled.span`
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 2px;
`;
const StateWrapper = styled.span`
  font-size: 0.8rem;
  display: block;
  text-align: center;
  line-height: 1.7rem;
  width: 3.4rem;
  height: 1.7rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 1rem;
`;
const OwnerWrapper = styled(StateWrapper)`
  background-color: lightseagreen;
`;
