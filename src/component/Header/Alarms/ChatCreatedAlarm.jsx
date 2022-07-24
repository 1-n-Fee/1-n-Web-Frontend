import React from "react";
import AlarmDelBtn from "../../common/AlarmDelBtn";
import AlarmWrapperStyle from "../../style/AlarmWrapperStyle";
import AlarmSubInfoStyle from "../../style/AlarmSubInfoStyle";
import styled from "styled-components";

const ChatCreatedAlarm = ({ storeName, storeId, targetNum, alarmId }) => {
  return (
    <AlarmWrapperStyle>
      <InfoWrapper>
        <span>
          <strong>
            {storeName}-{storeId}
          </strong>
          의 모집이 완료되었습니다.
        </span>

        <AlarmSubInfoStyle>
          <span>
            👤{targetNum}/{targetNum}
          </span>
        </AlarmSubInfoStyle>
      </InfoWrapper>
      <ChatBtn>채팅하기</ChatBtn>
      <AlarmDelBtn id={alarmId} />
    </AlarmWrapperStyle>
  );
};

export default ChatCreatedAlarm;
const InfoWrapper = styled.div`
  width: 70%;
`;
const ChatBtn = styled.button`
  display: inline-block;
  height: 40px;
`;
