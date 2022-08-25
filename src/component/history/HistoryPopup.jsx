import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import historyDataAtom from "../../recoil/historyData/atom";
import HistoryListHeader from "./HistoryListHeader";
import HistoryTab from "./tab/HistoryTab";

const HistoryPopup = () => {
  const [historyData, setHistoryData] = useRecoilState(historyDataAtom);
  const onDelClick = () => {
    // recoil stae 변경 하여 popup 사라지도록
    setHistoryData((cur) => ({ ...cur, isPopUpOpen: false }));
  };
  return (
    <PopUpBackground>
      <PopUpWrapper>
        <DelBtnWrapper>
          <DelBtn onClick={onDelClick}>❌</DelBtn>
        </DelBtnWrapper>
        <HistoryListHeader
          roomName={historyData.roomName}
          roomId={historyData.roomId}
          totalMems={historyData.totalMems}
          targetNum={historyData.targetNum}
          state={historyData.state}
          isChief={historyData.isChief}
          feePerOne={historyData.feePerOne}
          totalFee={historyData.totalFee}
          location={historyData.location}
        />
        {/* 선택된 히스토리 내역을 어떻게 전달할 건지 */}
        <HistoryTab />
      </PopUpWrapper>
    </PopUpBackground>
  );
};

export default HistoryPopup;

const PopUpWrapper = styled.div`
  width: 700px;
  height: 500px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  position: relative;
`;

const PopUpBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;

const DelBtnWrapper = styled.div`
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
`;

const DelBtn = styled.span`
  display: inline-block;
`;
