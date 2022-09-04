import { atom } from "recoil";

export const searchResultAtom = atom({
  key: "searchResultAtom",
  default: { isOpen: false, data: [] },
});

export const searchDetailAtom = atom({
  key: "searchDetailAtom",
  default: { isOpen: false, postId: "", data: {} },
});
