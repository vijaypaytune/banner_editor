import CreativeEngine, {
    supportsWasm
  } from 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.25.0/index.js';
  // Import a node module when you work with a bundler:
  // import CreativeEngine from '@cesdk/engine';
  
  
  const config = {
    license: 'mtLT-_GJwMhE7LDnO8KKEma7qSuzWuDxiKuQcxHKmz3fjaXWY2lT3o3Z2VdL5twm',
    userId: 'guides-user',
    baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.25.0/assets'
  };
  
  
  if (
    supportsWasm()
    // If you use video in your scene you can check if the browser supports it as well.
    // supportsVideo()
  ) {
    CreativeEngine.init(config).then(
      async (engine) => {
        document.getElementById('cesdk_container').append(engine.element);
  
  
        // Add default asset sources to the engine.
        await engine.addDefaultAssetSources();
        await engine.scene.loadFromURL(
          'https://cdn.img.ly/assets/demo/v1/ly.img.template/templates/cesdk_postcard_1.scene'
        );

        engine.block.findByType('//ly.img.ubq/text').forEach((id) => {
          engine.block.setOpacity(id, 0.5);
        });
  
  
        engine.element.remove();
        engine.dispose();
      }
    );
  } else {
    alert('Unsupported browser detected');
  }








const exportButton = document.getElementById('export_button');

CreativeEngine.init(config).then(async (engine) => {
  document.getElementById('cesdk_container').append(engine.element);

  await engine.addDefaultAssetSources();
  await engine.scene.loadFromURL(
    'https://cdn.img.ly/assets/demo/v1/ly.img.template/templates/cesdk_postcard_1.scene'
  );
  exportButton.removeAttribute('disabled');

  exportButton.onclick = async () => {
    /* Export scene as PNG image. */
    const scene = engine.scene.get();
    const mimeType = 'image/png';
    /* Optionally, the maximum supported export size can be checked before exporting. */
    const maxExportSizeInPixels = engine.editor.getMaxExportSize();
    /* Optionally, the compression level and the target size can be specified. */
    const options = { pngCompressionLevel: 9, targetWidth: 350, targetHeight: 250};
    const blob = await engine.block.export(scene, mimeType, options);

    fetch("http://localhost:5000/api/imgly/upload", {
      method: "POST",
      body: {image: blob},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response JSON when request is successful
      })
      .then((data) => {
        console.log("Upload Succes ===>", data); // Log the response data
      })
      .catch((error) => {
        console.error("Error in upload ===>", error); // Log any errors that occur during the request
      });


    /* Download blob. */

    // const anchor = document.createElement('a');
    // anchor.href = URL.createObjectURL(blob);
    // anchor.download = 'export.png';
    // anchor.click();
  };
});
  