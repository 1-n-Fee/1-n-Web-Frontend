import { atom } from "recoil";

const isChatDataChangedAtom = atom({
  key: "isChatDataChangedAtom",
  default: true,
});

export default isChatDataChangedAtom;
