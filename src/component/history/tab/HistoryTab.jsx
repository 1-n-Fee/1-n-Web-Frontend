import React from "react";
import HistoryDetailInfoTab from "./HistoryDetailInfoTable";
import HistoryOrderList from "./HistoryOrderList";
import HistoryPartyList from "./HistoryPartyList";
import { useRecoilState } from "recoil";
import { historyDataAtom } from "../../../recoil/historyData/atom";
import styled from "styled-components";
import { COLOR } from "./../../../constants/colors";
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
    <HistoryTabWrapper>
      <TabWrapper>
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
      </TabWrapper>
      <div>
        {historyData.clickedTab === 0 && <HistoryDetailInfoTab />}
        {historyData.clickedTab === 1 && <HistoryOrderList />}
        {historyData.clickedTab === 2 && <HistoryPartyList />}
      </div>
    </HistoryTabWrapper>
  );
};

export default HistoryTab;

const HistoryTabWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Tab = styled.button`
  display: inline-block;
  height: 40px;
  flex: 1;
  border-radius: 5px 5px 0 0;
  border-right: 1px solid ${COLOR.WHITE};
  background-color: ${({ isSelected }) => isSelected && "#a4b0be"};
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 0 0 0;
`;
