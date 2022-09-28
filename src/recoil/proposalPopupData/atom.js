import { atom } from "recoil";

const proposalPopupAtom = atom({
  key: "proposalPopupAtom",
  default: {
    isOpen: false,
    postId: "",
    storeName: "",
    menus: [],
  },
});

export default proposalPopupAtom;
