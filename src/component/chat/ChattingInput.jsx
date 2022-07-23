import React, { useCallback, useState } from "react";

const ChattingInput = ({ isDelivered }) => {
  const [chatText, setChatText] = useState("");
  const onChange = (e) => {
    setChatText(e.target.value);
  };

  const onExitBtnClick = useCallback(() => {
    // 채팅방 나가는 구문 작성
    // 1. recoil에 저장된 채팅방 없애기
    // 2. 서버에 채팅방 삭제한다는 정보 보내기
  }, [isDelivered]);

  return (
    <div>
      {isDelivered && (
        <div>
          <button onClick={onExitBtnClick}>{`🔄️ 채팅방 나가기`}</button>
        </div>
      )}
      <div>
        <input type="text" onChange={onChange} value={chatText} />
        <button>보내기</button>
      </div>
    </div>
  );
};

export default ChattingInput;
