import { atom } from "recoil";
const isMenuOpenAtom = atom({
  key: "IsMenuOpenAtom",
  default: {
    myPage: false,
  },
});

export default isMenuOpenAtom;
