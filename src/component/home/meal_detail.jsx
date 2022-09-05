import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { locData } from "../../locData";
import {
  detailOpenAtom,
  postIdAtom,
  selectedMealAtom,
  userStatusAtom,
} from "../../recoil/meal/atom";
import proposalPopupAtom from "../../recoil/proposalPopupData/atom";
import { useRecoilState, useRecoilValue } from "recoil";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DetailMenu from "./DetailMenu";
import DetailInfo from "./DetailInfo";
import { commentActiveAtom, newCommentAtom } from "../../recoil/comment/atom";
import MealDetailFooter from "./MealDetailFooter";

const MealDetail = ({ id, ToggleDetailBar }) => {
  const [detailType, setDetailType] = useState("info");
  const postId = useRecoilValue(postIdAtom);
  const userState = useRecoilValue(userStatusAtom);
  const [propsalData, setProposalData] = useRecoilState(proposalPopupAtom);
  const [meal, setMeal] = useRecoilState(selectedMealAtom);
  const [isDetailOpen, setIsDetailOpen] = useRecoilState(detailOpenAtom);
  const [newComment, setNewComment] = useRecoilState(newCommentAtom);
  const [isCommentActive, setIsCommentActive] =
    useRecoilState(commentActiveAtom);

  const getStoreMenu = async () => {
    console.log(meal);
    await axios
      .get(`http://localhost:8080/store/detail/${postId}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const addComment = async () => {
    if (newComment.content === "") {
      alert("빈 댓글을 등록할 수 없습니다.");
      return;
    }
    const auth = localStorage.getItem("Authorization");
    console.log(postId);
    if (newComment.type === "comment") {
      await axios
        .post(
          "http://localhost:8080/comment",
          {
            postId,
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
  const popProposal = () => {
    setProposalData((cur) => ({ isOpen: true, postId, menus: [] }));
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
        <DetailInfo id={id} setNewComment={setNewComment} />
      )}
      {detailType === "menu" && <DetailMenu />}

      <MealDetailFooter popProposal={popProposal} addComment={addComment} />
    </DetailBar>
  );
};

export default MealDetail;

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

const TabContainer = styled.div`
  height: 5%;
  border-bottom: solid rgba(0, 0, 0, 0.4) 1px;
  display: flex;
  justify-content: space-evenly;
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
