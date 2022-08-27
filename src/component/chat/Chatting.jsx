import React, { useEffect, useState } from "react";
import axios from "axios";
import { Client, ActivationState } from "@stomp/stompjs";

import ChatBubbleWrapper from "./ChatBubbleWrapper";
import styled from "styled-components";
import ChattingInput from "./ChattingInput";

let client = new Client();

const Chatting = ({ roomId }) => {
  const [nickname, setNickname] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (client.state === ActivationState.ACTIVE) {
      client.state = ActivationState.INACTIVE;
    }

    // console.log(` messages: ${messages}`);
    getPastMessages();
    getSocketToken();
  }, []);

  const getSocketToken = async () => {
    try {
      const authToken = window.localStorage.getItem("Authorization");
      const response = await axios.get("http://localhost:8080/socketToken", {
        headers: { Authorization: authToken },
      });
      const socketToken = response.data.socketToken;
      setNickname(response.data.nickname);

      console.log("소켓토큰 받아오기 성공");

      await connect(socketToken);
    } catch (err) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const getPastMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/message/${roomId}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("Authorization"),
          },
        }
      );

      console.log(response.data);

      setMessages(
        response.data
          .filter((message) => message.type !== "ENTER")
          .map((message) => ({
            nickname: message.sender,
            content: message.content,
            sendTime: message.sendTime,
            type: message.type,
          }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const connect = (socketToken) => {
    // console.log(client.state); // 지금 다른페이지 갔다오면 상태가 0이고, 바로 이 페이지에서 그대로 있으면 2임
    try {
      client.brokerURL = `ws://localhost:8080/ws/chat?token=${socketToken}`;

      client.onConnect = (frame) => {
        enterChatRoom();
        client.subscribe(`/sub/chat/room/${roomId}`, (data) => {
          const newMessage = JSON.parse(data.body);
          console.log(newMessage);
          if (newMessage.type === "ENTER") return;
          setMessages((cur) => [
            ...cur,
            {
              nickname: newMessage.sender,
              content: newMessage.content,
              sendTime: newMessage.sendTime,
              type: newMessage.type,
            },
          ]);
        });
      };

      client.onStompError = (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      };

      client.activate();
    } catch (err) {
      console.log(err);
    }
  };

  const enterChatRoom = () => {
    client.publish({
      destination: `/pub/chat/message`,
      body: JSON.stringify({
        content: "",
        type: "ENTER",
        postId: 1,
        nickname: nickname,
      }),
    });
  };

  const onSendMessage = (msg) => {
    // trying to publish a message when the broker is not connected will throw an exception
    if (!client.connected && msg !== "") {
      alert("Broker disconnected, can't send message.");
      return false;
    }
    if (msg.length > 0) {
      const payLoad = {
        content: msg,
        type: "TALK",
        postId: 1,
        nickname: nickname,
      };

      // You can additionally pass headers
      client.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify(payLoad),
      });
    }
    return true;
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    onSendMessage(message);
  }, [message]);

  return (
    <ChatSection>
      <BubbleWrapper>
        {messages.map((m, key) => (
          <ChatBubbleWrapper
            key={`chat_bubble_${key}`}
            nickname={m.nickname}
            icon=""
            content={m.content}
            time={m.sendTime}
            isMine={m.nickname === nickname}
          />
        ))}
        {/* <button onClick={enterChatRoom}>참가하깃</button>
      <button onClick={onSampleClick}>채팅 보내깃</button> */}
      </BubbleWrapper>
      <ChattingInput isDelivered={true} setMessage={setMessage} />
    </ChatSection>
  );
};

export default Chatting;

const ChatSection = styled.div`
  background-color: #ecf0f1;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const BubbleWrapper = styled.div`
  height: 400px;
  overflow: auto;
`;
