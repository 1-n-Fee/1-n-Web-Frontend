import { atom } from "recoil";

export const newCommentAtom = atom({
  key: "newCommentAtom",
  default: {
    type: "comment",
    replyId: "",
    content: "",
  },
});

export const commentActiveAtom = atom({
  key: "commentActiveAtom",
  default: false,
});
