import React, { useState } from "react";
import styled from "styled-components";
import StateTag from "../common/StateTag";
import ChatStateTag from "./ChatStateTag";
const Color = {
  YELLOW: "#fa983a",
  RED_PINK: "#eb4d4b",
  NAVY: "#130f40",
  WHITE: "white",
  GREEN: "#44bd32",
  ORANGE: "#ff915e",
};

// props 들도 recoil로 대체할 수 있음
const ChatRoomHeader = ({
  roomName,
  state,
  targetNum,
  isChief,
  usersInfo,
  feePerOne,
  location,
}) => {
  const [isMemberTabOpened, setIsMemberTabOpened] = useState(false);
  const onMemberClick = () => {
    setIsMemberTabOpened((cur) => !cur);
  };
  return (
    <ChatHeaderWrapper>
      <div>
        <H4>{roomName}</H4>
        <ChatStateTag state={state} />

        {/* 방장 태그 리팩토링 필요 */}
        {isChief && (
          <StateTag bg={Color.NAVY} string={"방장"} color={Color.WHITE} />
        )}
        <UserInfoWrapper>
          <span onClick={onMemberClick}>
            {`참여 인원 : ${targetNum}명 `}
            {isMemberTabOpened ? "🔼" : "🔽"}
          </span>
          {isMemberTabOpened && (
            <UserTab>
              <ul>
                {usersInfo.map((user, key) => (
                  <li key={`user_${key}`}>🍕{user.name}</li>
                ))}
              </ul>
            </UserTab>
          )}
        </UserInfoWrapper>
      </div>
      <div>
        <span>{`💵1인당 배달비 : ${feePerOne}원 `}</span>
        <span>{`📍${location}`}</span>
      </div>
    </ChatHeaderWrapper>
  );
};

export default ChatRoomHeader;

const ChatHeaderWrapper = styled.div`
  background-color: ${Color.ORANGE};
`;

const H4 = styled.h4`
  display: inline-block;
`;

const UserTab = styled.div`
  position: absolute;
  right: 0px;
`;

const UserInfoWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
