import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";

import ChatBubbleWrapper from "./ChatBubbleWrapper";
import styled from "styled-components";
import ChattingInput from "./ChattingInput";

// let client = new Client();

const Chatting = ({ roomId, state }) => {
  const [nickname, setNickname] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const testRef = useRef({ roomId: parseInt(roomId) }); // 초깃값을 지정하면 최초 렌더링시 의 값으로 고정되는 듯
  const testRef2 = useRef(roomId);
  const testRef3 = useRef();
  const client = useRef(new Client());
  const subscription = useRef();
  const scrollRef = useRef();

  // test
  // useEffect(() => {
  //   // console.log(testRef);
  //   console.log(messages);
  // }, [messages]);

  useEffect(() => {
    // if (client.current.state === ActivationState.ACTIVE) {
    // }
    // client.current = new Client();
    // console.log("새로렌더링");
    console.log(client.current);
    // testRef3.current = 100;
    // console.log(testRef3);
    // testRef3.current = 200;
    // console.log(testRef3);

    // console.log(` messages: ${messages}`);
    setMessages([]);
    getPastMessages();
    getSocketToken();
    // console.log(roomId);
    // console.log(testRef.current);
    // console.log(testRef2.current);
    // testRef2.current = 1000;
    // console.log(testRef2.current);

    testRef.current.roomId = roomId * 100;
    console.log(testRef.current);
    return () => {
      // console.log("이건 ...안되니?");
      subscription.current.unsubscribe();
      client.current.deactivate();
      // client.current.state = ActivationState.INACTIVE;
      // console.log(client.current.connected);
    };
  }, [roomId]);

  // 소켓 토큰 받아오기 - 성공하면 connnect 함수 실행
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

  // 이전 메세지 받아오기
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

      // console.log(response.data);

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

  // 소켓 연결 함수
  const connect = (socketToken) => {
    try {
      client.current.brokerURL = `ws://localhost:8080/ws/chat?token=${socketToken}`;

      console.log(client.current.connected);
      // 소켓 연결 후 실행되는 콜백 함수
      client.current.onConnect = (frame) => {
        // 채팅방 입장
        enterChatRoom();

        // 채팅방 내용 subscribe 하기
        subscription.current = client.current.subscribe(
          `/sub/chat/room/${roomId}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            console.log("구독 안된듯?");
            // 왜 구독이 안될까
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
          }
        );
      };

      // console.log(client.current.onConnect);
      // 연결 실패할 경우 실행되는 콜백 함수
      client.current.onStompError = (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      };

      // 소켓 활성화
      client.current.activate();
      console.log("isConnected: ", client.current.connected);
    } catch (err) {
      console.log(err);
    }
  };

  // 채팅방 입장하는 함수
  const enterChatRoom = () => {
    client.current.publish({
      destination: `/pub/chat/message`,
      body: JSON.stringify({
        content: "",
        type: "ENTER",
        postId: roomId,
        nickname: nickname,
      }),
    });
  };

  // 채팅방에 메세지 전송시 실행하는 함수
  const onSendMessage = (msg) => {
    // trying to publish a message when the broker is not connected will throw an exception
    if (!client.current.connected && msg !== "") {
      alert("Broker disconnected, can't send message.");
      return false;
    }

    if (msg.length > 0) {
      const payLoad = {
        content: msg,
        type: "TALK",
        postId: roomId,
        nickname: nickname,
      };

      // You can additionally pass headers
      client.current.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify(payLoad),
      });
    }
    return true;
  };

  // 메세지 생성 시 마다 아래로 스크롤 하는 함수
  useEffect(() => {
    // console.log(scrollRef);
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // 메세지내용 다 입력했을 때마다 실행하는 함수
  useEffect(() => {
    onSendMessage(message);
  }, [message]);

  return (
    <ChatSection>
      <BubbleWrapper>
        {messages.map((m, key) => (
          <div ref={scrollRef}>
            <ChatBubbleWrapper
              key={`chat_bubble_${key}`}
              nickname={m.nickname}
              icon=""
              content={m.content}
              time={m.sendTime}
              isMine={m.nickname === nickname}
            />
          </div>
        ))}
        {/* <button onClick={enterChatRoom}>참가하깃</button>
      <button onClick={onSampleClick}>채팅 보내깃</button> */}
      </BubbleWrapper>
      <ChattingInput
        isDelivered={state && state === "DELIVERY_COMPLETE"}
        setMessage={setMessage}
      />
    </ChatSection>
  );
};

export default Chatting;

const ChatSection = styled.div`
  background-color: #ecf0f1;
  display: flex;
  height: 90%;
  flex-direction: column;
`;

const BubbleWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;
