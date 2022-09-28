import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatRoomInfoDiv from "./ChatRoomInfoDiv";
import axios from "axios";
import isChatDataChangedAtom from "./../../recoil/chatData/atom";
import { useRecoilState } from "recoil";

const ChatRoomsInfo = () => {
  const [chatRoomsData, setChatRoomsData] = useState([]);
  const [isChatDataChanged, setIsChatDataChanged] = useRecoilState(
    isChatDataChangedAtom
  );

  useEffect(() => {
    if (isChatDataChanged) {
      setIsChatDataChanged(false);
      getChatRoomDatas();
    }
  }, [isChatDataChanged, setIsChatDataChanged]);

  useEffect(() => {
    getChatRoomDatas();
  }, []);
  const getChatRoomDatas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/history", {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      // console.log(response.data);
      setChatRoomsData(
        response.data
          .filter(
            (chatRoom) =>
              chatRoom.state === "ORDERING" ||
              chatRoom.state === "ORDER_COMPLETED" ||
              chatRoom.state === "DELIVERY_COMPLETE"
          )
          .map((data) => ({
            storeName: data.storeName,
            roomId: data.postId,
            state: data.state,
            isChief: data.owner,
            targetNum: data.limitNumber,
            feePerOne: data.deliveryFeePerPerson,
            location: data.spotName,
          }))
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
              feePerOne={data.feePerOne}
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
