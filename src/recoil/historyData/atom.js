import { atom } from "recoil";

const historyDataAtom = atom({
  key: "historyDataAtom",
  default: {
    isPopUpOpen: false,
    // popUp에 띄울 다른 정보들
  },
});

export default historyDataAtom;
