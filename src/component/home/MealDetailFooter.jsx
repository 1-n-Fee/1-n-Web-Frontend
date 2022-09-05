import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRecoilState } from "recoil";
import { commentActiveAtom, newCommentAtom } from "../../recoil/comment/atom";

const MealDetailFooter = ({ popProposal, addComment }) => {
  const [newComment, setNewComment] = useRecoilState(newCommentAtom);
  const [isCommentActive, setIsCommentActive] =
    useRecoilState(commentActiveAtom);

  const onChange = (e) => {
    setNewComment((cur) => ({ ...cur, content: e.target.value }));
  };
  const cancelReply = () => {
    setNewComment((cur) => ({ ...cur, content: "" }));
    setIsCommentActive(false);
  };

  return (
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
                </CloseWrapper>
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
  );
};

export default MealDetailFooter;

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
const FlexWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  width: 100%;
`;
const ButtonWrapper = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 1rem;
`;
const ChatButton = styled(ButtonWrapper)`
  color: #6558f5;
  font-weight: 700;
  background-color: white;
  border: solid #b2acfa 3px;
`;
const JoinButton = styled(ButtonWrapper)`
  color: white;
  background-color: #b2acfa;
  border: solid #6558f5 3px;
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
