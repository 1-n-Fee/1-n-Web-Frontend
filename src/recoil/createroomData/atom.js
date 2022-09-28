import { atom } from "recoil";

export const createDataAtom = atom({
  key: "createDataAtom",
  default: {
    isPopUpOpen: false,
  },
});

export const roomDataAtom = atom({
  key: "roomDataAtom",
  default: {
    spotId: "",
    content: "",
    storeId: "",
    storeName: "",
    delivery: "",
    closeTime: {
      year: "",
      month: "",
      day: "",
      hour: "",
      min: "",
    },
    limitNumber: "",
  },
});
