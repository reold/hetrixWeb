import { atom } from "recoil";

export const viewState = atom({
  key: "viewState",
  default: {
    page: "home",
  },
});

export const projectState = atom({
  key: "projectState",
  default: { name: "untitled", file: "" },
});

export const timelineState = atom({
  key: "timelineState",
  default: {
    tracks: [],
    styles: { draggableTopMultiplier: 45 },
  },
});
