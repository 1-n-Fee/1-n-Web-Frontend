import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import isChatDataChangedAtom from "./../../recoil/chatData/atom";

const ChattingInput = ({ isDelivered, setMessage }) => {
  const navigate = useNavigate();
  const setIsChatDataChanged = useSetRecoilState(isChatDataChangedAtom);
  const [chatText, setChatText] = useState("");
  const { roomId } = useParams();
  const onChange = (e) => {
    setChatText(e.target.value);
  };

  const onExitBtnClick = useCallback(async () => {
    try {
      const doesReallyExit = window.confirm("정말 나가시겠습니까?");
      if (!doesReallyExit) return;

      const response = await axios.delete(
        `http://localhost:8080/post/${roomId}`,
        { headers: { Authorization: localStorage.getItem("Authorization") } }
      );
      console.log(response);

      setIsChatDataChanged(true);
      navigate("/chat");
    } catch (err) {
      console.log(err);
    }
  }, [isDelivered]);

  // const exitRoom = async () => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8080/post/${roomId}`,
  //       { headers: { Authorization: localStorage.getItem("Authorization") } }
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const onSend = () => {
    setMessage(chatText);
    setChatText("");
  };

  const onKeyUp = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      // setChatText((cur)=> cur.substring(0, cur.length))
      onSend();
    }
  };

  useEffect(() => {
    console.log(chatText);
  }, [chatText]);

  return (
    <ChatInputWrapper>
      {isDelivered && (
        <div>
          <ExitBtn onClick={onExitBtnClick}>{`🔄️ 채팅방 나가기`}</ExitBtn>
        </div>
      )}
      <InputNBtnDiv>
        <Input
          type="text"
          onChange={onChange}
          value={chatText}
          onKeyUp={onKeyUp}
        />
        <SendBtn disabled={chatText.length === 0} onClick={onSend}>
          보내기
        </SendBtn>
      </InputNBtnDiv>
    </ChatInputWrapper>
  );
};

export default ChattingInput;
const height = 50;
const ChatInputWrapper = styled.div`
  width: 100%;
  padding: 15px 20px;
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
