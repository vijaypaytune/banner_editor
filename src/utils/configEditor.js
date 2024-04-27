// const licenseKeyMy = 'I7t2GZW1dyl6AOX44W04a99bcAg7ZU9-JYUej98q9zkd9idGPxP3_xMMEjliCnx5';
const licenseKeyDemo = "mtLT-_GJwMhE7LDnO8KKEma7qSuzWuDxiKuQcxHKmz3fjaXWY2lT3o3Z2VdL5twm"

export const config = (cb) => {
  return {
    license: licenseKeyDemo ,
    userId: "guides-user",
    baseURL: "http://localhost:5174/assets",
    core: {
      // Specify location of core assets, required by the engine.
      baseURL: "http://localhost:5174/assets/core/",
    },
    callbacks: {
      onUnsupportedBrowser: () => {
        /* This is the default window alert which will be shown in case an unsupported
         * browser tries to run CE.SDK */
        window.alert(
          "Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 86 or newer\n- Apple Safari 14.1 or newer\n- Microsoft Edge 88 or newer\n- Google Chrome 88 or newer"
        );
      },
      onBack: () => {
        window.alert("Back callback!");
      },
      onClose: () => {
        window.alert("Close callback!");
      },
      onSave: (scene) => {
        cb(scene);
        window.alert("Save callback!");
        console.info("Save Data ==>", scene);
      },
      onDownload: (scene) => {
        cb(scene);
        window.alert("Download callback!");
        console.info("Download data", scene);
      },
      onLoad: () => {
        window.alert("Load callback!");
        const scene = "..."; // Fill with sene
        return Promise.resolve(scene);
      },

      onExport: (blobs, options) => {
        cb(blobs,options);
        // console.log("image", blobs);
        // window.alert("Export callback!");
        // console.info(options.mimeType);
        // console.info(options.jpegQuality);
        // console.info(options.pages);
        return Promise.resolve(blobs,options);
      },
      onUpload: (file, onProgress) => {
        window.alert("Upload callback!");
        console.log("Selected file", file);
        const newImage = {
          id: "image-editor",
          meta: {
            uri: "http://localhost:5174/assets",
            thumbUri: "http://localhost:5174/assets",
          },
        };
        console.log("CheCKING PROGRESS", onProgress);
        return Promise.resolve(newImage);
      },
    },
    ui: {
      elements: {
        navigation: {
          action: {
            close: false,
            back: false,
            save: false,
            download: true,
            load: false,
            export: {
              show: true,
              format: ['image/png']
            },
          },
        },
      },
    },
  };
};
