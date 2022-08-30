import React, { useState } from "react";
import { historyDataAtom } from "./../../../recoil/historyData/atom";
import { useRecoilValue } from "recoil";

const HistoryDetailInfoTab = () => {
  const historyData = useRecoilValue(historyDataAtom);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>🍕 방 이름</td>
            <td>{historyData.roomName}</td>
          </tr>
          <tr>
            <td>📍 위치</td>
            <td>{historyData.location}</td>
          </tr>
          <tr>
            <td>💵 1인당 배달비</td>
            <td>{historyData.feePerOne.toLocaleString()}</td>
          </tr>
          <tr>
            <td>💵 총 금액</td>
            <td>{historyData.totalFee.toLocaleString()}</td>
          </tr>
          <tr>
            <td>👤 현재 인원</td>
            <td>{historyData.totalMems}명</td>
          </tr>
          <tr>
            <td>👤 목표 인원</td>
            <td>{historyData.targetNum}명</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistoryDetailInfoTab;
