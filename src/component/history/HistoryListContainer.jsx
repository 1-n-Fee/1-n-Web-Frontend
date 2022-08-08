import React, { useEffect, useState } from "react";
import HistoryListHeader from "./HistoryListHeader";

const HistoryListContainer = () => {
  const [history, setHistory] = useState([
    {
      roomName: "새로이",
      id: 574,
      totalMems: 3,
      targetNum: 5,
      state: 4,
      isChief: true,
      feePerOne: 1500,
      totalFee: 12400,
      location: "신공학관 정문",
    },
    {
      roomName: "시홍쓰",
      id: 55,
      totalMems: 2,
      targetNum: 3,
      state: 4,
      isChief: false,
      feePerOne: 1500,
      totalFee: 12400,
      location: "동생대 정문",
    },
    {
      roomName: "새로이",
      id: 324,
      totalMems: 3,
      targetNum: 5,
      state: 5,
      isChief: false,
      feePerOne: 1500,
      totalFee: 12400,
      location: "신공학관 정문",
    },
    {
      roomName: "부리또피아",
      id: 22,
      totalMems: 4,
      targetNum: 4,
      state: 1,
      isChief: true,
      feePerOne: 1500,
      totalFee: 12400,
      location: "신공학관 정문",
    },
    {
      roomName: "불떡",
      id: 12,
      totalMems: 4,
      targetNum: 4,
      state: 1,
      isChief: true,
      feePerOne: 1500,
      totalFee: 12400,
      location: "신공학관 정문",
    },
    {
      roomName: "포크포크",
      id: 87,
      totalMems: 3,
      targetNum: 3,
      state: 0,
      isChief: false,
      feePerOne: 1500,
      totalFee: 12400,
      location: "신공학관 정문",
    },
  ]);

  useEffect(() => {
    // 데이터 받아오기
  }, []);
  return (
    <div>
      <ul>
        {history.map((h, key) => (
          <li key={`history_${key}`}>
            <HistoryListHeader
              roomName={`${h.roomName}-${h.id}`}
              roomId={h.id}
              totalMems={h.totalMems}
              targetNum={h.targetNum}
              state={h.state}
              isChief={h.isChief}
              feePerOne={h.feePerOne}
              totalFee={h.totalFee}
              location={h.location}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryListContainer;
