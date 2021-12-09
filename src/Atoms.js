import { atom } from "recoil";

export const timelineState = atom({
  key: "timelineState",
  default: {
    tracks: [],
    styles: { draggableTopMultiplier: 45 },
  },
});
