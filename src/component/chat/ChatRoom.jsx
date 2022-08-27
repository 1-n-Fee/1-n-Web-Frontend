import React, { useState, useEffect } from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import Chatting from "./Chatting";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [chatData, setChatData] = useState({});

  // recoil 값에 따라 서버에서 불러오거나 기본 화면 보여주거나
  useEffect(() => {
    getChatRoomInfo(roomId);
  }, [roomId]);

  const getChatRoomInfo = async (roomId) => {
    if (roomId === undefined) return;
    try {
      // 모든 정보 다시 받아오기 ! - 왜냐면 히스토리에서 채팅버튼으로 넘어오는 경로도 있으니까
      const response = await axios.get(
        `http://localhost:8080/chat/room/${roomId}`,
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      );
      const data = response.data;
      console.log(data);
      setChatData({
        roomName: `${data.storeName}-${data.postId}`,
        state: data.postState,
        targetNum: data.limitNumber,
        userNicknames: data.members,
        feePerOne: data.deliveryFeePerPerson,
        location: data.spotId,
        isChief: data.owner,
      });
      console.log(response.data.owner);
    } catch (err) {
      console.log(err);
    }
  };
  const onHomeClick = () => {
    navigate("/");
  };
  return (
    <ChatRoomWrapper>
      {roomId === undefined ? (
        <div>
          <h3>참여할 채팅방을 선택해주세요🍔</h3>
          <button onClick={onHomeClick}>개설된 방 둘러보기</button>
        </div>
      ) : (
        <>
          <ChatRoomHeader
            roomName={chatData.roomName}
            state={chatData.state}
            targetNum={chatData.targetNum}
            isChief={chatData.isChief}
            usersInfo={chatData.userNicknames}
            feePerOne={chatData.feePerOne}
            location={chatData.location}
          />
          <ChatMainDiv>
            <Chatting roomId={roomId} />
          </ChatMainDiv>
        </>
      )}
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
