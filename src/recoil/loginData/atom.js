import { atom } from "recoil";

const loginDataAtom = atom({
  key: "loginDataAtom",
  default: {
    email: "",
    password: "",
  },
});

export default loginDataAtom;
