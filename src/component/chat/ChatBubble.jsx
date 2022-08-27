import React from "react";
import styled from "styled-components";
import { COLOR } from "./../../constants/colors";

const ChatBubble = ({ isMine, content }) => {
  return (
    <div>
      <Bubble isMine={isMine}>
        <Content>{content}</Content>
      </Bubble>
    </div>
  );
};

export default ChatBubble;

const Bubble = styled.div`
  background-color: ${({ isMine }) =>
    isMine ? COLOR.MY_BUBBLE : COLOR.OTHERS_BUBBLE};
  border-radius: ${({ isMine }) =>
    isMine ? "10px 0px 10px 10px" : "0 10px 10px 10px"};
  max-width: 500px;
`;
const Content = styled.pre`
  margin: 0;
  padding: 8px 15px;
  font-size: 15px;
  line-height: 150%;
  font-family: "고딕";
  white-space: pre-wrap;
  word-break: break-all;
`;
