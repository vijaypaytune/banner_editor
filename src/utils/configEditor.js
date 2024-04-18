
export const config = {
  license: 'mtLT-_GJwMhE7LDnO8KKEma7qSuzWuDxiKuQcxHKmz3fjaXWY2lT3o3Z2VdL5twm',
  userId: 'guides-user',
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.24.0/assets',
  callbacks: {
    onUnsupportedBrowser: () => {
      /* This is the default window alert which will be shown in case an unsupported
       * browser tries to run CE.SDK */
      window.alert(
        'Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 86 or newer\n- Apple Safari 14.1 or newer\n- Microsoft Edge 88 or newer\n- Google Chrome 88 or newer'
      );
    },
    onBack: () => {
      window.alert('Back callback!');
    },
    onClose: () => {
      window.alert('Close callback!');
    },
    onSave: (scene) => {
      window.alert('Save callback!');
      console.info(scene);
    },
    onDownload: (scene) => {
      window.alert('Download callback!');
      console.info(scene);
    },
    onLoad: () => {
      window.alert('Load callback!');
      const scene = '...'; // Fill with sene
      return Promise.resolve(scene);
    },
    onExport: (blobs, options) => {
      window.alert('Export callback!');
      console.info(options.mimeType);
      console.info(options.jpegQuality);
      console.info(options.pages);
      return Promise.resolve();
    },
    onUpload: (file, onProgress) => {
      window.alert('Upload callback!');
      const newImage = {
        id: 'exampleImageIdentifier',
        meta: {
          uri: 'https://YOURSERVER/images/file.jpg',
          thumbUri: 'https://YOURSERVER/images/thumb.jpg'
        }
      };
      return Promise.resolve(newImage);
    }
  },
  ui: {
    elements: {
      navigation: {
        action: {
          close: true,
          back: true,
          save: true,
          download: true,
          load: true,
          export: true
        }
      }
    }
  }
};

