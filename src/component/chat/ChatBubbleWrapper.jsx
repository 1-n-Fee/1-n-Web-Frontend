import React from "react";
import Icon from "../header/Icon";
import styled from "styled-components";
import ChatBubble from "./ChatBubble";

const ChatBubbleWrapper = ({
  nickname,
  time,
  content,
  icon,
  isMine = true,
}) => {
  return (
    <BubbleWrapper isMine={isMine}>
      {isMine || (
        <div>
          <Icon emoji={icon} fontSize={"25px"} />
          {/* 시간나면 프로필 클릭 시 이 사람 시킨 메뉴나 정보등등을 보여주기 */}
        </div>
      )}
      <div>
        {isMine || (
          <Nickname>
            <strong>{nickname}</strong>
          </Nickname>
        )}
        <ChatBubble content={content} isMine={isMine} />
      </div>
      <Time>
        <span>{time}</span>
      </Time>
    </BubbleWrapper>
  );
};

export default ChatBubbleWrapper;
const Nickname = styled.div`
  margin: 2px 0;
`;
const BubbleWrapper = styled.div`
  display: flex;
  flex-direction: ${({ isMine }) => (isMine ? "row-reverse" : "row")};
  padding: 10px;
`;

const Time = styled.div`
  align-self: flex-end;
  font-size: 13px;
  margin: 3px;
`;
