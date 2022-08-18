import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatting = () => {
  const [socketToken, setSocketTocken] = useState("");
  useEffect(() => {
    getSocketToken();
  }, []);

  const getSocketToken = async () => {
    try {
      const authToken = window.localStorage.getItem("Authorization");
      const response = await axios.get("http://localhost:8080/socketToken", {
        headers: { Authorization: authToken },
      });
      setSocketTocken(response.data.socketToken);
    } catch (err) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  return <div></div>;
};

export default Chatting;
