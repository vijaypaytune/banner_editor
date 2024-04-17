import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { imageUrls } from "../utils/mock";
import Image from "./Image";

const BannerEditor = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [layers, setLayers] = useState([
    {
      id: "layer1",
      rectangles: [],
      images: [],
      texts: [],
    },
  ]);

  console.log(layers);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [text, setText] = useState("");
  const [textProps, setTextProps] = useState({
    fontSize: 20,
    fontFamily: "Arial",
    fill: "black",
    // backgroundColor: "green",
  });

  const handleSelect = (e) => {
    setSelectedId(e.target.id());
  };

  const handleDragMove = (e) => {
    const updatedLayers = [...layers];
    updatedLayers[activeLayerIndex] = {
      ...updatedLayers[activeLayerIndex],
      rectangles: updatedLayers[activeLayerIndex].rectangles.map((rect) =>
        rect.id === e.target.id()
          ? { ...rect, x: e.target.x(), y: e.target.y() }
          : rect
      ),
      images: updatedLayers[activeLayerIndex].images.map((img) =>
        img.id === e.target.id()
          ? { ...img, x: e.target.x(), y: e.target.y() }
          : img
      ),
      texts: updatedLayers[activeLayerIndex].texts.map((txt) =>
        txt.id === e.target.id()
          ? { ...txt, x: e.target.x(), y: e.target.y() }
          : txt
      ),
    };
    setLayers(updatedLayers);
  };

  const handleDragEnd = (e) => {
    // Optional: Perform any action when drag ends (e.g., save to backend)
    console.log("Drag ended:", e.target.id());
  };

  const addRectangle = () => {
    const updatedLayers = [...layers];
    updatedLayers[activeLayerIndex].rectangles.push({
      id: `rect${updatedLayers[activeLayerIndex].rectangles.length + 1}`,
      x: 50,
      y: 50,
      width: 300,
      height: 180,
      fill: "green",
    });
    setLayers(updatedLayers);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = new window.Image();
      image.src = reader.result;

      image.onload = () => {
        const updatedLayers = [...layers];
        updatedLayers[activeLayerIndex].images.push({
          id: `image${updatedLayers[activeLayerIndex].images.length + 1}`,
          image: image,
          x: 100,
          y: 100,
          width: 200,
          height: 150,
        });
        setLayers(updatedLayers);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = (imgUrl) => {
    const updatedLayers = [...layers];
    updatedLayers[activeLayerIndex].images.push({
      id: `image${updatedLayers[activeLayerIndex].images.length + 1}`,
      image: imgUrl,
      x: 100,
      y: 100,
      width: 200,
      height: 150,
    });
    setLayers(updatedLayers);
  };

  const addText = () => {
    if (text && text !== "") {
      const updatedLayers = [...layers];
      updatedLayers[activeLayerIndex].texts.push({
        id: `text${Date.now()}`,
        text: text,
        x: 50,
        y: 200,
        ...textProps,
      });
      setLayers(updatedLayers);
      setText("");
    }
  };

  const handleLayerChange = (index) => {
    setActiveLayerIndex(index);
  };

  return (
    <div className="flex gap-6 min-h-screen">
      <div className="bg-gray-200 p-4">
        <div className="flex flex-col gap-4 w-80">
          <div className="flex flex-col gap-4">
            <h2>Images Gallery</h2>
            <div className="flex gap-4 border border-gray-500 rounded p-2 flex-wrap h-[220px] overflow-y-auto">
              {imageUrls.map((imageUrl, i) => (
                <span key={i} onClick={() => handleSelectImage(imageUrl)}>
                  <img
                    className="h-24"
                    width={130}
                    height={80}
                    src={imageUrl}
                    alt="image"
                  />
                </span>
              ))}
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={addRectangle}>Add Rectangle</button>
          </div>
          <div>
            <div className="textSection p-2 ">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
              />
              <div className="form_control">
                <label>Font Size:</label>
                <input
                  type="number"
                  value={textProps.fontSize}
                  onChange={(e) =>
                    setTextProps({
                      ...textProps,
                      fontSize: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form_control">
                <label>Font Family:</label>
                <select
                  value={textProps.fontFamily}
                  onChange={(e) =>
                    setTextProps({ ...textProps, fontFamily: e.target.value })
                  }
                >
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                </select>
              </div>
              <div className="form_control">
                <label>Text Color:</label>
                <input
                  type="color"
                  value={textProps.fill}
                  onChange={(e) =>
                    setTextProps({ ...textProps, fill: e.target.value })
                  }
                />
              </div>
              {/* <div className="form_control">
              <label>Bg Color:</label>
              <input
                type="color"
                value={textProps.backgroundColor}
                onChange={(e) =>
                  setTextProps({
                    ...textProps,
                    backgroundColor: e.target.value,
                  })
                }
              />
            </div> */}
              <button onClick={addText}>Add Text</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <h2>Layers :- </h2>
          {layers.map((layer, index) => (
            <button key={layer.id} onClick={() => handleLayerChange(index)}>
              Layer {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="m-3 shadow-2xl m-auto inline-block">
        <Stage width={window.innerWidth - 400} height={window.innerHeight - 40}>
          <Layer>
            {layers.map((layer, index) => {
              if (index === activeLayerIndex) {
                return (
                  <React.Fragment key={index}>
                    {layer.images.map((img) => (
                      <Image
                        key={img.id}
                        src={img.src}
                        x={img.x}
                        y={img.y}
                        width={img.width}
                        height={img.height}
                        draggable
                        onSelect={handleSelect}
                        onDragMove={handleDragMove}
                        onDragEnd={handleDragEnd}
                      />
                    ))}
                    {layer.rectangles.map((rect) => (
                      <Rect
                        key={rect.id}
                        {...rect}
                        draggable
                        onClick={handleSelect}
                        onDragMove={handleDragMove}
                        onDragEnd={handleDragEnd}
                      />
                    ))}
                    {layer.texts.map((txt) => (
                      <Text
                        key={txt.id}
                        {...txt}
                        draggable
                        onClick={handleSelect}
                        onDragMove={handleDragMove}
                        onDragEnd={handleDragEnd}
                      />
                    ))}
                  </React.Fragment>
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default BannerEditor;
