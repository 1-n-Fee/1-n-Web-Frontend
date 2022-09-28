import { atom } from "recoil";

const isLoadingAtom = atom({
  key: "isLoadingAtom",
  default: false,
});

export default isLoadingAtom;
