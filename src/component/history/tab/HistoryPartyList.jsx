import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HistoryOrderList from "./HistoryOrderList";
import { useRecoilValue, useRecoilState } from "recoil";
import { historyDataAtom } from "../../../recoil/historyData/atom";
import { STATE } from "./../../../constants/states";
import axios from "axios";
import HistoryReqLi from "./HistoryReqLi";
import { isProposalDataChangedAtom } from "./../../../recoil/historyData/atom";
import { COLOR } from "../../../constants/colors";

const HistoryPartyList = () => {
  const historyData = useRecoilValue(historyDataAtom);
  const [isProposalDataChanged, setIsProposalDataChanged] = useRecoilState(
    isProposalDataChangedAtom
  );
  const [requests, setRequsets] = useState([]);

  const [targetUser, setTargetUser] = useState({
    nickname: null,
    order: [],
  });
  const [clickedUser, setClickedUser] = useState({
    nickname: historyData.others[0].nickname,
    order: historyData.others[0].order,
  });

  useEffect(() => {
    // 방 상태 조건 - 모집 중 일때 한정으로 진행하기 -- 현재 테스트 중으로 조건 삽입 안함
    if (
      historyData.isPopUpOpen &&
      historyData.clickedTab === 2 &&
      isProposalDataChanged
    ) {
      getProposals();
      setIsProposalDataChanged(false);
    }
  }, [historyData, isProposalDataChanged]);

  useEffect(() => {
    if (historyData.isPopUpOpen && historyData.clickedTab === 2) {
      getProposals();
    }
    console.log(historyData);
    // calcTotalMenu();
    // getProposals();
  }, []);

  // const calcTotalMenu = () => {
  //   let menuName = [];
  //   menuName = [...historyData.myOrder.map((o) => o.foodName)];
  //   const othersMenu = historyData.others.map((other) =>
  //     other.order.map((o) => o.foodName)
  //   );
  //   console.log(othersMenu);
  // };

  const getProposals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/proposal/post/${historyData.roomId}`,
        { headers: { Authorization: localStorage.getItem("Authorization") } }
      );
      console.log(response.data);
      const _requests = response.data;
      setRequsets(
        _requests.map((r) => ({
          proposalId: r.proposalId,
          nickname: r.userNickname,
          menus: r.menus.map((m) => ({
            name: m.name,
            quantity: m.quantity,
            price: m.price,
          })),
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onMouseEnter = (e) => {
    // if (didSelect) return;

    const targetData = findTargetData(e.target.dataset.name);
    setTargetUser(targetData);
  };

  const onMouseLeave = () => {
    // if (didSelect) return;

    setTargetUser((curData) => ({ ...curData, nickname: null }));
  };

  const findTargetData = (nickname) =>
    historyData.others.find((u) => u.nickname === nickname);

  const onClick = (e) => {
    // setDidSelect((curState) => !curState);
    setTargetUser(findTargetData(e.currentTarget.dataset.name));
    setClickedUser(findTargetData(e.currentTarget.dataset.name));
  };

  return (
    <HistoryPartyListWrapper>
      <ul>
        {/* {historyData.state === STATE.REQ_WAITING} */}
        {requests.map((r, key) => (
          <HistoryReqLi
            key={`request_${key}`}
            nickname={r.nickname}
            menus={r.menus}
            proposalId={r.proposalId}
          />
        ))}
      </ul>

      <PartySection>
        <PartyUl>
          {/* <Li>
            <span data-name={null}>💸</span>
            <strong data-name={null}>방 전체 금액</strong>
          </Li> */}
          {historyData.others.map((u, key) => (
            <Li
              key={`user_${key}`}
              data-name={u.nickname}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              isClicked={u.nickname === clickedUser.nickname}
            >
              <span data-name={u.nickname}>🍕</span>
              <strong data-name={u.nickname}>{u.nickname}</strong>
            </Li>
          ))}
        </PartyUl>

        <OrderListWrapper>
          <HistoryOrderList
            isPartySection={true}
            orderData={
              targetUser.nickname === null
                ? clickedUser.order
                : targetUser.order
            }
            maxHeight={requests.length === 0 ? "190px" : "130px"}
          />
        </OrderListWrapper>
      </PartySection>
    </HistoryPartyListWrapper>
  );
};

export default HistoryPartyList;

const HistoryPartyListWrapper = styled.div`
  padding: 8px 4px;
`;
const PartyUl = styled.ul`
  padding: 8px 4px;
  flex: 1;
`;

const Li = styled.li`
  height: 40px;
  font-size: 15px;
  padding: 10px 8px 10px 12px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background: ${COLOR.LIGHT_GRAY};
  }
  background: ${({ isClicked }) =>
    isClicked ? COLOR.LIGHT_GRAY : COLOR.WHITE};
`;

const OrderListWrapper = styled.div`
  background-color: white;
  flex: 1;
`;

const PartySection = styled.div`
  display: flex;
  flex-direction: row;
`;
