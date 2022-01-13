import { useState } from "preact/hooks";

import { useRecoilState } from "recoil";
import { timelineState } from "../../../Atoms";

import {
  changeObjectTrack,
  getObjectLocation,
  VerticalBound,
} from "../../../helpers";

export default function DraggableItem(props) {
  const [timelineInfo, setTimelineInfo] = useRecoilState(timelineState);

  const [objectMoving, setObjectMoving] = useState(false);

  const objectInfo = useState({
    track_no: getObjectLocation(timelineInfo, props.id)[0],
    object_data:
      timelineInfo["tracks"][getObjectLocation(timelineInfo, props.id)[0]][
        "objects"
      ][getObjectLocation(timelineInfo, props.id)[1]],
    object_id: getObjectLocation(timelineInfo, props.id)[1],
  })[0];

  const [position, setPosition] = useState({
    last_move: 0,
    pos1: 0,
    pos2: 0,
    start_x: 0,
    start_y: 0,
    top: props.top,
    left: objectInfo["object_data"]["left"],
  });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setObjectMoving(true);
    setPosition({ ...position, start_x: e.clientX, start_y: e.clientY });

    document.getElementById(props.id).style.zIndex = 100;
  };
  const handleMouseUp = (e) => {
    // close the drag
    setObjectMoving(false);

    let currentTrackNo = Math.round(
      position.top / timelineInfo["styles"]["draggableTopMultiplier"],
      0
    );

    if (currentTrackNo > timelineInfo["tracks"].length - 1) {
      currentTrackNo = timelineInfo["tracks"].length - 1;
    }

    setPosition({
      ...position,
      last_move: 0,
      top: timelineInfo["styles"]["draggableTopMultiplier"] * currentTrackNo,
    });

    setTimelineInfo((oldTimelineInfo) => {
      let newTimelineInfo = JSON.parse(JSON.stringify(oldTimelineInfo));

      newTimelineInfo["tracks"][objectInfo["track_no"]]["objects"][
        objectInfo["object_id"]
      ]["left"] = position.left;

      return newTimelineInfo;
    });

    if (currentTrackNo !== getObjectLocation(timelineInfo, props.id)[0]) {
      console.log("Different Track");

      changeObjectTrack(
        setTimelineInfo,
        getObjectLocation(timelineInfo, props.id),
        currentTrackNo
      );
    }

    document.getElementById(props.id).style.zIndex = 1;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!objectMoving) return;

    let newData = {
      ...position,
      pos1: position.start_x - e.clientX,
      pos2: position.start_y - e.clientY,
      start_x: e.clientX,
      start_y: e.clientY,
    };

    if (
      VerticalBound(document.getElementById(props.id).parentElement, {
        y: document.getElementById(props.id).offsetTop - newData.pos2,
        height: document.getElementById(props.id).clientHeight,
      })
    ) {
      newData["top"] =
        document.getElementById(props.id).offsetTop - newData.pos2;
    }
    newData["left"] =
      document.getElementById(props.id).offsetLeft - newData.pos1;

    // calculate new position
    setPosition(newData);
  };

  return (
    <div
      // className={
      //   objectMoving === true ? styles.draggableSelected : styles.draggable
      // }

      className={`w-36 h-[40px] absolute rounded-md bg-blue-200 ring-2 ring-black${
        objectMoving === true ? " shadow-lg shadow-blue-500" : ""
      }`}
      id={props.id}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        zIndex: 10,
        top: position.top,
        left: position.left,
      }}
    >
      {props.children}
    </div>
  );
}
