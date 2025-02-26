import React from "react";
import { exportDieline } from "../Mockup/utils/ExportUtils"; 
import "./Navbar.css";

const Navbar = ({ selectedFace, undo, redo, zoom, setZoom, shapeType, customizationState }) => {
  const handleZoom = (direction) => {
    setZoom((prev) => {
      const newZoom = direction === "in" ? prev + 0.1 : prev - 0.1;
      return Math.min(Math.max(newZoom, 0.5), 2);
    });
  };

  const handleExport = () => {
    if (!shapeType) {
      alert("No shape selected for export!");
      return;
    }
    exportDieline(shapeType, customizationState);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <button onClick={undo}>⏪ Undo</button>
        <button onClick={redo}>⏩ Redo</button>
      </div>

      {/* <div className="nav-center">
        🎨 Editing: {selectedFace !== null ? `Face ${selectedFace}` : "None"}
      </div> */}

      <div className="nav-right">
        <button onClick={() => handleZoom("out")}>➖</button>
        <span>{(zoom * 100).toFixed(0)}%</span>
        <button onClick={() => handleZoom("in")}>➕</button>
        <button className="export-btn" onClick={handleExport} disabled={!shapeType}>
          🚀 Export
        </button>
      </div>
    </div>
  );
};

export default Navbar;
