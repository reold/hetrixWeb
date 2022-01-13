import { useState } from "preact/hooks";

import { eel } from "./eel";

import Home from "./pages/home/home";
import Editor from "./pages/editor/editor";

import { useRecoilValue } from "recoil";
import { viewState } from "./Atoms";

eel.set_host("ws://localhost:8888");

export function App() {
  const viewInfo = useRecoilValue(viewState);

  const renderPage = () => {
    if (viewInfo.page === "home") {
      return <Home />;
    } else if (viewInfo.page == "editor") {
      return <Editor />;
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-800 flex flex-col font-bold">
      {renderPage()}
    </div>
  );
}
