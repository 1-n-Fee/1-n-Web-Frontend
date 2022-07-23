import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatCreatedAlarm from "./Alarms/ChatCreatedAlarm";
import JoinRequestAlarm from "./Alarms/JoinRequestAlarm";
import JoinResponseAlarm from "./Alarms/JoinResponseAlarm";

const Key = {
  JOIN_REQ_ALARM: 0,
  JOIN_RES_ALARM: 1,
  CHAT_CREATED_ALARM: 2,
};

Object.freeze(Key);
const AlarmMenu = () => {
  const [alarms, setAlarms] = useState([
    {
      type: Key.JOIN_REQ_ALARM,
      requester: "김밥밥",
      storeName: "알촌",
      storeId: 1399,
      totalMems: 3,
      targetNum: 5,
      alarmId: 12345,
      hasChecked: false,
    },
    {
      type: Key.JOIN_RES_ALARM,
      storeName: "부리또피아",
      storeId: 23,
      totalMems: 2,
      targetNum: 3,
      alarmId: 24624,
      isAccepted: true,
      hasChecked: false,
    },
    {
      type: Key.JOIN_RES_ALARM,
      storeName: "테이큰 커피",
      storeId: 3,
      totalMems: 2,
      targetNum: 3,
      alarmId: 24624,
      isAccepted: false,
      hasChecked: true,
    },
    {
      type: Key.CHAT_CREATED_ALARM,
      storeName: "길이식당",
      storeId: 30,
      targetNum: 4,
      alarmId: 2354,
      hasChecked: true,
    },
  ]);

  useEffect(() => {
    // 동적으로 알람 받아오기 - 소켓통신으로
  }, []);
  return (
    <AlarmsWrapper>
      <ul>
        {alarms.map((a, key) => (
          <AlarmLi
            hasChecked={a.hasChecked}
            key={`alarm_${key}`}
            hasUnderline={key !== alarms.length - 1}
          >
            {a.type === Key.JOIN_REQ_ALARM ? (
              <JoinRequestAlarm
                requester={a.requester}
                storeName={a.storeName}
                storeId={a.storeId}
                totalMems={a.totalMems}
                targetNum={a.targetNum}
                alarmId={a.alarmId}
              />
            ) : a.type === Key.JOIN_RES_ALARM ? (
              <JoinResponseAlarm
                storeName={a.storeName}
                storeId={a.storeId}
                totalMems={a.totalMems}
                targetNum={a.targetNum}
                isAccepted={a.isAccepted}
                alarmId={a.alarmId}
              />
            ) : (
              <ChatCreatedAlarm
                storeName={a.storeName}
                storeId={a.storeId}
                targetNum={a.targetNum}
                alarmId={a.alarmId}
              />
            )}
          </AlarmLi>
        ))}
      </ul>
    </AlarmsWrapper>
  );
};

export default AlarmMenu;

const AlarmsWrapper = styled.div`
  position: absolute;
  right: 30px;
  z-index: 10;
  width: 400px;
  max-height: 480px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  overflow: auto;
`;

const AlarmLi = styled.li`
  font-size: 14px;
  line-height: 150%;
  padding: 12px 0px 5px 0;
  border-bottom: ${({ hasUnderline }) =>
    hasUnderline ? "0.3px solid #ced6e0;" : "none"} 
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
