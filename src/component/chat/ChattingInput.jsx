import React, { useCallback, useState } from "react";
import styled from "styled-components";

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
    <ChatInputWrapper>
      {isDelivered && (
        <div>
          <ExitBtn onClick={onExitBtnClick}>{`🔄️ 채팅방 나가기`}</ExitBtn>
        </div>
      )}
      <InputNBtnDiv>
        <Input type="text" onChange={onChange} value={chatText} />
        <SendBtn disabled={chatText.length === 0}>보내기</SendBtn>
      </InputNBtnDiv>
    </ChatInputWrapper>
  );
};

export default ChattingInput;
const height = 50;
const ChatInputWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const InputNBtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Input = styled.input`
  display: inline-block;
  width: 90%;
  height: ${height}px;
  border-radius: ${height / 2}px;
  border: 0.5px solid #ced6e0;
  font-size: 18px;
  padding: 0 30px;
`;

const ExitBtn = styled.button`
  background-color: transparent;
  margin: 10px 0;
  &:hover {
    background-color: transparent;
  }
`;

const SendBtn = styled.button`
  height: ${height - 5}px;
  width: 75px;
  border-radius: ${(height - 5) / 2}px;
  font-size: 16px;
  margin-left: 10px;
  background-color: #f56649;
  &:hover {
    background-color: #f35a3c;
  }
  &:disabled {
    background-color: #bdc3c7;
    &:hover {
      background-color: #bdc3c7;
      cursor: default;
    }
  }
`;
