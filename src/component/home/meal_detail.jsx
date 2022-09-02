import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { locData } from "../../locData";
import { postIdAtom, userStatusAtom } from "../../recoil/meal/atom";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRef } from "react";
const MealDetail = ({
  id,
  meal,
  isDetailOpen,
  //setIsDetailOpen,
  ToggleDetailBar,
}) => {
  // button 클릭 시 토글
  // 사이드바 외부 클릭시 닫히는 함수
  const [newComment, setNewComment] = useState({
    type: "comment",
    replyId: "",
    content: "",
  });
  const [isCommentActive, setIsCommentActive] = useState(false);
  const [detailType, setDetailType] = useState("info");
  const postId = useRecoilValue(postIdAtom);
  const userState = useRecoilValue(userStatusAtom);

  const getStoreMenu = async () => {
    console.log(meal);
    await axios
      .get(`http://localhost:8080/store/detail/${postId}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  const onChange = (e) => {
    setNewComment((cur) => ({ ...cur, content: e.target.value }));
  };
  const cancelReply = () => {
    setNewComment((cur) => ({ ...cur, content: "" }));
    setIsCommentActive(false);
  };
  const addComment = async () => {
    if (newComment.content === "") {
      alert("빈 댓글을 등록할 수 없습니다.");
      return;
    }
    const auth = localStorage.getItem("Authorization");
    if (newComment.type === "comment") {
      await axios
        .post(
          "http://localhost:8080/comment",
          {
            postId,
            content: newComment,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then(
          (res) =>
            res.status === 201 &&
            setNewComment((cur) => ({ ...cur, content: "" }))
        )
        .catch((e) => {
          console.log(e);
          alert("예상하지 못한 에러가 발생했습니다.");
        });
    } else if (newComment.type === "reply") {
      console.log(userState);
      if (userState !== "OWNER") {
        alert("방장만 답글을 작성할 수 있습니다.");
        return;
      }
      await axios
        .post(
          "http://localhost:8080/comment/reply",
          {
            commentId: newComment.replyId,
            content: newComment.content,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setNewComment((cur) => ({ ...cur, content: "" }));
            setIsCommentActive(false);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("예상하지 못한 에러가 발생했습니다.");
        });
    }
  };
  return (
    <DetailBar isDetailOpen={isDetailOpen}>
      <DetailHeader>
        <DetailButton onClick={ToggleDetailBar}>닫기</DetailButton>
        {meal && <StoreWrapper>{meal.storeName}</StoreWrapper>}
      </DetailHeader>
      <TabContainer>
        <TabWrapper
          type={detailType}
          val="info"
          onClick={() => setDetailType("info")}
        >
          정보
        </TabWrapper>
        <TabWrapper
          type={detailType}
          val="menu"
          onClick={() => {
            getStoreMenu();
            setDetailType("menu");
          }}
        >
          메뉴
        </TabWrapper>
      </TabContainer>

      {detailType === "info" && (
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
                  <ReplyContainer key={idx}>
                    <CommentFlex
                      onClick={() =>
                        setNewComment((cur) => ({
                          ...cur,
                          type: "reply",
                          replyId: idx,
                        }))
                      }
                    >
                      <ReplyName>{comment.nickname}</ReplyName>
                      <ReplyComment>{comment.content}</ReplyComment>
                    </CommentFlex>

                    <DateWrapper>{comment.createDateTime}</DateWrapper>
                    <ul>
                      {comment.replies &&
                        comment.replies.map((reply, idx) => {
                          <li key={idx}>
                            <div>{reply.content}</div>
                            <div>{reply.createDateTime}</div>
                          </li>;
                        })}
                    </ul>
                  </ReplyContainer>
                ))}
            </UlWrapper>
          </li>
        </InfoWrapper>
      )}
      {detailType === "menu" && (
        <>
          <MenuWrapper>
            {meal.menus.map((menu) => (
              <EntryWrapper>
                <MenuInfoWrapper>
                  <div>{menu.name}</div>
                  <PriceWrapper>
                    <SpanWrapper>가격</SpanWrapper> {menu.price} 원
                  </PriceWrapper>
                </MenuInfoWrapper>

                <MealImgWrapper
                  src={`http://localhost:8080/image/menu/${menu.image}`}
                  alt="menu"
                />
              </EntryWrapper>
            ))}
          </MenuWrapper>
        </>
      )}
      <ButtonContainer>
        {!isCommentActive ? (
          <>
            <FlexWrapper>
              <ChatButton onClick={() => setIsCommentActive(true)}>
                {newComment.type === "comment" ? "댓글 달기" : "답글 달기"}
              </ChatButton>
              {newComment.type === "reply" && (
                <>
                  <CloseWrapper>
                    <FontAwesomeIcon
                      icon={solid("xmark")}
                      onClick={() =>
                        setNewComment((cur) => ({ ...cur, type: "comment" }))
                      }
                    ></FontAwesomeIcon>
                  </CloseWrapper>{" "}
                </>
              )}
            </FlexWrapper>

            <JoinButton>참여</JoinButton>
          </>
        ) : (
          <FlexWrapper>
            {newComment.type === "comment" ? (
              <InputWrapper
                type="text"
                onChange={onChange}
                value={newComment.comment}
                name="comment"
                placeholder="댓글 달기"
              />
            ) : (
              <InputWrapper
                type="text"
                onChange={onChange}
                value={newComment.comment}
                name="reply"
                placeholder="답글 달기"
              />
            )}

            <CloseWrapper>
              <FontAwesomeIcon
                icon={solid("xmark")}
                onClick={cancelReply}
              ></FontAwesomeIcon>
            </CloseWrapper>
            <AddWrapper>
              <FontAwesomeIcon
                icon={solid("plus")}
                onClick={addComment}
              ></FontAwesomeIcon>
            </AddWrapper>
          </FlexWrapper>
        )}
      </ButtonContainer>
    </DetailBar>
  );
};

export default MealDetail;
const ReplyContainer = styled.li`
  border-bottom: solid rgba(0, 0, 0, 0.1) 1px;
  padding: 0.2rem 0;
  cursor: pointer;
  &:hover {
    background-color: #f9d6a2;
  }
`;
const ReplyComment = styled.div`
  font-size: 0.8rem;
`;
const DateWrapper = styled.div`
  font-size: 0.5rem;
  opacity: 0.5;
  text-align: right;
`;
const UlWrapper = styled.ul`
  width: 100%;
  height: 20rem;
  overflow-y: auto;
  overflow-x: auto;
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
const RoundButton = styled.button`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CloseWrapper = styled(RoundButton)`
  background-color: crimson;
  color: white;
`;
const AddWrapper = styled(RoundButton)`
  background-color: lightseagreen;
  color: white;
`;
const InputWrapper = styled.input`
  width: 100%;
  padding: 0.4rem;
  border: solid #b2acfa 3px;
  border-radius: 1rem;
`;
const TabWrapper = styled.div`
  width: 3rem;
  text-align: center;
  background-color: white;
  border: none;
  transition: border;
  cursor: pointer;
  &:hover {
    border-bottom: solid #6558f5 3px;
  }
  border-bottom: ${(props) => {
    if (props.type === props.val) {
      return "solid #6558f5 3px";
    } else {
      return "none";
    }
  }};
`;
const DesWrapper = styled.p`
  font-size: 0.8rem;
  height: 1.6rem;
  overflow-y: auto;
`;
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
const ReplyWrapper = styled(TextWrapper)`
  display: block;
  margin-top: 5px;
`;
const ReplyName = styled(TextWrapper)`
  background-color: #f7a420;
  display: flex;
`;
const TabContainer = styled.div`
  height: 5%;
  border-bottom: solid rgba(0, 0, 0, 0.4) 1px;
  display: flex;
  justify-content: space-evenly;
`;
const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const SpanWrapper = styled.div`
  width: 2rem;
  text-align: center;
  font-size: 0.7rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.5rem;
  background-color: #b2acfa;
  color: white;
`;
const MenuInfoWrapper = styled.div`
  padding: 0.4rem 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonWrapper = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 1rem;
`;
const JoinButton = styled(ButtonWrapper)`
  color: white;
  background-color: #b2acfa;
  border: solid #6558f5 3px;
`;
const ChatButton = styled(ButtonWrapper)`
  color: #6558f5;
  font-weight: 700;
  background-color: white;
  border: solid #b2acfa 3px;
`;
const ButtonContainer = styled.div`
  height: 10%;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: solid rgba(0, 0, 0, 0.5);
  padding: 0 0.3rem;
  border-width: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const EntryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid rgba(0, 0, 0, 0.5);
  border-width: 1px;
`;
const MenuWrapper = styled.ul`
  overflow-y: scroll;
  height: 70%;
`;
const MealImgWrapper = styled.img`
  width: 140px;
  height: 100px;
`;
const DetailBar = styled.div`
  width: 280px;
  height: 100%;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 16%);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: -280px;
  z-index: 95;
  transition: 0.5s;
  ${(props) =>
    props.isDetailOpen &&
    css`
      left: 280px;
    `};
`;

const StoreWrapper = styled.span`
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  width: 80%;
`;
const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 15%;
`;

const DetailButton = styled.button`
  background-color: #5a8dee;
  border: none;
  border-radius: 0.3em;
  color: #fff;
  padding: 0.5em;
`;
