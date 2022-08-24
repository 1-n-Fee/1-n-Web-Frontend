import { atom } from "recoil";

const historyDataAtom = atom({
  key: "historyDataAtom",
  default: {
    isPopUpOpen: false,
    roomId: 0,
    clickedTab: 0, // 0 - 세부 정보, 1 - 주문 내역 , 2 - 참여인원
    // popUp에 띄울 다른 정보들
  },
});

export default historyDataAtom;
