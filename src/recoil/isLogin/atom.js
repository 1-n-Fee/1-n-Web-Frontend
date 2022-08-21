import { atom } from "recoil";

const isLoginDataAtom = atom({
  key: "isLoginDataAtom",
  default: false,
});

export default isLoginDataAtom;
