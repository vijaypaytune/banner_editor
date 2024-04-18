import CreativeEditorSDK from '@cesdk/cesdk-js';
import { useEffect, useRef, useState } from 'react';
import { config } from '../utils/configEditor';

// const config = (cb)=>{
//     return {
//         license: 'I7t2GZW1dyl6AOX44W04a99bcAg7ZU9-JYUej98q9zkd9idGPxP3_xMMEjliCnx5',
//         userId: 'guides-user',
//         // baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.24.0/assets',
//         callbacks: { 
//           onExport: (data) => {
//               console.log('File', data);
//             },
//           onUpload: 'local' }}
// };

export default function CreativeEditorSDKComponent() {
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
  const [imgData, setImgData] = useState(null);

const handleImageData =(data)=>{
    setImgData(data)
}

console.log("Image Data State",imgData)
  console.log("Check Data",cesdk)
  useEffect(() => {
    if (!cesdk_container.current) return;
    let cleanedUp = false;
    let instance;
    CreativeEditorSDK.create(cesdk_container.current, config(handleImageData)).then(
      async (_instance) => {
        instance = _instance;
        if (cleanedUp) {
          instance.dispose();
          return;
        }


        // Do something with the instance of CreativeEditor SDK, for example:
        // Populate the asset library with default / demo asset sources.
        await Promise.all([
          instance.addDefaultAssetSources(),
          instance.addDemoAssetSources({ sceneMode: 'Design' })
        ]);
        await instance.createDesignScene();


        setCesdk(instance);
      }
    );
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
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
