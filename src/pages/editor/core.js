import { useRecoilState } from "recoil";
import { projectState, timelineState } from "../../Atoms";

import { v4 as uuidv4 } from "uuid";
import { getObjectLocation } from "../../helpers";

console.log(timelineState);

const [timelineInfo, setTimelineInfo] = useRecoilState(timelineState);
const [projectInfo, setProjectInfo] = useRecoilState(projectState);
    
export const createTrack = () => {
  setTimelineInfo((oldTimelineInfo) => {
    let newTimelineInfo = JSON.parse(JSON.stringify(oldTimelineInfo));

    newTimelineInfo["tracks"].push({ objects: [] });

    return newTimelineInfo;
  });
};

export const createObject = () => {
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
