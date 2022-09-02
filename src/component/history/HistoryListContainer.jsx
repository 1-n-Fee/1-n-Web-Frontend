import React, { useEffect, useState } from "react";
import HistoryListHeader from "./HistoryListHeader";
import axios from "axios";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { isHistoryDataChangedAtom } from "../../recoil/historyData/atom";
import styled from "styled-components";

const HistoryListContainer = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isHistoryDataChanged, setIsHistoryDataChanged] = useRecoilState(
    isHistoryDataChangedAtom
  );

  useEffect(() => {
    getHistoryData();
    if (isHistoryDataChanged) {
      setIsHistoryDataChanged(false);
    }
  }, [isHistoryDataChanged]);

  const getHistoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/history", {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });

      await setHistory(
        response.data.map((d) => ({
          storeName: d.storeName,
          id: d.postId,
          totalMems: d.currentNumber,
          targetNum: d.limitNumber,
          state: d.state,
          isChief: d.owner,
          feePerOne: d.deliveryFeePerPerson,
          totalFee: d.totalAmountForUser,
          location: d.spotName,
        }))
      );
    } catch (err) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
    }
  };
  return (
    <HistoryListContainerWrapper>
      <ul>
        {history.map((h, key) => (
          <li key={`history_${key}`}>
            <HistoryListHeader
              roomName={`${h.storeName}-${h.id}`}
              roomId={h.id}
              totalMems={h.totalMems}
              targetNum={h.targetNum}
              state={h.state}
              isChief={h.isChief}
              feePerOne={h.feePerOne}
              totalFee={h.totalFee}
              location={h.location}
            />
          </li>
        ))}
      </ul>
    </HistoryListContainerWrapper>
  );
};

export default HistoryListContainer;

const HistoryListContainerWrapper = styled.div`
  width: 700px;
`;
