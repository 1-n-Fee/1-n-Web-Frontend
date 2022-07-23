import React from "react";
import ChatStateTag from "./ChatStateTag";
import StateTag from "../common/StateTag";

const Color = {
  YELLOW: "#fa983a",
  RED_PINK: "#eb4d4b",
  NAVY: "#130f40",
  WHITE: "white",
  GREEN: "#44bd32",
};

// Object.freeze(Color);

const ChatRoomInfoDiv = ({
  roomName,
  targetNum,
  state,
  isChief,
  feePerOne,
  location,
}) => {
  return (
    <div>
      <div>
        <strong>{roomName}</strong>

        <ChatStateTag state={state} />

        {isChief && (
          <StateTag string="방장 " bg={Color.NAVY} color={Color.WHITE} />
        )}
      </div>
      <div>
        <span>👤{targetNum} </span>
        <span>{` 💵1인당 배달비 : ${feePerOne}원`}</span>
        <span>{`📍${location}`}</span>
      </div>
    </div>
  );
};

export default ChatRoomInfoDiv;
