import { Toolbar } from "polotno/toolbar/toolbar";
import { Button } from "@blueprintjs/core";
import { DownloadButton } from "polotno/toolbar/download-button";

// it is important to define component onside of `MyToolbar` render function
// eslint-disable-next-line react/prop-types
const ActionControls = ({ store }) => {
  return (
    <div>
      <DownloadButton store={store} />
      <Button
        intent="primary"
        onClick={() => {
          console.log(store);
          console.log(JSON.stringify(store));
          alert(JSON.stringify(store));
        }}
      >
        Save
      </Button>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
export const CustomToolBar = ({ store }) => {
  return (
    <Toolbar
      store={store}
      components={{
        ActionControls,
      }}
    />
  );
};
