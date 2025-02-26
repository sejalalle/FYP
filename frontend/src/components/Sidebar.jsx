import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  selectedFace,
  faceColors,
  handleColorChange,
  handleImageUpload,
  handleRemoveImage,
  imageScales,
  setImageScales,
  imagePositions,
  setImagePositions,
  resetCustomization,
  setBackgroundColor,
  backgroundColor,
  faceImages,
}) => {
  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">Customize Your Box</h3>
      <div className="sidebar-content">
        {selectedFace !== null ? (
          <>
            <div className="sidebar-section">
              <p className="sidebar-subtitle">Modifying Face {selectedFace + 1}</p>
              <label className="sidebar-label">Choose Color:</label>
              <input
                type="color"
                value={faceColors[selectedFace] || "#f4e1c1"}
                onChange={(e) => handleColorChange(e.target.value, selectedFace)}
                className="sidebar-color-picker"
              />
            </div>

            <div className="sidebar-section">
              <label className="sidebar-label">Image Options:</label>
              <select
                onChange={(e) => {
                  const action = e.target.value;
                  if (action === "upload") {
                    document.getElementById(`fileInput-${selectedFace}`).click();
                  } else if (action === "remove") {
                    handleRemoveImage(selectedFace);
                  }
                  e.target.value = "";
                }}
                className="sidebar-select"
              >
                <option value="">Select Action</option>
                <option value="upload">Upload Image</option>
                <option value="remove" disabled={!faceImages[selectedFace]}>
                  Remove Image
                </option>
              </select>
              <input
                id={`fileInput-${selectedFace}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, selectedFace)}
              />
            </div>

            <div className="sidebar-section">
              <label className="sidebar-label">Background Color:</label>
              <input
                type="color"
                value={backgroundColor || "#f4e1c1"}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="sidebar-color-picker"
              />
            </div>
          </>
        ) : (
          <p className="sidebar-placeholder">Select a face to customize.</p>
        )}
      </div>

      <div className="sidebar-footer">
        <button onClick={resetCustomization} className="sidebar-button reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
