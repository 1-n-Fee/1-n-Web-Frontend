import React from "react";
import AlarmSubInfoStyle from "../style/AlarmSubInfoStyle";
import styled from "styled-components";
import UserStateTag from "../common/UserStateTag";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import historyDataAtom from "./../../recoil/historyData/atom";

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

  const onChatClick = () => {
    navigate("/chat");
    // param으로든 뭐든 채팅방 아이디 보내기
  };

  const onClick = (e) => {
    setHistoryData((cur) => ({ ...cur, isPopUpOpen: true }));
    // id 로 검색 후 set Recoil에 넣어주기
  };

  const onTabClick = (e) => {
    setHistoryData((cur) => ({
      ...cur,
      clickedTab: parseInt(e.target.dataset.idx),
    }));
  };

  return (
    <HistoryHeaderWrapper onClick={onClick}>
      <div>
        <TitleWrapper>
          <div>
            <RoomName>{roomName}</RoomName>

            {(state < 3 || !isChief) && <UserStateTag state={state} />}

            {isChief && <UserStateTag state={6} />}
            <div>
              <button data-idx={0} onClick={onTabClick}>
                ℹ️
              </button>
              <button data-idx={1} onClick={onTabClick}>
                🍕
              </button>
              {isChief && (
                <button data-idx={2} onClick={onTabClick}>
                  {state < 3 ? (
                    <>👤{targetNum}</>
                  ) : (
                    <>👤{`${totalMems}/${targetNum}`}</>
                  )}
                </button>
              )}
              {state < 3 && <button onClick={onChatClick}>💬</button>}
            </div>
          </div>
          <div>
            {(state === 3 || state === 4) && (
              <button>{isChief ? "방 삭제하기" : "취소하기"}</button>
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
      <div></div>
    </HistoryHeaderWrapper>
  );
};

export default HistoryListHeader;

const HistoryHeaderWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
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
