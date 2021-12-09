import { useRecoilState } from "recoil";
import { timelineState } from "./Atoms";

import styles from "./app.module.css";

import { getObjectLocation } from "./helpers";

import { v4 as uuidv4 } from "uuid";

import Timeline from "./components/Timeline";

import HetrixLogo from "./assets/Hetrix Logo Mini.png";

export function App() {
  const [timelineInfo, setTimelineInfo] = useRecoilState(timelineState);

  const createTrack = () => {
    setTimelineInfo((oldTimelineInfo) => {
      let newTimelineInfo = JSON.parse(JSON.stringify(oldTimelineInfo));

      newTimelineInfo["tracks"].push({ objects: [] });

      return newTimelineInfo;
    });
  };

  const createObject = () => {
    setTimelineInfo((oldTimelineInfo) => {
      let newTimelineInfo = JSON.parse(JSON.stringify(oldTimelineInfo));

      newTimelineInfo["tracks"].at(-1)["objects"].push({
        text: `clip - ${uuidv4().slice(0, 5)}`,
        id: uuidv4(),

        left: 0,
      });

      return newTimelineInfo;
    });
  };

  const logState = () => {
    console.log(JSON.stringify(timelineInfo));
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <img src={HetrixLogo} width={150} height={50} />
        <button>Files</button>
        <button>Edit</button>
        <p>Demo frontend</p>
      </div>
      <div className={styles.controlbar}>
        <button onClick={createObject}>create element</button>
        <button onClick={createTrack}>create track</button>
        <button onClick={logState}>log state</button>
        <button
          onClick={() => {
            console.log(getObjectLocation(timelineInfo, "100"));
          }}
        >
          call helper
        </button>
      </div>
      <Timeline className={styles.timeline} />
    </div>
  );
}
