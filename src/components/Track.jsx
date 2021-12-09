import { useRecoilState } from "recoil";
import { timelineState } from "../Atoms";

import DraggableItem from "./DraggableItem";

export default function Track(props) {
  const [timelineInfo, setTimelineInfo] = useRecoilState(timelineState);

  return (
    <>
      <div
        className={props.className}
        id={props.id}
        style={{
          ...props.style,
          top:
            props.track_index *
            timelineInfo["styles"]["draggableTopMultiplier"],
        }}
      ></div>

      {props.objects &&
        props.objects.map((object, object_i) => {
          return (
            <DraggableItem
              className="draggable"
              top={props.top}
              id={object["id"]}
            >
              {object["text"]}
            </DraggableItem>
          );
        })}
    </>
  );
}
