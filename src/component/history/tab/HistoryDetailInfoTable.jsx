import React, { useState } from "react";
import { historyDataAtom } from "./../../../recoil/historyData/atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { COLOR } from "./../../../constants/colors";

const HistoryDetailInfoTab = () => {
  const historyData = useRecoilValue(historyDataAtom);

  return (
    <HistoryDetailInfoTabWrapper>
      <Table>
        <tbody>
          <tr>
            <Th>🍕 방 이름</Th>
            <Td>{historyData.roomName}</Td>
          </tr>
          <tr>
            <Th>📍 위치</Th>
            <Td>{historyData.location}</Td>
          </tr>
          <tr>
            <Th>💵 1인당 배달비</Th>
            <Td>{historyData.feePerOne.toLocaleString()}원</Td>
          </tr>
          <tr>
            <Th>💵 총 금액</Th>
            <Td>{historyData.totalFee.toLocaleString()}원</Td>
          </tr>
          <tr>
            <Th>👤 현재 인원</Th>
            <Td>{historyData.totalMems}명</Td>
          </tr>
          <tr>
            <Th>👤 목표 인원</Th>
            <Td>{historyData.targetNum}명</Td>
          </tr>
        </tbody>
      </Table>
    </HistoryDetailInfoTabWrapper>
  );
};

export default HistoryDetailInfoTab;

const HistoryDetailInfoTabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 700px;
  padding-top: 12px;
`;

const Th = styled.th`
  border-right: 1px dashed ${COLOR.DARK_GRAY};
  padding: 10px 0;
`;

const Td = styled.td`
  padding: 10px 20px;
`;
