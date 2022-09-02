import { atom } from "recoil";

const managerStoreDataAtom = atom({
  key: "managerStoreDataAtom",
  default: { hasStore: false },
});

export default managerStoreDataAtom;
