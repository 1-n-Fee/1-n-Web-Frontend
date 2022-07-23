import React, { useEffect, useState } from "react";
import ChatRoomInfoDiv from "./ChatRoomInfoDiv";

const ChatRoomsInfo = () => {
  const [chatRoomsData, setChatRoomsData] = useState([
    {
      storeName: "맥도날드",
      roomId: 123,
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
    //setChatRoomsData
  }, []);

  return (
    <div>
      <ul>
        {chatRoomsData.map((data, key) => (
          <li key={key}>
            <ChatRoomInfoDiv
              roomName={`${data.storeName}-${data.roomId}`}
              state={data.state}
              isChief={data.isChief}
              targetNum={data.targetNum}
              feePerOne={parseInt(data.totalFee / data.targetNum)}
              location={data.location}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomsInfo;