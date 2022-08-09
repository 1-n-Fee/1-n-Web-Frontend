import React, { useEffect, useState } from "react";
import StateTag from "./StateTag";

const Color = {
  YELLOW: "#fa983a",
  RED_PINK: "#eb4d4b",
  NAVY: "#130f40",
  WHITE: "white",
  GREEN: "#44bd32",
  DARK_YELLOW: "#f7b731",
  DARK_GREEN: "#16a085",
  DARK_RED: "#c0392b",
};

const State = {
  ORDER_WAITING: 0,
  ORDER_COMPLETE: 1,
  DELIVERY_COMPLETE: 2,
  REQ_WAITING: 3,
  ACCEPTED: 4,
  DENIED: 5,
  CHIEF: 6,
};

Object.freeze(Color);
Object.freeze(State);

const UserStateTag = ({ state }) => {
  const [stateTagData, setStateTagData] = useState({
    color: "",
    bg: "",
    string: "",
  });

  useEffect(() => {
    switch (state) {
      case State.ORDER_WAITING:
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

      case State.REQ_WAITING:
        setStateTagData({
          string: "대기 중",
          color: Color.WHITE,
          bg: Color.DARK_YELLOW,
        });
        break;
      case State.ACCEPTED:
        setStateTagData({
          string: "수락",
          color: Color.WHITE,
          bg: Color.DARK_GREEN,
        });
        break;
      case State.DENIED:
        setStateTagData({
          string: "거절",
          color: Color.WHITE,
          bg: Color.DARK_RED,
        });
        break;
      case State.CHIEF:
        setStateTagData({
          string: "방장",
          color: Color.WHITE,
          bg: Color.NAVY,
        });
        break;
      default:
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

export default UserStateTag;