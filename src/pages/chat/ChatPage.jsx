import React from "react";
import ChatRoom from "../../component/chat/ChatRoom";
import ChatRoomsInfo from "../../component/chat/ChatRoomsInfo";
import styled from "styled-components";

const ChatPage = () => {
  return (
    <ChatPageWrapper>
      <SideNavWrapper>
        <ChatRoomsInfo />
      </SideNavWrapper>
      <ChatRoomWrapper>
        <ChatRoom />
      </ChatRoomWrapper>
    </ChatPageWrapper>
  );
};

export default ChatPage;

const ChatPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideNavWrapper = styled.div`
  width: 30%;
`;

const ChatRoomWrapper = styled.div`
  width: 70%;
`;
