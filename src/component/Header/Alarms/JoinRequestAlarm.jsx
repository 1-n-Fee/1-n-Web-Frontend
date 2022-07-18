import React, { useCallback, useState } from "react";
import AlarmDelBtn from "../../common/AlarmDelBtn";

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
    <div>
      <div>
        <span>
          <strong>{requester}</strong>님
          {!isAnswered
            ? `이 참여 요청을 보냈습니다.`
            : isAccepted
            ? `의 참여가 수락되었습니다.`
            : `의 참여가 거절되었습니다.`}
        </span>
        <div>
          <strong>
            {storeName}-{storeId}
          </strong>
          <span>
            👤{isAnswered && isAccepted ? totalMems + 1 : totalMems}/{targetNum}
          </span>
        </div>
      </div>
      <div>
        {isAnswered ? null : (
          <>
            <button onClick={onAcceptClick}>수락하기</button>
            <button onClick={onDenyClick}>거절하기</button>
          </>
        )}
        <AlarmDelBtn id={alarmId} />
      </div>
    </div>
  );
};

export default JoinRequestAlarm;
