import { atom } from "recoil";

export const postIdAtom = atom({
  key: "postIdAtom",
  default: 1,
});

export const userStatusAtom = atom({
  key: "userStatusAtom",
  default: "",
});
