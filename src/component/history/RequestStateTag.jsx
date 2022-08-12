import React, { useEffect, useState } from "react";
import StateTag from "../common/StateTag";

const key = {
  WAITING: 0,
  ACCEPTED: 1,
  DENIED: 2,
};

Object.freeze(key);

const RequestStateTag = ({ state }) => {
  const [data, setData] = useState({ string: "", color: "", bg: "" });
  useEffect(() => {
    switch (state) {
      case key.WAITING:
        setData({
          string: "대기 중",
          color: "white",
          bg: "#f7b731",
        });
        break;
      case key.ACCEPTED:
        setData({
          string: "수락",
          color: "white",
          bg: "#16a085",
        });
        break;
      case key.DENIED:
        setData({
          string: "거절",
          color: "white",
          bg: "#c0392b",
        });
        break;
      default:
        setData({
          string: "대기 중",
          color: "white",
          bg: "#f7b731",
        });
        break;
    }
  }, [state]);

  return (
    <StateTag string={data.string} color={data.color} bg={data.bg}></StateTag>
  );
};

export default RequestStateTag;
