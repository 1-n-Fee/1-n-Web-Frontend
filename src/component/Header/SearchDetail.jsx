import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { searchDetailAtom } from "../../recoil/search/atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import proposalPopupAtom from "../../recoil/proposalPopupData/atom";
import { userStatusAtom } from "../../recoil/meal/atom";

const SearchDetail = (props) => {
  const [searchDetail, setSearchDetail] = useRecoilState(searchDetailAtom);
  const { postId, data } = searchDetail;
  const [menu, setMenu] = useState([]);
  const [detailType, setDetailType] = useState("info");
  const [newComment, setNewComment] = useState({
    type: "comment",
    replyId: "",
    content: "",
  });
  const userState = useRecoilValue(userStatusAtom);

  const [isCommentActive, setIsCommentActive] = useState(false);
  const [propsalData, setProposalData] = useRecoilState(proposalPopupAtom);

  const getStoreMenu = async () => {
    console.log(postId);
    await axios
      .get(`http://localhost:8080/store/detail/${postId}`)
      .then((res) => {
        console.log(res.data);
        setMenu(res.data);
      })
      .catch((e) => console.log(e));
  };
  const popProposal = () => {
    setProposalData((cur) => ({
      isOpen: true,
      postId: data.postId,
      menus: [],
    }));
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
    console.log(data.postId);
    if (newComment.type === "comment") {
      await axios
        .post(
          "http://localhost:8080/comment",
          {
            postId: data.postId,
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
            setIsCommentActive(false);
            setNewComment((cur) => ({ ...cur, content: "" }));
          }
        })
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
    <DetailDiv>
      <DetailHeader>
        {data && <StoreWrapper>{data.storeName}</StoreWrapper>}
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
          {data && (
            <li>
              <TextWrapper>마감시간</TextWrapper> {data.closeTime}
            </li>
          )}
          <li>
            <TextWrapper>참여현황</TextWrapper> {data && data.currentNumber}/
            {data && data.limitNumber}
          </li>
          {/*<li>
            <TextWrapper>장소</TextWrapper>
            {data && locData[data.spotId - 1].loc}
          </li>*/}
          <li>
            <TextWrapper>설명</TextWrapper>
            <DesWrapper>{data && data.content}</DesWrapper>
          </li>
          <li>
            <TextWrapper>배달비</TextWrapper> {data && data.deliveryFee} 원
          </li>
          <li>
            <ReplyWrapper>댓글</ReplyWrapper>
            <UlWrapper>
              {data.comments &&
                data.comments.map((comment, idx) => (
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
      )}
      {detailType === "menu" && (
        <>
          <MenuWrapper>
            {menu.map((menu) => (
              <EntryWrapper>
                <MenuInfoWrapper>
                  <div>{menu.name}</div>
                  <PriceWrapper>
                    <SpanWrapper>가격</SpanWrapper> {menu.price} 원
                  </PriceWrapper>
                </MenuInfoWrapper>

                <MealImgWrapper
                  src={`http://localhost:8080/image/menu/${menu.imageUrl}`}
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

            <JoinButton onClick={popProposal}>참여</JoinButton>
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
    </DetailDiv>
  );
};

export default SearchDetail;

const CommentContainer = styled.li`
  border-bottom: solid rgba(0, 0, 0, 0.1) 1px;
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
export const SpanWrapper = styled.div`
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
const DetailDiv = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 16%);
  background-color: #fff;
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
