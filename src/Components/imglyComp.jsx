import CreativeEditorSDK from "@cesdk/cesdk-js";
import { useEffect, useRef, useState } from "react";
import { config } from "../utils/configEditor";

// const config = (cb)=>{
//     return {
//         license: 'I7t2GZW1dyl6AOX44W04a99bcAg7ZU9-JYUej98q9zkd9idGPxP3_xMMEjliCnx5',
//         userId: 'guides-user',
//         // baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.24.0/assets',
//         callbacks: {
//           onExport: (data) => {
//               console.log('File', data);
//               cb(data)
//             },
//           onUpload: 'local' }}
// };

export default function CreativeEditorSDKComponent() {
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
  const [imgData, setImgData] = useState(null);
  // console.log('Conatiner ===>', cesdk)
 
  const handleImageData = (data, opt) => {
    setImgData(data);
    console.log(data[0], opt);
    const payload = opt;
    opt.size = data[0].size;
    opt.type = data[0].type;

    const formData = new FormData();
    formData.append("image", payload);

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
      if (cleanedUp) {
        instance.dispose();
        return;
      }

      // Do something with the instance of CreativeEditor SDK, for example:
      // Populate the asset library with default / demo asset sources.

      await Promise.all([
        instance.addDefaultAssetSources({
          // baseURL: "http://localhost:5174/assets/demo/v2",excludeAssetSourceIds: []
          // baseURL: "http://localhost:5174/assets/demo/v2"
        }),
        instance.addDemoAssetSources({ sceneMode: "Design" }),
      ]);
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
