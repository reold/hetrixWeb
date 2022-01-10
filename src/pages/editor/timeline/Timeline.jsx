import { useRecoilState } from "recoil";
import { timelineState } from "../../../Atoms";

import Track from "./Track";

export default function Timeline(props) {
  const [timelineInfo, setTimelineInfo] = useRecoilState(timelineState);

  return (
    <div
      className="py-15 relative bg-slate-500 h-[40%] w-full overflow-scroll"
      id="timeline"
    >
      {timelineInfo["tracks"].length > 0 &&
        timelineInfo["tracks"].map((track, track_i) => (
          <Track
            top={track_i * timelineInfo["styles"]["draggableTopMultiplier"]}
            id={`t-${track_i}`}
            track_index={track_i}
            objects={track["objects"]}
          />
        ))}
    </div>
  );
}
