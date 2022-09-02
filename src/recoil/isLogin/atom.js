import { atom } from "recoil";

const loginDataAtom = atom({
  key: "loginDataAtom",
  default: { isLogin: false, role: "" },
});

export default loginDataAtom;
