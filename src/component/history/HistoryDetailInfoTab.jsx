import React, { useState } from "react";

const HistoryDetailInfoTab = () => {
  const [historyInfo, setHistoryInfo] = useState({
    roomName: "원스테이크",
    roomId: "455",
    location: "신공학관 정문",
    feePerOne: 1500,
    totalFee: 14500,
    totalMems: 3,
    targetNum: 5,
  });

  return (
    <div>
      <table>
        <tr>
          <td>🍕 방 이름</td>
          <td>{`${historyInfo.roomName}-${historyInfo.roomId}`}</td>
        </tr>
        <tr>
          <td>📍 위치</td>
          <td>{historyInfo.location}</td>
        </tr>
        <tr>
          <td>💵 1인당 배달비</td>
          <td>{historyInfo.feePerOne.toLocaleString()}</td>
        </tr>
        <tr>
          <td>💵 총 금액</td>
          <td>{historyInfo.totalFee.toLocaleString()}</td>
        </tr>
        <tr>
          <td>👤 현재 인원</td>
          <td>{historyInfo.totalMems}명</td>
        </tr>
        <tr>
          <td>👤 목표 인원</td>
          <td>{historyInfo.targetNum}명</td>
        </tr>
      </table>
    </div>
  );
};

export default HistoryDetailInfoTab;
