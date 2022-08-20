import React from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import Chatting from "./Chatting";
import styled from "styled-components";

const ChatRoom = () => {
  // recoil 값에 따라 서버에서 불러오거나 기본 화면 보여주거나
  return (
    <ChatRoomWrapper>
      <ChatRoomHeader
        roomName={"테이큰 커피-3030"}
        state={2}
        targetNum={5}
        isChief={true}
        usersInfo={[
          { name: "김나라나라날나라라라리" },
          { name: "최OO" },
          { name: "박OO" },
          { name: "구OO" },
          { name: "이OO" },
        ]}
        feePerOne={500}
        location={"신공학관 정문"}
      />
      <ChatMainDiv>
        <Chatting />
      </ChatMainDiv>
    </ChatRoomWrapper>
  );
};

export default ChatRoom;

const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const ChatMainDiv = styled.div`
  flex-grow: 1;
`;
