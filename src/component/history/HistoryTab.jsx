import React, { useState } from "react";
import HistoryDetailInfoTab from "./HistoryDetailInfoTab";
import HistoryOrderList from "./HistoryOrderList";
import HistoryPartyList from "./HistoryPartyList";
const tabName = ["세부 정보", "주문 내역", "참여 인원"];
Object.freeze(tabName);

const HistoryTab = () => {
  const [curIdx, setCurIdx] = useState(0);
  const onTabClick = (e) => {
    setCurIdx(parseInt(e.target.dataset.idx));
  };
  return (
    <div>
      <div>
        {tabName.map((tName, key) => (
          <button key={`historyTab_${key}`} data-idx={key} onClick={onTabClick}>
            {tName}
          </button>
        ))}
      </div>
      <div>
        {curIdx === 0 && (
          <div>
            <HistoryDetailInfoTab />
          </div>
        )}
        {curIdx === 1 && (
          <div>
            <HistoryOrderList />
          </div>
        )}
        {curIdx === 2 && (
          <div>
            <HistoryPartyList />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTab;
