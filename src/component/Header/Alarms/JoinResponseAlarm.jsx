import React from "react";
import AlarmDelBtn from "../../common/AlarmDelBtn";
import styled from "styled-components";
import AlarmSubInfoStyle from "../../style/AlarmSubInfoStyle";
import AlarmWrapperStyle from "../../style/AlarmWrapperStyle";

const JoinResponseAlarm = ({
  storeName,
  storeId,
  totalMems,
  targetNum,
  alarmId,
  isAccepted,
}) => {
  return (
    <AlarmWrapperStyle>
      <div>
        <div>
          <span>
            <strong>
              {storeName}-{storeId}
            </strong>
            {`의 참여가 `}
            <strong>{isAccepted ? "수락" : "거절"}</strong>
            되었습니다.
          </span>
        </div>
        <AlarmSubInfoStyle>
          <span>
            👤{totalMems}/{targetNum}
          </span>
        </AlarmSubInfoStyle>
      </div>
      <div>
        <AlarmDelBtn id={alarmId} />
      </div>
    </AlarmWrapperStyle>
  );
};

export default JoinResponseAlarm;
