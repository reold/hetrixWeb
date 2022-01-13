import Logo from "../../assets/Hetrix Logo Large.png";

import { useState, useRef } from "preact/hooks";

import { projectState, viewState } from "../../Atoms";
import { useRecoilState } from "recoil";

import { Button, Panel, Dialog, Input } from "../../elements";

export default function Home() {
  const [projectInfo, setProjectInfo] = useRecoilState(projectState);
  const [viewInfo, setViewInfo] = useRecoilState(viewState);

  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);

  const projectNameRef = useRef(null);

  const newProjectDialog = () => {
    setNewProjectDialogOpen(!newProjectDialogOpen);
    console.log(newProjectDialogOpen);
  };

  const newProject = () => {
    setProjectInfo(() => {
      let newProjectInfo = JSON.parse(JSON.stringify(projectInfo));

      newProjectInfo["name"] = projectNameRef.current.value;

      console.log(projectNameRef);

      return newProjectInfo;
    });

    setViewInfo(() => {
      let newViewInfo = JSON.parse(JSON.stringify(viewInfo));
      newViewInfo["page"] = "editor";

      return newViewInfo;
    });
  };
  const loadProject = () => {};

  const openCli = () => {};

  return (
    <>
      <Panel axis="ver" className="space-y-10">
        <img src={Logo} alt="hetrix logo" />

        <Panel axis="ver" ic className="space-y-2">
          <Button type="pri" onClick={newProjectDialog}>
            new project
          </Button>
          <Button type="sec" onClick={loadProject}>
            load project
          </Button>
          <Button type="dan" onClick={openCli}>
            open cli
          </Button>
        </Panel>
        <p className="text-white">
          Hetrix development build. Version Unknown(beta)
        </p>
      </Panel>
      <Dialog open={newProjectDialogOpen} title="Create new project">
        <p>Create new project</p>
        <Panel axis="hor" ic je className="w-full">
          <p>Name: </p>
          <Input ref={projectNameRef} onEnter={newProject} />
        </Panel>
        <div className="flex flex-row items-center justify-evenly w-full">
          <Button type="dan" onClick={newProjectDialog}>
            cancel
          </Button>
          <Button type="pri" onClick={newProject}>
            continue
          </Button>
        </div>
      </Dialog>
    </>
  );
}
