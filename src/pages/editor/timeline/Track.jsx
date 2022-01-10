import { useRecoilState } from "recoil";
import { timelineState } from "../../../Atoms";

import DraggableItem from "./DraggableItem";

export default function Track(props) {
  const [timelineInfo, setTimelineInfo] = useRecoilState(timelineState);

  return (
    <>
      <div
        className={`absolute bg-red-400 w-full h-[40px]`}
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
            <DraggableItem top={props.top} id={object["id"]}>
              {object["text"]}
            </DraggableItem>
          );
        })}
    </>
  );
}
