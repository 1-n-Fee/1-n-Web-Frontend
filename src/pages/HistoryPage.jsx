import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import HistoryListContainer from "../component/history/HistoryListContainer";
import HistoryPopup from "../component/history/HistoryPopup";
import { historyDataAtom } from "../recoil/historyData/atom";
import Underline from "./../component/common/Underline";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useRecoilState(historyDataAtom);
  useEffect(
    () => setHistoryData((cur) => ({ ...cur, isPopUpOpen: false })),
    []
  );
  return (
    <HistoryPageWrapper>
      <H2>참여 현황</H2>
      <Underline width={"750px"} thickness={"2px"} />
      <HistoryListContainer />

      {historyData.isPopUpOpen && <HistoryPopup />}
    </HistoryPageWrapper>
  );
};

export default HistoryPage;

const HistoryPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0 0 0;
`;

const H2 = styled.h2`
  margin: 0 0 15px 0;
`;
