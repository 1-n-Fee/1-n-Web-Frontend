import React, { useEffect, useState } from "react";
import StateTag from "../common/StateTag";

const Color = {
  YELLOW: "#fa983a",
  RED_PINK: "#eb4d4b",
  NAVY: "#130f40",
  WHITE: "white",
  GREEN: "#44bd32",
};

const ChatStateTag = ({ state }) => {
  const [stateTagData, setStateTagData] = useState({
    color: "",
    bg: "",
    string: "",
  });

  useEffect(() => {
    switch (state) {
      case 0:
        setStateTagData({
          string: "주문 대기",
          color: Color.WHITE,
          bg: Color.RED_PINK,
        });
        break;
      case 1:
        setStateTagData({
          string: "주문 완료",
          color: Color.WHITE,
          bg: Color.YELLOW,
        });
        break;
      case 2:
        setStateTagData({
          string: "배달 완료",
          color: Color.WHITE,
          bg: Color.GREEN,
        });
        break;
      default:
        setStateTagData({ string: "", color: "", bg: "" });
        break;
    }
  }, [state]);
  return (
    <StateTag
      string={stateTagData.string}
      bg={stateTagData.bg}
      color={stateTagData.color}
    />
  );
};

export default ChatStateTag;
