import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
// import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";

import "@blueprintjs/core/lib/css/blueprint.css";

import { createStore } from "polotno/model/store";
import { useEffect } from "react";
import { setUploadFunc } from "polotno/config";
import { CustomToolBar } from "./CustomToolBar";

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T", // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

export const Editor = () => {
  let isPage = false;
  useEffect(() => {
    if (!isPage) {
      store.addPage();
      isPage = true;
    }
  }, []);
  async function upload(localFile) {
    console.log("localFile check", localFile);
    const formData = new FormData();
    formData.append("files[]", localFile);
  }

  // function handleHotkey(e, store) {
  //   console.log("Evnets", e);
  //   console.log("Store", store);
  // }

  useEffect(() => {
    setUploadFunc(upload);
  }, []);

  console.log("Store Data", store.activePage);
  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      {/* sidebar */}
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        {/* header  */}
        <CustomToolBar store={store} />
        {/* <Toolbar store={store} downloadButtonEnabled /> */}
        {/* Preview Section */}
        <Workspace
          store={store}
          onKeyDown={(e, store) => {
            console.log("Evnets", e);
            console.log("Store", store);
            // handleHotkey(e, store);
          }}
        />
        {/* Zoom button  */}
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

export default Editor;
