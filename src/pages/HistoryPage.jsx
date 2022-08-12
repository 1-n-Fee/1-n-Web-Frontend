import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import HistoryListContainer from "../component/history/HistoryListContainer";
import HistoryPopup from "../component/history/HistoryPopup";
import historyDataAtom from "../recoil/historyData/atom";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useRecoilState(historyDataAtom);
  useEffect(
    () => setHistoryData((cur) => ({ ...cur, isPopUpOpen: false })),
    []
  );
  return (
    <div>
      <HistoryListContainer />

      {historyData.isPopUpOpen && <HistoryPopup />}
    </div>
  );
};

export default HistoryPage;
