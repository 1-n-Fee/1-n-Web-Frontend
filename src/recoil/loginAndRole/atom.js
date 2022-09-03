import { atom } from "recoil";

const loginAndRoleDataAtom = atom({
  key: "loginDataAtom",
  default: { isLogin: false, role: "" },
});

export default loginAndRoleDataAtom;
