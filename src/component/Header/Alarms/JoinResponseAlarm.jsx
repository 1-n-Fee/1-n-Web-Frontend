import React from "react";
import AlarmDelBtn from "../../common/AlarmDelBtn";

const JoinResponseAlarm = ({
  storeName,
  storeId,
  totalMems,
  targetNum,
  alarmId,
  isAccepted,
}) => {
  return (
    <div>
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
        <div>
          <span>
            👤{totalMems} / {targetNum}
          </span>
        </div>
      </div>
      <div>
        <AlarmDelBtn id={alarmId} />
      </div>
    </div>
  );
};

export default JoinResponseAlarm;
