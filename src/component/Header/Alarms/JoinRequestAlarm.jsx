import React, { useCallback, useState } from "react";
import styled from "styled-components";
import AlarmDelBtn from "../../common/AlarmDelBtn";
import AlarmSubInfoStyle from "../../style/AlarmSubInfoStyle";
import AlarmWrapperStyle from "../../style/AlarmWrapperStyle";

const JoinRequestAlarm = ({
  requester,
  storeName,
  storeId,
  totalMems,
  targetNum,
  alarmId,
}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAccepted, setIsAccepted] = useState(null);

  const onAcceptClick = useCallback(() => {
    setIsAnswered(true);
    setIsAccepted(true);
  }, []);

  const onDenyClick = useCallback(() => {
    setIsAnswered(true);
    setIsAccepted(false);
  }, []);

  return (
    <AlarmWrapperStyle>
      <InfoWrapper>
        <MainInfoDiv>
          <span>
            <strong>{requester}</strong>님
            {!isAnswered
              ? `이 참여 요청을 보냈습니다.`
              : isAccepted
              ? `의 참여가 수락되었습니다.`
              : `의 참여가 거절되었습니다.`}
          </span>
        </MainInfoDiv>
        <AlarmSubInfoStyle>
          <StoreNameStrong>
            {storeName}-{storeId}
          </StoreNameStrong>
          <span>
            👤{isAnswered && isAccepted ? totalMems + 1 : totalMems}/{targetNum}
          </span>
        </AlarmSubInfoStyle>
      </InfoWrapper>
      <BtnWrapper>
        {isAnswered ? null : (
          <>
            <Btn onClick={onAcceptClick}>수락하기</Btn>
            <Btn onClick={onDenyClick}>거절하기</Btn>
          </>
        )}
      </BtnWrapper>
      <ExitBtnWrapper>
        <AlarmDelBtn id={alarmId} />
      </ExitBtnWrapper>
    </AlarmWrapperStyle>
  );
};

export default JoinRequestAlarm;

const MainInfoDiv = styled.div`
  margin: 3px 0;
`;
const InfoWrapper = styled.div`
  width: 70%;
`;
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StoreNameStrong = styled.strong`
  padding: 0 8px 0 0px;
`;

const Btn = styled.button`
  margin: 3px 0;
`;

const ExitBtnWrapper = styled.div`
  margin: auto 0;
`;
