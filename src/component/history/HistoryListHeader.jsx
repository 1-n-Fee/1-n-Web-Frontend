import React, { useEffect, useState } from "react";
import AlarmSubInfoStyle from "../style/AlarmSubInfoStyle";
import styled from "styled-components";
import UserStateTag from "../common/UserStateTag";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  historyDataAtom,
  isHistoryDataChangedAtom,
} from "./../../recoil/historyData/atom";
import axios from "axios";
import StateChanger from "../common/StateChanger";
import { STATE } from "./../../constants/states";
import { COLOR } from "../../constants/colors";

const HistoryListHeader = ({
  roomName,
  roomId,
  totalMems,
  targetNum,
  state,
  isChief,
  feePerOne,
  totalFee,
  location,
}) => {
  const navigate = useNavigate();

  const [historyData, setHistoryData] = useRecoilState(historyDataAtom);
  const [isOrderedState, setIsOrderedState] = useState(false);
  const [isHistoryDataChanged, setIsHistoryDataChanged] = useRecoilState(
    isHistoryDataChangedAtom
  );

  // 모집완료 후의 상태
  useEffect(() => {
    setIsOrderedState(
      state === "ORDERING" ||
        state === "ORDER_COMPLETED" ||
        state === "DELIVERY_COMPLETE"
    );
  }, [state]);

  useEffect(() => {
    if (isHistoryDataChanged) {
      getHistoryData();
      setIsHistoryDataChanged(false);
    }
  }, [isHistoryDataChanged]);

  // useEffect(() => {
  //   getHistoryData();
  // }, []);

  const onChatClick = () => {
    navigate(`/chat/${roomId}`);
  };

  const onClick = (e) => {
    getHistoryData();
    setHistoryData((cur) => ({ ...cur, isPopUpOpen: true }));
  };

  const onTabClick = (e) => {
    setHistoryData((cur) => ({
      ...cur,
      clickedTab: parseInt(e.target.dataset.idx),
    }));
  };

  /**
   * 제안서 요청 취소 시 서버에 요청 취소 보내는 함수
   */
  const onRequestCancelClick = async () => {
    try {
      // 임시
      await axios.post(`http://localhost:8080/proposal/1`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteRoomClick = async () => {
    try {
      if (isChief) {
        await axios.delete(`http://localhost:8080/post/${roomId}`, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getHistoryData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/history/${roomId}`,
        { headers: { Authorization: localStorage.getItem("Authorization") } }
      );
      const history = response.data;

      setHistoryData((cur) => ({
        ...cur,
        roomId: roomId,
        roomName: roomName,
        totalMems: totalMems,
        targetNum: targetNum,
        state: state,
        isChief: isChief,
        feePerOne: feePerOne,
        totalFee: totalFee,
        location: location,
        myOrder: history.myOrder.map((menu) => ({
          foodName: menu.foodName,
          price: menu.price,
        })),
        others: history.others.map((other) => ({
          nickname: other.nickname,
          order: other.menus.map((menu) => ({
            foodName: menu.foodName,
            price: menu.price,
          })),
        })),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HistoryHeaderWrapper onClick={onClick}>
      <div>
        <TitleWrapper>
          <RoomNameAndStateWrapper>
            <RoomName>{roomName}</RoomName>

            <UserStateTag state={state} isChief={isChief} />

            {isChief && (
              <>
                <StateChanger curState={state} roomId={roomId} />
                <UserStateTag state={6} />
              </>
            )}
          </RoomNameAndStateWrapper>
          <TabBtnWrapper>
            <TabButton data-idx={0} onClick={onTabClick}>
              ℹ️
            </TabButton>
            <TabButton data-idx={1} onClick={onTabClick}>
              🍕
            </TabButton>
            {isChief && (
              <TabButton data-idx={2} onClick={onTabClick}>
                {state === "ORDERING" ||
                state === "ORDER_COMPLETED" ||
                state === "DELIVERY_COMPLETE" ? (
                  <>👤{targetNum}</>
                ) : (
                  <>👤{`${totalMems}/${targetNum}`}</>
                )}
              </TabButton>
            )}
            {isOrderedState && <TabButton onClick={onChatClick}>💬</TabButton>}
          </TabBtnWrapper>

          <div>
            {(state === "RECRUITING" || state === "AWAITING") && (
              <button onClick={onDeleteRoomClick}>
                {isChief ? "방 삭제하기" : "취소하기"}
              </button>
            )}
          </div>
        </TitleWrapper>
        <AlarmSubInfoStyle>
          <SubInfoSpan
            width={"30%"}
          >{` 🍔1인당 배달비 : ${feePerOne.toLocaleString()}원`}</SubInfoSpan>
          <SubInfoSpan
            width={"30%"}
          >{` 💵전체 금액 : ${totalFee.toLocaleString()}원`}</SubInfoSpan>

          <SubInfoSpan width={"40%"}>{`📍${location}`}</SubInfoSpan>
        </AlarmSubInfoStyle>
      </div>
      <div>
        {state === STATE.REQ_WAITING && !isChief && (
          <button onClick={onRequestCancelClick}>요청 취소하기</button>
        )}
      </div>
    </HistoryHeaderWrapper>
  );
};

export default HistoryListHeader;

const HistoryHeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 0.8px solid ${COLOR.LIGHT_GRAY};
  padding: 14px 20px 6px 20px;
  &:hover {
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin: 0 0 8px 0;
`;

const RoomName = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  padding: 8px 8px 4px 0;
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const SubInfoSpan = styled.span`
  display: inline-block;
  width: ${({ width }) => width};
`;

const RoomNameAndStateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin: 0 0 4px 0;
`;

const TabBtnWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const TabButton = styled.button`
  height: 24px;
  margin: 2px;
`;
