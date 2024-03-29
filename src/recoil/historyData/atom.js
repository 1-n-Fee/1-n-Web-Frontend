import { atom } from "recoil";

export const historyDataAtom = atom({
  key: "historyDataAtom",
  default: {
    isPopUpOpen: false,
    roomId: 0,
    clickedTab: 0, // 0 - 세부 정보, 1 - 주문 내역 , 2 - 참여인원
    // popUp에 띄울 다른 정보들
    roomName: "",
    totalMems: 0,
    targetNum: 0,
    state: "",
    isChief: "",
    feePerOne: 0,
    totalFee: 0,
    location: "",
    myOrder: [{ foodName: "", price: 0 }],
    others: [{ nickname: "", order: [{ foodName: "", price: 0 }] }],
  },
});

export const isHistoryDataChangedAtom = atom({
  key: "isHistoryDataChangedAtom",
  default: true,
});

export const isProposalDataChangedAtom = atom({
  key: "isProposalDataChangedAtom",
  default: true,
});
