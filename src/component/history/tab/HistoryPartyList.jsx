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

  const [didSelect, setDidSelect] = useState(false);
  const [targetUser, setTargetUser] = useState({
    nickname: null,
    order: [],
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
    getProposals();
  }, []);

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
      <PartyUl>
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
      </PartyUl>
    </HistoryPartyListWrapper>
  );
};

export default HistoryPartyList;

const HistoryPartyListWrapper = styled.div`
  padding: 8px 4px;
`;
const PartyUl = styled.ul`
  padding: 8px 0px;
`;

const Li = styled.li`
  position: relative;
  height: 40px;
  font-size: 17px;
  padding: 10px 5px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background: ${COLOR.LIGHT_GRAY};
  }
`;

const OrderListWrapper = styled.div`
  position: absolute;
  background-color: white;
  top: 0px;
  right: 0px;
`;
