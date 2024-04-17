import React, { useState } from 'react';
import { Image as KonvaImage } from 'react-konva';

// eslint-disable-next-line react/prop-types
const Image = ({ src, x, y, width, height, draggable, onSelect, onDragMove, onDragEnd }) => {
  const [image, setImage] = useState(null);

  // Load the image asynchronously
  React.useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImage(img);
    };
  }, [src]);

  return (
    <React.Fragment>
      {image && (
        <KonvaImage
          image={image}
          x={x}
          y={y}
          width={width}
          height={height}
          draggable={draggable}
          onClick={onSelect}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />
      )}
    </React.Fragment>
  );
};

export default Image