import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { createDataAtom } from "../../recoil/createroomData/atom";
import RestaurantSearch from "./restaurantSearch";
import RestaurantList from "./restaurantList";
const CreateRoomPopup = (props) => {
  const [stores, setStores] = useState([]);

  const setCreateDataAtom = useSetRecoilState(createDataAtom);
  const onDelClick = () => {
    // recoil stae 변경 하여 popup 사라지도록
    setCreateDataAtom((cur) => ({ ...cur, isPopUpOpen: false }));
  };
  return (
    <PopUpBackground>
      <PopUpWrapper>
        <DelBtnWrapper>
          <DelBtn onClick={onDelClick}>❌</DelBtn>
        </DelBtnWrapper>
        <RestaurantSearch stores={stores} setStores={setStores} />
        <RestaurantList stores={stores} setStores={setStores} />
      </PopUpWrapper>
    </PopUpBackground>
  );
};

export default CreateRoomPopup;

const PopUpWrapper = styled.div`
  width: 700px;
  height: 500px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  position: relative;
  padding: 0 5rem;
  padding-bottom: 5rem;
`;

const PopUpBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;

const DelBtnWrapper = styled.div`
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
`;

const DelBtn = styled.span`
  display: inline-block;
  cursor: pointer;
`;
