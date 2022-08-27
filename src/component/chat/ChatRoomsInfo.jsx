import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatRoomInfoDiv from "./ChatRoomInfoDiv";
import axios from "axios";

const ChatRoomsInfo = () => {
  const [chatRoomsData, setChatRoomsData] = useState([
    {
      storeName: "맥도날드",
      roomId: 1,
      state: 0,
      isChief: false,
      targetNum: 3,
      totalFee: 3000,
      location: "신공학관 정문",
    },
    {
      storeName: "이삭 토스트",
      roomId: 42,
      state: 1,
      isChief: true,
      targetNum: 6,
      totalFee: 5000,
      location: "건대 후문",
    },
    {
      storeName: "한솥 도시락",
      roomId: 938,
      state: 2,
      isChief: false,
      targetNum: 4,
      totalFee: 4000,
      location: "상허기념도서관 정문",
    },
  ]);

  useEffect(() => {
    // getChatRoomDatas();
  }, []);
  const getChatRoomDatas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/history", {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      setChatRoomsData(
        response.data.filter(
          (chatRoom) =>
            chatRoom.state === "ORDERING" ||
            chatRoom.state === "ORDER_COMPLETED" ||
            chatRoom.state === "DELIVERY_COMPLETE"
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ul>
        {chatRoomsData.map((data, key) => (
          <ChatRoomInfoLi key={key}>
            <ChatRoomInfoDiv
              roomName={`${data.storeName}-${data.roomId}`}
              roomId={data.roomId}
              state={data.state}
              isChief={data.isChief}
              targetNum={data.targetNum}
              feePerOne={parseInt(data.totalFee / data.targetNum)}
              location={data.location}
            />
          </ChatRoomInfoLi>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomsInfo;

const ChatRoomInfoLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90px;
  border-bottom: 0.3px solid #ced6e0;
  padding: 15px 10px 10px 20px;
  &:hover {
    cursor: pointer;
    background-color: #ecf0f1;
  }
`;
