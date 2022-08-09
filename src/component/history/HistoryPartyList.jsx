import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HistoryOrderList from "./HistoryOrderList";

const HistoryPartyList = () => {
  const [users, setUsers] = useState([
    {
      userName: "닉닉넴",
      orderList: [
        { foodName: "참치 김밥", price: 3500 },
        { foodName: "우동", price: 6000 },
        { foodName: "돈까스", price: 9000 },
      ],
    },
    {
      userName: "닉네힘",
      orderList: [
        { foodName: "안심돈까스", price: 10000 },
        { foodName: "냉모밀", price: 7000 },
      ],
    },
    {
      userName: "닉네네",
      orderList: [{ foodName: "야채 김밥", price: 3000 }],
    },
  ]);
  const [didSelect, setDidSelect] = useState(false);
  const [targetUser, setTargetUser] = useState({
    userName: null,
    orderList: [],
  });

  const onMouseEnter = (e) => {
    if (didSelect) return;

    const targetData = findTargetData(e.target.dataset.name);
    setTargetUser(targetData);
  };

  const onMouseLeave = () => {
    if (didSelect) return;

    setTargetUser((curData) => ({ ...curData, userName: null }));
  };

  const findTargetData = (userName) =>
    users.find((u) => u.userName === userName);

  const onClick = (e) => {
    setDidSelect((curState) => !curState);
    setTargetUser(findTargetData(e.target.dataset.name));
  };

  return (
    <div>
      <ul>
        {users.map((u, key) => (
          <Li
            key={`user_${key}`}
            data-name={u.userName}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          >
            <span data-name={u.userName}>🍕</span>
            <strong data-name={u.userName}>{u.userName}</strong>

            {/* mouse hover 또는 클릭하면 등장하는 order 정보 */}
            {targetUser.userName === u.userName && (
              <OrderListWrapper key={`target_${key}`}>
                <HistoryOrderList
                  isPartySection={true}
                  orderData={targetUser.orderList}
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
