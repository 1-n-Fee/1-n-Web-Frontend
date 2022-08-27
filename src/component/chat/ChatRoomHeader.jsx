import React, { useState } from "react";
import styled from "styled-components";
import StateTag from "../common/StateTag";
import AlarmSubInfoStyle from "../style/AlarmSubInfoStyle";
import DropDownListStyle from "../style/DropDownListStyle";
import DropDownWrapperStyle from "../style/DropDownWrapperStyle";
import UserStateTag from "./../common/UserStateTag";
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
      <TitleWrapper>
        <RoomName>{roomName}</RoomName>
        <UserStateTag isChief={isChief} state={state} />

        {/* 방장 태그 리팩토링 필요 */}
        {isChief && (
          <StateTag bg={Color.NAVY} string={"방장"} color={Color.WHITE} />
        )}
      </TitleWrapper>

      <SubInfoDiv>
        <UserInfoWrapper>
          <UserTabBtn onClick={onMemberClick}>{`👤 ${targetNum}`}</UserTabBtn>
          {isMemberTabOpened && (
            <UserTab>
              <DropDownWrapperStyle minWidth={150} radius={10}>
                <ul>
                  {usersInfo.map((user, key) => (
                    <DropDownListStyle
                      key={`user_${key}`}
                      height={50}
                      isFirst={key === 0}
                      isLast={key === usersInfo.length - 1}
                      radius={10}
                    >
                      <UserNameWrapper>
                        <NameIcon>🍕</NameIcon>
                        <NameSpan>{user}</NameSpan>
                      </UserNameWrapper>
                    </DropDownListStyle>
                  ))}
                </ul>
              </DropDownWrapperStyle>
            </UserTab>
          )}
        </UserInfoWrapper>
        <AlarmSubInfoStyle>
          <span>{`💵1인당 배달비 : ${
            feePerOne && feePerOne.toLocaleString()
          }원 `}</span>
          <span>{`📍${location}`}</span>
        </AlarmSubInfoStyle>
      </SubInfoDiv>
    </ChatHeaderWrapper>
  );
};

export default ChatRoomHeader;
const userBtnHeight = 32;
const ChatHeaderWrapper = styled.div`
  background-color: #c2baa7;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0 20px;
`;
const TitleWrapper = styled.div`
  display: flex;
  padding-top: 4px;
  flex-direction: row;
  align-items: baseline;
`;
const RoomName = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  padding-right: 10px;
`;

const SubInfoDiv = styled.div`
  align-self: flex-end;
  text-align: right;
  padding-bottom: 3px;
`;
const UserTabBtn = styled.button`
  height: ${userBtnHeight}px;
  width: 70px;
  border-radius: ${userBtnHeight / 2}px;
  border: 3px solid #f35a3c;
  background-color: white;
  font-size: 13px;
  &:hover {
    background-color: #f35a3c;
  }
`;

const UserTab = styled.div`
  position: absolute;
  right: 0px;
`;

const UserInfoWrapper = styled.div`
  position: relative;
  line-hieght: 100%;
  display: inline-block;
  text-align: right;
`;

const UserNameWrapper = styled.div`
  font-size: 15px;
  height: 100%;
  text-align: left;
  padding: 3px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const NameIcon = styled.span`
  display: inline-block;
  font-size: 20px;
  padding-right: 5px;
`;
const NameSpan = styled.span`
  display: inline-block;
`;
// const MenuWrappper = styled.div`
//   position: absolute;
//   right: 10px;
//   background-color: white;
//   z-index: 10;
//   border-radius: ${10}px;
//   width: 180px;
// `;
