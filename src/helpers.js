export const getObjectLocation = (timelineInfo, objectId) => {
  let objectTrackNo = undefined;
  let objectNo = undefined;

  timelineInfo["tracks"].forEach((track, t_i) => {
    track["objects"].forEach((object, o_i) => {
      if (object["id"] === objectId) {
        objectTrackNo = t_i;
        objectNo = o_i;
      }
    });
  });

  return [objectTrackNo, objectNo];
};

export const changeObjectTrack = (
  setTimelineInfo,
  [oldTrackNo, oldObjectNo],
  newTrackNo
) => {
  setTimelineInfo((oldTimelineInfo) => {
    let newTimelineInfo = JSON.parse(JSON.stringify(oldTimelineInfo));

    let object = newTimelineInfo["tracks"][oldTrackNo]["objects"][oldObjectNo];

    newTimelineInfo["tracks"][newTrackNo]["objects"].push({ ...object });

    newTimelineInfo["tracks"][oldTrackNo]["objects"].splice(oldObjectNo, 1);

    return newTimelineInfo;
  });
};

export const VerticalBound = (parentDiv, childProps) => {
  return (
    parentDiv.scrollHeight >= childProps["y"] + childProps["height"] &&
    childProps.y >= 0
  );
};
