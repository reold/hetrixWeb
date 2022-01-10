import { useState } from "preact/hooks";

import { useRecoilState } from "recoil";
import { timelineState } from "../../Atoms";

import { eel } from "../../eel";

import { getObjectLocation } from "../../helpers";

import { v4 as uuidv4 } from "uuid";

import Timeline from "./timeline/Timeline";
import Preview from "./preview/Preview";

import HetrixLogo from "../../assets/Hetrix Logo Mini.png";

export default function Editor() {
  const [timelineInfo, setTimelineInfo] = useRecoilState(timelineState);
  const [showControlbar, setShowControlbar] = useState(false);

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
    <>
      <div className="flex flex-row h-16 pl-2 bg-slate-700 justify-start items-center space-x-5 text-white">
        <img src={HetrixLogo} className="w-[150px] h-[50px]" />
        <button>Files</button>
        <button>Edit</button>
        <button
          onClick={() => {
            setShowControlbar(!showControlbar);
          }}
        >
          Controls
        </button>
        <p>Demo frontend</p>
      </div>
      {showControlbar ? (
        <div className="flex flex-row justify-evenly space-x-5 bg-slate-300 w-full h-15 py-3">
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
          <button
            onClick={() => {
              eel.hello();
            }}
          >
            Eel host
          </button>
        </div>
      ) : (
        ""
      )}
      <Preview />
      <Timeline />
    </>
  );
}
