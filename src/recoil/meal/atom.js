import { atom } from "recoil";

export const postIdAtom = atom({
  key: "postIdAtom",
  default: 1,
});

export const userStatusAtom = atom({
  key: "userStatusAtom",
  default: "",
});

export const mealListEntryAtom = atom({
  key: "mealListEntryAtom",
  default: [],
});
export const originalMealListEntryAtom = atom({
  key: "originalMealListEntryAtom",
  default: [],
});
export const selectedMealAtom = atom({
  key: "selectedMealAtom",
  default: {},
});

export const detailOpenAtom = atom({
  key: "detailOpenAtom",
  default: false,
});

export const openAtom = atom({
  key: "openAtom",
  default: false,
});

export const openIdAtom = atom({
  key: "openIdAtom",
  default: "",
});
