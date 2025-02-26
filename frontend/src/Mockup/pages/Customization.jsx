import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import SquareBox from "../shapes/SquareBoxRenderer";
import TallBottleBox from "../shapes/TallBottleBoxRenderer";
import TuckEndBox from "../shapes/TuckEndBoxRenderer";
import PizzaBox from "../shapes/PizzaBoxRenderer";
import FlipTopBox from "../shapes/FlipTopBoxRenderer";
import Cylinder from "../shapes/CylinderRenderer";
import TubeBox from "../shapes/TubeBoxRenderer";
import ShippingBox from "../shapes/ShippingBoxRenderer";
import "./Customization.css";

const shapeComponents = {
  "square-box": SquareBox,
  "tall-bottle-box": TallBottleBox,
  "tuck-end-box": TuckEndBox,
  "pizza-box": PizzaBox,
  "flip-top-box": FlipTopBox,
  "cylinder": Cylinder,
  "tube-box": TubeBox,
  "shipping-box": ShippingBox,
};

const Customization = () => {
  const { boxType } = useParams();
  const SelectedShape = shapeComponents[boxType];

  const [selectedFace, setSelectedFace] = useState(null);
  const [faceColors, setFaceColors] = useState(Array(6).fill("#ffffff"));
  const [faceImages, setFaceImages] = useState(Array(6).fill(null));
  const [imagePositions, setImagePositions] = useState(Array(6).fill({ x: 0, y: 0 }));
  const [imageScales, setImageScales] = useState(Array(6).fill(1));
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [zoom, setZoom] = useState(1);

  const saveStateToHistory = () => {
    setHistory((prev) => [...prev, { faceColors, faceImages, imagePositions, imageScales, backgroundColor }]);
    setRedoStack([]);
  };

  const handleImageUpload = (event, faceIndex) => {
    const file = event.target.files[0];
    if (file) {
      saveStateToHistory();
      const imageUrl = URL.createObjectURL(file);
      setFaceImages((prev) => {
        const newImages = [...prev];
        newImages[faceIndex] = imageUrl;
        return newImages;
      });
    }
  };

  const handleRemoveImage = (faceIndex) => {
    saveStateToHistory();
    setFaceImages((prev) => {
      const newImages = [...prev];
      newImages[faceIndex] = null;
      return newImages;
    });
  };

  const handleColorChange = (color, faceIndex) => {
    saveStateToHistory();
    setFaceColors((prev) => {
      const newColors = [...prev];
      newColors[faceIndex] = color;
      return newColors;
    });
  };

  const resetCustomization = () => {
    saveStateToHistory();
    setFaceColors(Array(6).fill("#ffffff"));
    setFaceImages(Array(6).fill(null));
    setImagePositions(Array(6).fill({ x: 0, y: 0 }));
    setImageScales(Array(6).fill(1));
    setBackgroundColor("#f0f0f0");
    setSelectedFace(null);
  };

  const undo = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setRedoStack((prev) => [...prev, { faceColors, faceImages, imagePositions, imageScales, backgroundColor }]);
      setFaceColors(lastState.faceColors);
      setFaceImages(lastState.faceImages);
      setImagePositions(lastState.imagePositions);
      setImageScales(lastState.imageScales);
      setBackgroundColor(lastState.backgroundColor);
      setHistory([...history]);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      setHistory((prev) => [...prev, { faceColors, faceImages, imagePositions, imageScales, backgroundColor }]);
      setFaceColors(nextState.faceColors);
      setFaceImages(nextState.faceImages);
      setImagePositions(nextState.imagePositions);
      setImageScales(nextState.imageScales);
      setBackgroundColor(nextState.backgroundColor);
      setRedoStack([...redoStack]);
    }
  };

  if (!SelectedShape) {
    return <h2 className="error-message">Shape not found</h2>;
  }

  return (
    <div className="app-container" style={{ paddingBottom: "60px" }}>
     <Navbar 
  shapeType={boxType} 
  customizationState={{
    faceColors,
    faceImages,
    imagePositions,
    imageScales
  }} 
  undo={undo} 
  redo={redo} 
  zoom={zoom} 
  setZoom={setZoom} 
/>
 <div className="main-content" style={{ paddingBottom: "70px" }}>
        <Sidebar
          selectedFace={selectedFace}
          faceColors={faceColors}
          faceImages={faceImages}
          imagePositions={imagePositions}
          imageScales={imageScales}
          handleColorChange={handleColorChange}
          handleImageUpload={handleImageUpload}
          handleRemoveImage={handleRemoveImage}
          setImagePositions={setImagePositions}
          setImageScales={setImageScales}
          resetCustomization={resetCustomization}
          setBackgroundColor={(color) => {
            saveStateToHistory();
            setBackgroundColor(color);
          }}
        />
        <div className="canvas-container" style={{ transform: `scale(${zoom})` }}>
          <SelectedShape
            selectedFace={selectedFace}
            faceColors={faceColors}
            faceImages={faceImages}
            imagePositions={imagePositions}
            imageScales={imageScales}
            setSelectedFace={setSelectedFace}
            backgroundColor={backgroundColor}
          />
        </div>
      </div>
    </div>
  );
};

export default Customization;
