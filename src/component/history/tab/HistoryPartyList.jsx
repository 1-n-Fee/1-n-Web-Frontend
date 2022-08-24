import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HistoryOrderList from "./HistoryOrderList";
import { useRecoilValue } from "recoil";
import historyDataAtom from "../../../recoil/historyData/atom";

const HistoryPartyList = () => {
  const historyData = useRecoilValue(historyDataAtom);

  const [didSelect, setDidSelect] = useState(false);
  const [targetUser, setTargetUser] = useState({
    nickname: null,
    order: [],
  });

  const onMouseEnter = (e) => {
    if (didSelect) return;

    const targetData = findTargetData(e.target.dataset.name);
    setTargetUser(targetData);
  };

  const onMouseLeave = () => {
    if (didSelect) return;

    setTargetUser((curData) => ({ ...curData, nickname: null }));
  };

  const findTargetData = (nickname) =>
    historyData.others.find((u) => u.nickname === nickname);

  const onClick = (e) => {
    setDidSelect((curState) => !curState);
    setTargetUser(findTargetData(e.target.dataset.name));
  };

  return (
    <div>
      <ul>
        {historyData.others.map((u, key) => (
          <Li
            key={`user_${key}`}
            data-name={u.nickname}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          >
            <span data-name={u.nickname}>🍕</span>
            <strong data-name={u.nickname}>{u.nickname}</strong>

            {/* mouse hover 또는 클릭하면 등장하는 order 정보 */}
            {targetUser.nickname === u.nickname && (
              <OrderListWrapper key={`target_${key}`}>
                <HistoryOrderList
                  isPartySection={true}
                  orderData={targetUser.order}
                />
              </OrderListWrapper>
            )}
          </Li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPartyList;

const Li = styled.li`
  position: relative;
`;

const OrderListWrapper = styled.div`
  position: absolute;
  background-color: white;
  top: 0px;
  right: 0px;
`;
