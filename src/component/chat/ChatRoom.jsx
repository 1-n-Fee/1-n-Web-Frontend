import React, { useState, useEffect } from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import Chatting from "./Chatting";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import isChatDataChangedAtom from "../../recoil/chatData/atom";
import { SubmitBtn } from "../style/SignUpStyle";
import { COLOR } from "../../constants/colors";

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [chatData, setChatData] = useState({});
  const [isChatDataChanged, setIsChatDataChanged] = useRecoilState(
    isChatDataChangedAtom
  );

  // recoil 값에 따라 서버에서 불러오거나 기본 화면 보여주거나
  useEffect(() => {
    if (isChatDataChanged) {
      getChatRoomInfo(roomId);
      setIsChatDataChanged(false);
    }
  }, [roomId, isChatDataChanged]);

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
      setChatData({
        roomName: `${data.storeName}-${data.postId}`,
        state: data.postState,
        targetNum: data.limitNumber,
        userNicknames: data.members,
        feePerOne: data.deliveryFeePerPerson,
        location: data.spotId,
        isChief: data.owner,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onHomeClick = () => {
    navigate("/");
  };
  return (
    <>
      {roomId === undefined ? (
        <DefaultDivWrapper>
          <h2>참여할 채팅방을 선택해주세요🍔</h2>
          <SubmitBtn width={"180px"} onClick={onHomeClick}>
            개설된 방 둘러보기
          </SubmitBtn>
        </DefaultDivWrapper>
      ) : (
        <ChatMainWrapper>
          <ChatRoomHeader
            roomName={chatData.roomName}
            state={chatData.state}
            targetNum={chatData.targetNum}
            isChief={chatData.isChief}
            usersInfo={chatData.userNicknames}
            feePerOne={chatData.feePerOne}
            location={chatData.location}
            roomId={roomId}
          />
          <Chatting roomId={roomId} state={chatData.state} />
        </ChatMainWrapper>
      )}
    </>
  );
};

export default ChatRoom;

const ChatMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const DefaultDivWrapper = styled.div`
  display: flex;

  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${COLOR.DARK_YELLOW_BG};
`;
