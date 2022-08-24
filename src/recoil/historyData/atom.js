import { atom } from "recoil";

const historyDataAtom = atom({
  key: "historyDataAtom",
  default: {
    isPopUpOpen: false,
    roomId: 0,
    clickedTab: 0,
    // popUp에 띄울 다른 정보들
  },
});

export default historyDataAtom;
