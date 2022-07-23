import React from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import ChattingInput from "./ChattingInput";

const ChatRoom = () => {
  // recoil 값에 따라 서버에서 불러오거나 기본 화면 보여주거나
  return (
    <div>
      <ChatRoomHeader
        roomName={"테이큰 커피-3030"}
        state={2}
        targetNum={5}
        isChief={true}
        usersInfo={[
          { name: "김OO" },
          { name: "최OO" },
          { name: "박OO" },
          { name: "구OO" },
          { name: "이OO" },
        ]}
        feePerOne={500}
        location={"신공학관 정문"}
      />
      <div></div>
      <ChattingInput isDelivered={true} />
    </div>
  );
};

export default ChatRoom;
