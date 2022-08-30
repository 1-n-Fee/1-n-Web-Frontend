import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { STATE } from "./../../constants/states";
import { COLOR } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import UserStateTag from "./UserStateTag";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import isChatDataChangedAtom from "./../../recoil/chatData/atom";
import { isHistoryDataChangedAtom } from "../../recoil/historyData/atom";

const StateChanger = ({ curState, roomId }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState();
  const [nexState, setNextState] = useState();
  const setIsChatDataChanged = useSetRecoilState(isChatDataChangedAtom);
  const setIsHistoryDataChanged = useSetRecoilState(isHistoryDataChangedAtom);

  useEffect(() => {
    switch (curState) {
      case STATE.ORDER_WAITING:
        setNextState(STATE.ORDER_COMPLETE);
        break;
      case STATE.ORDER_COMPLETE:
        setNextState(STATE.DELIVERY_COMPLETE);
        break;
      default:
        break;
    }
  }, [curState]);

  const onDropDownClick = (e) => {
    setIsDropDownOpen((cur) => !cur);
    e.stopPropagation();
  };

  const onNewStateClick = (e) => {
    changeState();
    setIsDropDownOpen(false);
    e.stopPropagation();
  };

  const changeState = useCallback(async () => {
    try {
      await axios.post(
        "http://localhost:8080/post/state/change",
        { postId: roomId, state: nexState },
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      );
      setIsChatDataChanged(true);
      setIsHistoryDataChanged(true);
    } catch (err) {
      console.log(err);
    }
  }, [roomId, nexState]);

  return (
    <StateChangerWrapper>
      {curState === STATE.ORDER_WAITING || curState === STATE.ORDER_COMPLETE ? (
        <>
          <DropDownButton
            onClick={onDropDownClick}
            color={
              curState === STATE.ORDER_WAITING
                ? COLOR.DARK_RED
                : COLOR.DARK_YELLOW
            }
          >
            {isDropDownOpen ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </DropDownButton>
          {isDropDownOpen && (
            <DropDown>
              <PlaceHolder>상태 변경하기</PlaceHolder>
              <StateWrapper onClick={onNewStateClick}>
                <UserStateTag state={nexState} />
              </StateWrapper>
            </DropDown>
          )}
        </>
      ) : null}
    </StateChangerWrapper>
  );
};

export default StateChanger;

const StateChangerWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 15px;
`;

const DropDownButton = styled.button`
  background-color: transparent;
  padding: 0;
  margin-right: 5px;
  opacity: 80%;
  font-size: 15px;
  color: ${COLOR.DARKER_GRAY};

  &:hover {
    opacity: 100%;
    background-color: transparent;
  }
`;

const DropDown = styled.div`
  position: absolute;
  width: 150px;
  border-radius: 5px;
  background-color: ${COLOR.WHITE};
`;

const PlaceHolder = styled.span`
  display: inline-block;
  font-size: 13px;
  width: 100%;
  text-align: center;
  padding: 4px;
  color: ${COLOR.DARKER_GRAY};
  border-bottom: ${COLOR.LIGHT_GRAY} 1px solid;
`;

const StateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &:hover {
    background-color: ${COLOR.DARK_GRAY};
    cursor: pointer;
  }
  border-radius: 4px;
  padding: 5px 0;
`;
