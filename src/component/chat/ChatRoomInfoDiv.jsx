import React from "react";
import ChatStateTag from "./ChatStateTag";
import StateTag from "../common/StateTag";
import AlarmSubInfoStyle from "../style/AlarmSubInfoStyle";
import styled from "styled-components";

const Color = {
  YELLOW: "#fa983a",
  RED_PINK: "#eb4d4b",
  NAVY: "#130f40",
  WHITE: "white",
  GREEN: "#44bd32",
};

// Object.freeze(Color);

const ChatRoomInfoDiv = ({
  roomName,
  targetNum,
  state,
  isChief,
  feePerOne,
  location,
}) => {
  return (
    <ChatRoomInfoWrapper>
      <TitleWrapper>
        <RoomName>{roomName}</RoomName>

        <ChatStateTag state={state} />

        {isChief && (
          <StateTag string="방장 " bg={Color.NAVY} color={Color.WHITE} />
        )}
        {/* <MemNumSpan>👤{targetNum}</MemNumSpan> */}
      </TitleWrapper>
      <AlarmSubInfoStyle>
        {/* <MemNumSpan>👤{targetNum}</MemNumSpan> */}
        {/* <SubInfoSpan width={"10%"}>👤{targetNum}</SubInfoSpan> */}
        <SubInfoSpan
          width={"40%"}
        >{` 💵1인당 배달비 : ${feePerOne}원`}</SubInfoSpan>
        <SubInfoSpan width={"40%"}>{`📍${location}`}</SubInfoSpan>
        <SubInfoSpan width={"20%"}>👤{targetNum}</SubInfoSpan>
      </AlarmSubInfoStyle>
    </ChatRoomInfoWrapper>
  );
};

export default ChatRoomInfoDiv;
const ChatRoomInfoWrapper = styled.div`
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
