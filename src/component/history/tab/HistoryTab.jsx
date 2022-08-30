import React from "react";
import HistoryDetailInfoTab from "./HistoryDetailInfoTable";
import HistoryOrderList from "./HistoryOrderList";
import HistoryPartyList from "./HistoryPartyList";
import { useRecoilState } from "recoil";
import { historyDataAtom } from "../../../recoil/historyData/atom";
import styled from "styled-components";
const tabName = ["세부 정보", "주문 내역", "참여 인원"];
Object.freeze(tabName);

const HistoryTab = () => {
  const [historyData, setHistoryData] = useRecoilState(historyDataAtom);
  const onTabClick = (e) => {
    setHistoryData((cur) => ({
      ...cur,
      clickedTab: parseInt(e.target.dataset.idx),
    }));
  };

  return (
    <div>
      <div>
        {tabName.map((tName, key) => (
          <Tab
            key={`historyTab_${key}`}
            data-idx={key}
            onClick={onTabClick}
            isSelected={historyData.clickedTab === key}
          >
            {tName}
          </Tab>
        ))}
      </div>
      <div>
        {historyData.clickedTab === 0 && (
          <div>
            <HistoryDetailInfoTab />
          </div>
        )}
        {historyData.clickedTab === 1 && (
          <div>
            <HistoryOrderList />
          </div>
        )}
        {historyData.clickedTab === 2 && (
          <div>
            <HistoryPartyList />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTab;

const Tab = styled.button`
  background-color: ${({ isSelected }) => isSelected && "#a4b0be"};
`;
