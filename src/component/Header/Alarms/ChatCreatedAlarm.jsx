import React from "react";
import AlarmDelBtn from "../../common/AlarmDelBtn";

const ChatCreatedAlarm = ({ storeName, storeId, targetNum, alarmId }) => {
  return (
    <div>
      <div>
        <span>
          <strong>
            {storeName}-{storeId}
          </strong>
          의 모집이 완료되었습니다.
        </span>

        <div>
          <span>
            👤{targetNum}/{targetNum}
          </span>
        </div>
        <button>채팅하기</button>
      </div>
      <AlarmDelBtn id={alarmId} />
    </div>
  );
};

export default ChatCreatedAlarm;
