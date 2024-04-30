import CreativeEditorSDK from "@cesdk/cesdk-js";
import { useEffect, useRef, useState } from "react";
import { config } from "../utils/configEditor";

const templateSource = {
  id: "paytune-template",
  async findAssets(queryData) {
    return Promise.resolve({});
  },
};


export default function CreativeEditorSDKComponent() {
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
  const [imgData, setImgData] = useState(null);
  console.log('Conatiner ===>', cesdk)
  console.log("data", imgData);

  const handleImageData = (data, opt) => {
    setImgData(data);
    if (typeof data === "string") {
      fetch("http://localhost:5000/api/imgly/upload/scene", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          console.log("response MSG", response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("data upload success", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log(data[0], opt);
      const payload = opt;
      opt.size = data[0].size;
      opt.type = data[0].type;

      const formData = new FormData();
      formData.append("data", payload);

      // Make the fetch request
      fetch("http://localhost:5000/api/imgly/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    if (!cesdk_container.current) return;
    let cleanedUp = false;
    let instance;
    CreativeEditorSDK.create(
      cesdk_container.current,
      config(handleImageData)
    ).then(async (_instance) => {
      instance = _instance;
      console.log(instance);
      if (cleanedUp) {
        instance.dispose();
        return;
      }

      instance.addDemoAssetSources({ sceneMode: "Design" }),
        instance.engine.asset.addLocalSource(
          "paytune-template",
          undefined,
          async function applyAsset(asset) {
            const scene = await instance.engine.scene.createFromImage(
              asset.meta.uri
            );
            console.log(scene);
            instance.engine.scene.applyTemplateFromURL(asset.meta.uri);
          }
        );

      instance.engine.asset.findAssets("paytune-template");

      instance.engine.asset.addAssetToSource("paytune-template", {
        id: "test",
        label: "TEST 1",
        meta: {
          uri: `https://images.unsplash.com/photo-1714170109707-44a3c752a83f?q=80&w=2439&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
          thumbUri: `https://images.unsplash.com/photo-1714170109707-44a3c752a83f?q=80&w=2439&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        },
      });

      // instance.engine.scene
      //   .saveToString()
      //   .then((sceneAsString) => {
      //     console.log('Save succeeded');
      //     console.log(sceneAsString);
      //   })
      //   .catch((error) => {
      //     console.error('Save failed', error);
      //   });
      await instance.createDesignScene();
      setCesdk(instance);
    });
    const cleanup = () => {
      cleanedUp = true;
      instance?.dispose();
      setCesdk(null);
    };
    return cleanup;
  }, [cesdk_container]);
  return (
    <div
      ref={cesdk_container}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
