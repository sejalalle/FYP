import React from "react";

// Function to convert images to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Export dieline function
export const exportDieline = async (shapeType, customization = {}) => {
  if (!shapeType) {
    console.error("Shape type is required for exporting dieline.");
    alert("No shape selected for export!");
    return;
  }

  console.log(`Exporting dieline for shape: ${shapeType}`);

  const svgContent = await generateSVG(shapeType, customization);

  if (!svgContent) {
    console.error("SVG content could not be generated.");
    return;
  }

  console.log("SVG Content:", svgContent);

  // Create a Blob and trigger download
  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${shapeType}-dieline.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Generate SVG based on shape
const generateSVG = async (shapeType, customization) => {
  const {
    faceColors = Array(6).fill("#ffffff"),
    faceImages = [],
    imagePositions = [],
    imageScales = []
  } = customization;

  // Convert images to base64 only if they are File objects
  const validImages = await Promise.all(faceImages.map(async (img) => {
    return img instanceof File ? await convertToBase64(img) : img;
  }));

  const validPositions = imagePositions.map(pos => (Array.isArray(pos) ? pos : [0, 0]));
  const validScales = imageScales.map(scale => (typeof scale === "number" ? Math.min(scale, 1) : 0.5));

  while (validPositions.length < validImages.length) validPositions.push([0, 0]);
  while (validScales.length < validImages.length) validScales.push(0.5);

  switch (shapeType) {
    case "square-box":
      return getBoxDielineSVG(200, 200, faceColors, validImages, validPositions, validScales);
    case "tall-bottle-box":
      return getBoxDielineSVG(200, 500, faceColors, validImages, validPositions, validScales);
    case "tuck-end-box":
      return getBoxDielineSVG(300, 400, faceColors, validImages, validPositions, validScales);
    case "pizza-box":
      return getBoxDielineSVG(600, 80, faceColors, validImages, validPositions, validScales);
    case "flip-top-box":
      return getBoxDielineSVG(400, 100, faceColors, validImages, validPositions, validScales);
    case "cylinder":
      return getCylinderDielineSVG(faceColors, validImages, validPositions, validScales);
    case "tube-box":
      return getBoxDielineSVG(500, 100, faceColors, validImages, validPositions, validScales);
    case "shipping-box":
      return getBoxDielineSVG(400, 200, faceColors, validImages, validPositions, validScales);
    default:
      console.error("Invalid shape type:", shapeType);
      return null;
  }
};

const getBoxDielineSVG = (width, height, colors, images, positions, scales) => {
  return `
    <svg width="${width * 2}" height="${height * 3}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${width}" y="${height}" width="${width}" height="${height}" stroke="black" fill="${colors[0]}" stroke-dasharray="5,5" />
      <rect x="${width}" y="${height * 2}" width="${width}" height="${height}" stroke="black" fill="${colors[1]}" stroke-dasharray="5,5" />
      <rect x="0" y="${height}" width="${width}" height="${height}" stroke="black" fill="${colors[2]}" stroke-dasharray="5,5" />
      <rect x="${width * 2}" y="${height}" width="${width}" height="${height}" stroke="black" fill="${colors[3]}" stroke-dasharray="5,5" />
      <rect x="${width}" y="0" width="${width}" height="${height}" stroke="black" fill="${colors[4]}" stroke-dasharray="5,5" />
      <rect x="${width}" y="${height * 3}" width="${width}" height="${height}" stroke="black" fill="${colors[5]}" stroke-dasharray="5,5" />
      ${getImages(images, positions, scales, width, height)}
    </svg>`;
};

const getCylinderDielineSVG = (colors, images, positions, scales) => {
  return `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="500" height="200" stroke="black" fill="${colors[0]}" stroke-dasharray="5,5" />
      <ellipse cx="100" cy="150" rx="50" ry="100" stroke="black" fill="${colors[1]}" stroke-dasharray="5,5" />
      <ellipse cx="500" cy="150" rx="50" ry="100" stroke="black" fill="${colors[2]}" stroke-dasharray="5,5" />
      ${getImages(images, positions, scales, 500, 200)}
    </svg>`;
};

const getImages = (images, positions, scales, width, height) => {
  if (!Array.isArray(images) || images.length === 0) return "";

  return images
    .map((img, index) => {
      if (!img || typeof img !== "string") return "";

      const [x, y] = positions[index] || [0, 0];
      const scale = scales[index] || 0.5;

      return `
        <image href="${img}" x="${x}" y="${y}" width="${scale * (width / 3)}" height="${scale * (height / 3)}" />
      `;
    })
    .join("");
};
