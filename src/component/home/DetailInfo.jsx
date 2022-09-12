import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRecoilValue } from "recoil";
import { selectedMealAtom } from "../../recoil/meal/atom";
import { locData } from "../../locData";

const DetailInfo = ({ id, setNewComment }) => {
  const meal = useRecoilValue(selectedMealAtom);

  return (
    <InfoWrapper>
      {meal && (
        <li>
          <TextWrapper>마감시간</TextWrapper> {meal.closeTime}
        </li>
      )}
      <li>
        <TextWrapper>참여현황</TextWrapper> {meal && meal.currentNumber}/
        {meal && meal.limitNumber}
      </li>
      <li>
        <TextWrapper>장소</TextWrapper> {id && locData[id - 1].loc}
      </li>
      <li>
        <TextWrapper>설명</TextWrapper>
        <DesWrapper>{meal && meal.content}</DesWrapper>
      </li>
      <li>
        <TextWrapper>배달비</TextWrapper> {meal && meal.deliveryFee} 원
      </li>
      <li>
        <ReplyWrapper>댓글</ReplyWrapper>
        <UlWrapper>
          {meal.comments &&
            meal.comments.map((comment, idx) => (
              <CommentContainer key={idx}>
                <CommentFlex
                  onClick={() =>
                    setNewComment((cur) => ({
                      ...cur,
                      type: "reply",
                      replyId: comment.commentId,
                    }))
                  }
                >
                  <ReplyName>{comment.nickname}</ReplyName>
                  <ReplyComment>{comment.content}</ReplyComment>
                </CommentFlex>

                <DateWrapper>{comment.createDateTime}</DateWrapper>
                <ul>
                  {comment.replies &&
                    comment.replies.map((reply, idx) => (
                      <CommentContainer key={idx}>
                        <CommentFlex>
                          <FontAwesomeIcon
                            icon={solid("angles-right")}
                          ></FontAwesomeIcon>
                          <ReplyComment>{reply.content}</ReplyComment>
                        </CommentFlex>

                        <DateWrapper>{reply.createDateTime}</DateWrapper>
                      </CommentContainer>
                    ))}
                </ul>
              </CommentContainer>
            ))}
        </UlWrapper>
      </li>
    </InfoWrapper>
  );
};

export default DetailInfo;

const InfoWrapper = styled.ul`
  padding: 0 0.5rem;
`;
const TextWrapper = styled.span`
  font-size: 0.7rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.5rem;
  background-color: #b2acfa;
  color: white;
`;
const DesWrapper = styled.p`
  font-size: 0.8rem;
  height: 3rem;
  overflow-y: auto;
`;
const ReplyWrapper = styled(TextWrapper)`
  display: block;
  margin-top: 5px;
`;
const ReplyName = styled(TextWrapper)`
  background-color: #f7a420;
  display: flex;
`;
const ReplyComment = styled.div`
  font-size: 0.8rem;
`;
const UlWrapper = styled.ul`
  width: 100%;
  height: 20rem;
  overflow-y: auto;
  overflow-x: auto;
`;
const CommentContainer = styled.li`
  border-bottom: solid rgba(0, 0, 0, 0.1) 1px;
  cursor: pointer;
  &:hover {
    background-color: #f9d6a2;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  width: 100%;
`;
const CommentFlex = styled(FlexWrapper)`
  gap: 0.5rem;
`;
const DateWrapper = styled.div`
  font-size: 0.5rem;
  opacity: 0.5;
  text-align: right;
`;
