import { useRecoilState } from "recoil";
import { timelineState } from "../Atoms";

import Track from "./Track";

import styles from "./timeline.module.css";

export default function Timeline(props) {
  const [timelineInfo, setTimelineInfo] = useRecoilState(timelineState);

  return (
    <div className={styles.timeline} id="timeline">
      {timelineInfo["tracks"].length > 0 &&
        timelineInfo["tracks"].map((track, track_i) => (
          <Track
            className="track"
            style={{}}
            top={track_i * timelineInfo["styles"]["draggableTopMultiplier"]}
            id={`t-${track_i}`}
            track_index={track_i}
            objects={track["objects"]}
          />
        ))}
    </div>
  );
}
