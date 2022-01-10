import { useState } from "preact/hooks";

import { useRecoilState } from "recoil";
import { timelineState } from "./Atoms";

import { eel } from "./eel";

import { getObjectLocation } from "./helpers";

import { v4 as uuidv4 } from "uuid";

import Timeline from "./components/timeline/Timeline";
import Preview from "./components/preview/Preview";

import HetrixLogo from "./assets/Hetrix Logo Mini.png";
import Home from "./pages/home/home";
import Editor from "./pages/editor/editor";

eel.set_host("ws://localhost:8888");

export function App() {
  

  return (
    <div className="h-screen w-screen bg-slate-800 flex flex-col font-bold">
      {1 === 1 ? <Editor /> : <Home />}
    </div>
  );
}
