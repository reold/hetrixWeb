import { useState } from "preact/hooks";

import { useRecoilState } from "recoil";
import { projectState } from "../../Atoms";

import * as core from "./core";

import { eel } from "../../eel";

import Timeline from "./timeline/Timeline";
import Preview from "./preview/Preview";

import HetrixLogo from "../../assets/Hetrix Logo Mini.png";

export default function Editor() {
  const [projectInfo, setProjectInfo] = useRecoilState(projectState);
  const [showControlbar, setShowControlbar] = useState(false);

  return (
    <>
      <div className="flex flex-row h-16 pl-2 bg-slate-700 justify-start items-center space-x-5 text-white">
        <img src={HetrixLogo} className="w-[150px] h-[50px]" />
        <p>{projectInfo["name"]}</p>
        <button>Files</button>
        <button>Edit</button>
        <button
          onClick={() => {
            setShowControlbar(!showControlbar);
          }}
        >
          Controls
        </button>
      </div>
      {showControlbar ? (
        <div className="flex flex-row justify-evenly space-x-5 bg-slate-300 w-full h-15 py-3">
          <button onClick={core.createObject}>create element</button>
          <button onClick={core.createTrack}>create track</button>
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
